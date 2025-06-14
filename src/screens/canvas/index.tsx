import React, {useMemo, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../navigation/config';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {arrayOfTemplate} from '../../constant/arrayOfTemplate';
import DraggableItem from '../../components/draggable-item';
import ZoomableCanvas from '../../components/zoomable-canvas';
import useImageSizing from '../../hooks/useImageSizing';
import TextEditor from '../../components/text-editor';
import {TextStyles} from '../../components/modal-text-input/types';
import CanvasButtons from '../../components/canvas-buttons';
import ViewShot from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import ImageEditor from '../../components/image-editor';
import {canvasStyle} from './style';

type CanvasScreenRouteProp = RouteProp<RootStackParamList, 'canvas'>;
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'canvas'>;
  route: CanvasScreenRouteProp;
};

const CanvasScreen: React.FC<Props> = ({route}) => {
  const {canvasId} = route.params;
  const [images, setImages] = useState<Asset[]>([]);
  const [contents, setContents] = useState<TextStyles[]>([
    {
      text: '',
      color: '#000000',
      fontWeight: 'normal',
    },
  ]);
  const selectTemplateImage = useMemo(
    () => arrayOfTemplate.find(item => item.id === canvasId),
    [canvasId],
  );

  const {calculatedSize, handleLayout} = useImageSizing(selectTemplateImage);

  const onDelete = (index: number) => {
    setContents(prevContents => prevContents.filter((_, i) => i !== index));
  };

  const onDuplicate = (text: TextStyles) => {
    setContents(prevContents => [...prevContents, text]);
  };
  const onAddText = () => {
    setContents(prevContents => [
      ...prevContents,
      {
        text: '',
        color: '#000000',
        fontWeight: 'normal',
      },
    ]);
  };
  const onAddImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        console.error('ImagePicker Error: ', result.errorMessage);
        Alert.alert('Error', 'Gagal memilih gambar');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        if (selectedImage.uri) {
          setImages(prev => [...prev, selectedImage]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat memilih gambar');
    }
  };

  const viewShotRef = useRef<ViewShot>(null);

  const onExport = async () => {
    try {
      if (viewShotRef.current?.capture) {
        if (Platform.OS === 'android') {
          if (Platform.Version <= 29) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Izin Penyimpanan',
                message: 'Aplikasi membutuhkan izin untuk menyimpan gambar',
                buttonNeutral: 'Tanya Nanti',
                buttonNegative: 'Batal',
                buttonPositive: 'OK',
              },
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              Alert.alert(
                'Izin ditolak',
                'Tidak dapat menyimpan tanpa izin penyimpanan',
              );
              return;
            }
          }
        }

        const uri = await viewShotRef.current.capture();

        if (Platform.OS === 'android') {
          await CameraRoll.save(uri, {type: 'photo'});
        } else {
          await CameraRoll.save(uri);
        }

        Alert.alert('Berhasil', 'Desain berhasil disimpan ke galeri');
      }
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert(
        'Gagal',
        'Gagal menyimpan desain: ' + (error as Error).message,
      );
    }
  };

  return (
    <SafeAreaView style={canvasStyle.container}>
      <Text style={canvasStyle.title}>Canvas Screen</Text>

      <GestureHandlerRootView style={canvasStyle.gestureContainer}>
        <View style={canvasStyle.canvasOuterContainer}>
          <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
            <ZoomableCanvas style={canvasStyle.zoomableCanvas}>
              <View style={canvasStyle.canvas} onLayout={handleLayout}>
                <View style={canvasStyle.canvasBackground} />

                {selectTemplateImage ? (
                  <DraggableItem zIndex={2} initialPosition={{x: 0, y: 0}}>
                    <Image
                      source={selectTemplateImage.image}
                      style={[
                        canvasStyle.image,
                        {
                          width: calculatedSize.width,
                          height: calculatedSize.height,
                        },
                      ]}
                      resizeMode="contain"
                      onLoad={() => console.log('Image loaded successfully')}
                    />
                  </DraggableItem>
                ) : (
                  <View style={canvasStyle.emptyCanvas}>
                    <Text style={canvasStyle.emptyCanvasText}>
                      Canvas Kosong
                    </Text>
                  </View>
                )}
                {contents.map((content, index) => (
                  <DraggableItem
                    key={index}
                    zIndex={3}
                    initialPosition={{x: 0, y: 0}}>
                    <TextEditor
                      onDelete={() => onDelete(index)}
                      onDuplicate={onDuplicate}
                      textStyles={content}
                      setTextStyles={styles => {
                        setContents(prevContents =>
                          prevContents.map((item, i) =>
                            i === index ? styles : item,
                          ),
                        );
                      }}
                    />
                  </DraggableItem>
                ))}
                {images.map((content, index) => (
                  <DraggableItem
                    key={index}
                    zIndex={3}
                    initialPosition={{x: 0, y: 0}}>
                    <ImageEditor content={content} />
                  </DraggableItem>
                ))}
              </View>
            </ZoomableCanvas>
          </ViewShot>
        </View>
      </GestureHandlerRootView>
      <CanvasButtons
        onAddImage={onAddImage}
        onAddText={onAddText}
        onExport={onExport}
      />
    </SafeAreaView>
  );
};

export default CanvasScreen;
