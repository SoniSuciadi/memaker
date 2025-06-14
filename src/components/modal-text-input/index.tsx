import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ColorPicker from 'react-native-wheel-color-picker';
import ThemeButton from '../theme-button';
import {ModalTextInputProps, ModalTextInputRef, TextEditorState} from './types';

const ModalTextInput = forwardRef<ModalTextInputRef, ModalTextInputProps>(
  ({onSave}, ref) => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<TextEditorState>({
      text: '',
      color: '#000000',
      fontWeight: 'normal',
      showColorPicker: false,
    });

    useImperativeHandle(ref, () => ({
      open: (currentStyles = {}) => {
        setState(prev => ({
          ...prev,
          text: currentStyles.text || '',
          color: currentStyles.color || '#000000',
          fontWeight: currentStyles.fontWeight || 'normal',
          showColorPicker: true,
        }));
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
      getStyles: () => ({
        text: state.text,
        color: state.color,
        fontWeight: state.fontWeight,
      }),
    }));

    const handleSave = () => {
      onSave({
        text: state.text,
        color: state.color,
        fontWeight: state.fontWeight,
      });
      setOpen(false);
    };

    const updateState = (updates: Partial<TextEditorState>) => {
      setState(prev => ({...prev, ...updates}));
    };

    return (
      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TextInput
              style={[
                styles.textInput,
                {color: state.color, fontWeight: state.fontWeight},
              ]}
              value={state.text}
              onChangeText={text => updateState({text})}
              placeholder="Ketik disini..."
              multiline
            />

            <View style={styles.toolbar}>
              <TouchableOpacity
                onPress={() =>
                  updateState({
                    fontWeight:
                      state.fontWeight === 'normal' ? 'bold' : 'normal',
                  })
                }
                style={styles.toolButton}>
                <Icon
                  name="format-bold"
                  size={24}
                  color={state.fontWeight === 'bold' ? '#007AFF' : '#000000'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  updateState({
                    showColorPicker: !state.showColorPicker,
                  })
                }
                style={styles.toolButton}>
                <Icon name="color-lens" size={24} color={state.color} />
              </TouchableOpacity>
            </View>
            {state.showColorPicker && (
              <View style={styles.colorPickerContainer}>
                <ColorPicker
                  color={state.color}
                  onColorChange={color => updateState({color})}
                  sliderSize={25}
                  wheelHidden
                />
              </View>
            )}

            <View style={styles.buttonContainer}>
              <ThemeButton
                backgroundColor="#FFFFFF"
                fontColor="#3B4658"
                text="Batalkan"
                onPress={() => setOpen(false)}
              />
              <ThemeButton
                backgroundColor="#3B4658"
                text="Simpan"
                onPress={handleSave}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  textInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  toolbar: {
    flexDirection: 'row',
  },
  toolButton: {
    marginRight: 15,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  cancelButton: {
    padding: 10,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#007AFF',
  },
  saveButtonText: {
    color: 'white',
  },
  colorPickerContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    height: 100,
  },
  colorPickerCloseButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  colorPickerCloseText: {
    color: '#007AFF',
  },
});

export default ModalTextInput;
