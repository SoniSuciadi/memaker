import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ColorPicker from 'react-native-wheel-color-picker';
import ThemeButton from '../theme-button';
import {ModalTextInputProps, ModalTextInputRef, TextEditorState} from './types';
import {modalTextInputstyles} from './style';

const ModalTextInput = forwardRef<ModalTextInputRef, ModalTextInputProps>(
  ({onSave, onDelete, onDuplicate}, ref) => {
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
        <View style={modalTextInputstyles.modalOverlay}>
          <View style={modalTextInputstyles.modalContainer}>
            <TextInput
              style={[
                modalTextInputstyles.textInput,
                {color: state.color, fontWeight: state.fontWeight},
              ]}
              value={state.text}
              onChangeText={text => updateState({text})}
              placeholder="Ketik disini..."
              multiline
            />

            <View style={modalTextInputstyles.toolbar}>
              <TouchableOpacity
                onPress={() =>
                  updateState({
                    fontWeight:
                      state.fontWeight === 'normal' ? 'bold' : 'normal',
                  })
                }
                style={modalTextInputstyles.toolButton}>
                <Icon name="format-bold" size={24} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  updateState({
                    showColorPicker: !state.showColorPicker,
                  })
                }
                style={modalTextInputstyles.toolButton}>
                <Icon name="color-lens" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onSave({
                    text: state.text,
                    color: state.color,
                    fontWeight: state.fontWeight,
                  });
                  onDuplicate({
                    text: state.text,
                    color: state.color,
                    fontWeight: state.fontWeight,
                  });
                  setOpen(false);
                }}
                style={modalTextInputstyles.toolButton}>
                <Icon name="content-copy" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onDelete}
                style={modalTextInputstyles.toolButton}>
                <Icon name="delete" size={24} />
              </TouchableOpacity>
            </View>
            {state.showColorPicker && (
              <View style={modalTextInputstyles.colorPickerContainer}>
                <ColorPicker
                  color={state.color}
                  onColorChange={color => updateState({color})}
                  sliderSize={25}
                  wheelHidden
                />
              </View>
            )}

            <View style={modalTextInputstyles.buttonContainer}>
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

export default ModalTextInput;
