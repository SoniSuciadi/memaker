import {StyleSheet, View} from 'react-native';
import ThemeButton from '../theme-button';

const CanvasButtons = (props: {
  onAddText: () => void;
  onAddImage: () => void;
  onExport: () => void;
}) => {
  return (
    <View style={canvasButtonsStyles.fabContainer}>
      <View style={canvasButtonsStyles.buttonsContainer}>
        <ThemeButton
          backgroundColor="#3B4658"
          onPress={props.onAddText}
          text="+ Text"
        />
        <ThemeButton
          backgroundColor="#3B4658"
          onPress={props.onAddImage}
          text="+ Gambar"
        />
        <ThemeButton
          backgroundColor="#3B4658"
          onPress={props.onExport}
          text="Export"
        />
      </View>
    </View>
  );
};
export default CanvasButtons;

const canvasButtonsStyles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  buttonsContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
});
