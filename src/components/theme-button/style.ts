import {StyleSheet} from 'react-native';

export const themeButtonStyle = (params: {
  background: string;
  borderRadius?: number;
  fontSize?: number;
  fontColor?: string;
  fontWeight?: 'normal' | 'bold';
  isPressed?: boolean;
}) => {
  return {
    button: StyleSheet.create({
      button: {
        minWidth: 100,
        minHeight: 30,
        backgroundColor: params.background || '#3B4658',
        borderRadius: params.borderRadius || 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
    }).button,
    text: StyleSheet.create({
      text: {
        color: params.fontColor || 'white',
        fontWeight: params.fontWeight || 'normal',
        fontSize: params.fontSize || 16,
      },
    }).text,
  };
};
