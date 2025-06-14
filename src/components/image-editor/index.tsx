import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import Slider from '@react-native-community/slider';
import {imageEditorStyle} from './style';

const ImageEditor = (props: {content: Asset}) => {
  const [opacity, setOpacity] = useState(1);
  const [showSlider, setShowSlider] = useState(false);

  const handleLongPress = () => {
    setShowSlider(true);
  };

  const handleCloseSlider = () => {
    setShowSlider(false);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={handleLongPress}
        delayLongPress={500}>
        <Image
          source={{uri: props.content.uri || ''}}
          style={{
            width: props.content.width || '100%',
            height: props.content.height || '100%',
            opacity: opacity,
          }}
          resizeMode="contain"
          onLoad={() => console.log('Image loaded successfully')}
        />
      </TouchableOpacity>

      <Modal
        visible={showSlider}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseSlider}>
        <TouchableWithoutFeedback onPress={handleCloseSlider}>
          <View style={imageEditorStyle.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={imageEditorStyle.sliderContainer}>
          <Text style={imageEditorStyle.sliderTitle}>Atur Opasitas Gambar</Text>
          <View style={imageEditorStyle.sliderWrapper}>
            <Text style={imageEditorStyle.opacityText}>0%</Text>
            <Slider
              style={imageEditorStyle.slider}
              minimumValue={0}
              maximumValue={1}
              value={opacity}
              onValueChange={setOpacity}
              step={0.1}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              thumbTintColor="#000000"
            />
            <Text style={imageEditorStyle.opacityText}>100%</Text>
          </View>
          <Text style={imageEditorStyle.currentValue}>
            {Math.round(opacity * 100)}% Opacity
          </Text>
        </View>
      </Modal>
    </>
  );
};

export default ImageEditor;
