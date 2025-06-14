import {StyleSheet} from 'react-native';

export const modalTextInputstyles = StyleSheet.create({
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
