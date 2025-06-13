import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type ZoomableCanvasProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  initialScale?: number;
};

const ZoomableCanvas: React.FC<ZoomableCanvasProps> = ({
  children,
  style,
  initialScale = 1,
}) => {
  const scale = useSharedValue(initialScale);
  const savedScale = useSharedValue(initialScale);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offset = useSharedValue({x: 0, y: 0});

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offset.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(e => {
      translateX.value = offset.value.x + e.translationX;
      translateY.value = offset.value.y + e.translationY;
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
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  return (
    <GestureDetector gesture={Gesture.Simultaneous(panGesture, pinchGesture)}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default ZoomableCanvas;
