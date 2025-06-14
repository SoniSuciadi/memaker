import React, {useMemo, useState} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
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
import {Asset} from 'react-native-image-picker';
import ImageEditor from '../../components/image-editor';
import {canvasStyle} from './style';
import {useImagePicker} from '../../hooks/useImagePicker';
import {useCanvasExport} from '../../hooks/useExport';

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

  const {pickImage} = useImagePicker();
  const {viewShotRef, exportCanvas} = useCanvasExport();

  const onDelete = (index: number) => {
    setContents(prev => prev.filter((_, i) => i !== index));
  };

  const onDuplicate = (text: TextStyles) => {
    setContents(prev => [...prev, text]);
  };

  const onAddText = () => {
    setContents(prev => [
      ...prev,
      {text: '', color: '#000000', fontWeight: 'normal'},
    ]);
  };

  const onAddImage = async () => {
    const selectedImage = await pickImage();
    if (selectedImage?.uri) {
      setImages(prev => [...prev, selectedImage]);
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
        onExport={exportCanvas}
      />
    </SafeAreaView>
  );
};

export default CanvasScreen;
