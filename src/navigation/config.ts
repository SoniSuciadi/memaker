import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  home: undefined;
  'select-template': undefined;
  canvas: {canvasId: string};
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'home'
>;
export type SelectTemplateScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'select-template'
>;
export type CanvasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'canvas'
>;
