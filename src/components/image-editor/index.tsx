import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import Slider from '@react-native-community/slider';

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
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderTitle}>Atur Opasitas Gambar</Text>
          <View style={styles.sliderWrapper}>
            <Text style={styles.opacityText}>0%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={opacity}
              onValueChange={setOpacity}
              step={0.1}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              thumbTintColor="#000000"
            />
            <Text style={styles.opacityText}>100%</Text>
          </View>
          <Text style={styles.currentValue}>
            {Math.round(opacity * 100)}% Opacity
          </Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  sliderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  opacityText: {
    fontSize: 14,
    color: '#666',
  },
  currentValue: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default ImageEditor;
