import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
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

const {width: screenWidth} = Dimensions.get('window');

type CanvasScreenRouteProp = RouteProp<RootStackParamList, 'canvas'>;
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'canvas'>;
  route: CanvasScreenRouteProp;
};

const CanvasScreen: React.FC<Props> = ({route}) => {
  const {canvasId} = route.params;
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
  const onAddImage = () => {};
  const onExport = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Canvas Screen</Text>

      <GestureHandlerRootView style={styles.gestureContainer}>
        <View style={styles.canvasOuterContainer}>
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
            </View>
          </ZoomableCanvas>
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
