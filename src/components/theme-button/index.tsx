import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {ThemeButtonProps} from './types';
import {themeButtonStyle} from './style';

const ThemeButton = (props: ThemeButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const buttonStyle = useMemo(
    () =>
      themeButtonStyle({
        background: props.backgroundColor,
        isPressed: isPressed,
        borderRadius: props.borderRadius,
        fontSize: props.fontSize,
        fontColor: props.fontColor,
        fontWeight: props.fontWeight,
      }),
    [
      isPressed,
      props.backgroundColor,
      props.borderRadius,
      props.fontColor,
      props.fontSize,
      props.fontWeight,
    ],
  );
  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={props.onPress}
      activeOpacity={0.7}>
      <View style={buttonStyle.button}>
        <Text style={buttonStyle.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ThemeButton;
