import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type DraggableProps = {
  children: React.ReactNode;
  initialPosition?: {x: number; y: number};
  initialScale?: number;
  zIndex?: number;
};
const DragagableItem = (props: DraggableProps) => {
  const {children, initialPosition = {x: 0, y: 0}, initialScale = 1} = props;
  const scale = useSharedValue(initialScale);
  const savedScale = useSharedValue(initialScale);
  const translateX = useSharedValue(initialPosition.x);
  const translateY = useSharedValue(initialPosition.y);
  const offset = useSharedValue({x: 0, y: 0});

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offset.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(e => {
      translateX.value = offset.value.x + e.translationX / savedScale.value;
      translateY.value = offset.value.y + e.translationY / savedScale.value;
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
    position: 'absolute',
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
    zIndex: props.zIndex || 1,
  }));

  return (
    <GestureDetector gesture={Gesture.Simultaneous(panGesture, pinchGesture)}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </GestureDetector>
  );
};
export default DragagableItem;
