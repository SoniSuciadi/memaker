import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const AnimatedImage = Animated.createAnimatedComponent(Image);

const CanvasScreen: React.FC = () => {
  const imageSize = {width: 200, height: 200};

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(screenWidth / 2 - imageSize.width / 2);
  const translateY = useSharedValue(screenHeight / 4);
  const offset = useSharedValue({x: 0, y: 0});

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offset.value = {
        x: translateX.value,
        y: translateY.value,
      };
    })
    .onUpdate(e => {
      translateX.value = offset.value.x + e.translationX / savedScale.value;
      translateY.value = offset.value.y + e.translationY / savedScale.value;
    })
    .onEnd(() => {
      const scaledWidth = imageSize.width * scale.value;
      const scaledHeight = imageSize.height * scale.value;

      const maxX = screenWidth - scaledWidth;
      const maxY = screenHeight * 0.7 - scaledHeight;

      translateX.value = withSpring(
        Math.max(0, Math.min(translateX.value, maxX)),
        {damping: 20},
      );
      translateY.value = withSpring(
        Math.max(0, Math.min(translateY.value, maxY)),
        {damping: 20},
      );
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(Math.max(0.5, Math.min(scale.value, 3)));
      savedScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    width: imageSize.width,
    height: imageSize.height,
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Canvas Screen</Text>

      <GestureHandlerRootView style={styles.gestureContainer}>
        <GestureDetector
          gesture={Gesture.Simultaneous(panGesture, pinchGesture)}>
          <View style={styles.canvas}>
            <View style={styles.background} />

            <Text style={styles.text}>Editable Text</Text>

            <AnimatedImage
              style={[styles.image, animatedStyle]}
              source={require('../../assets/template/1.jpg')}
              resizeMode="contain"
            />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gestureContainer: {
    flex: 1,
    width: '100%',
  },
  canvas: {
    flex: 1,
    overflow: 'hidden',
  },
  background: {
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
  text: {
    position: 'absolute',
    left: 150,
    top: 150,
    fontSize: 20,
    color: 'black',
    zIndex: 1,
  },
  image: {
    position: 'absolute',
    zIndex: 2,
  },
});

export default CanvasScreen;
