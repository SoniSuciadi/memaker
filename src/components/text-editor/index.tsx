import React, {useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import ModalTextInput, {
  ModalTextInputRef,
  TextStyles,
} from '../modal-text-input';

const TextEditor = () => {
  const [textStyles, setTextStyles] = useState<TextStyles>({
    text: '',
    color: '#000000',
    fontWeight: 'normal',
  });

  const textInputModal = useRef<ModalTextInputRef>(null);
  const handleOpenModal = () => {
    textInputModal.current?.open(textStyles);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenModal}>
        <Text style={textStyles}>{textStyles.text || 'Edit teks'}</Text>
      </TouchableOpacity>
      <ModalTextInput
        ref={textInputModal}
        onSave={styles => {
          setTextStyles(styles);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    textAlignVertical: 'top',
    padding: 8,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  toolbarButton: {
    padding: 8,
    alignItems: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TextEditor;
