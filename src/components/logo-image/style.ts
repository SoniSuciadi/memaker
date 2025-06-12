import {ImageStyle, StyleProp} from 'react-native';

export const logoImageSize = (size: number): StyleProp<ImageStyle> => {
  return {
    width: size,
    height: size,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
};
