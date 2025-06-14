import React, {useMemo, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
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

const {width: screenWidth} = Dimensions.get('window');

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Canvas Screen</Text>

      <GestureHandlerRootView style={styles.gestureContainer}>
        <View style={styles.canvasOuterContainer}>
          <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
            <ZoomableCanvas style={styles.zoomableCanvas}>
              <View style={styles.canvas} onLayout={handleLayout}>
                <View style={styles.canvasBackground} />

                {selectTemplateImage ? (
                  <DraggableItem zIndex={2} initialPosition={{x: 0, y: 0}}>
                    <Image
                      source={selectTemplateImage.image}
                      style={[
                        styles.image,
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
                  <View style={styles.emptyCanvas}>
                    <Text style={styles.emptyCanvasText}>Canvas Kosong</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gestureContainer: {
    flex: 1,
    width: '100%',
  },
  canvasOuterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    overflow: 'hidden',
  },
  zoomableCanvas: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
  },
  canvas: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'gray',
  },
  canvasBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'lightgray',
    opacity: 0.3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {},
  emptyCanvas: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  emptyCanvasText: {
    fontSize: 18,
    color: '#888',
  },
  textInput: {
    minWidth: 100,
    minHeight: 40,
    backgroundColor: 'white',
  },
});

export default CanvasScreen;
