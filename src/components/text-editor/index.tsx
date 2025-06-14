import {useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import ModalTextInput from '../modal-text-input';
import {ModalTextInputRef, TextStyles} from '../modal-text-input/types';
import {textEditorStyles} from './style';

const TextEditor = (props: {
  onDelete: () => void;
  onDuplicate: (text: TextStyles) => void;
  textStyles: TextStyles;
  setTextStyles: (text: TextStyles) => void;
}) => {
  const {textStyles, setTextStyles, onDelete, onDuplicate} = props;
  const textInputModal = useRef<ModalTextInputRef>(null);
  const handleOpenModal = () => {
    textInputModal.current?.open(textStyles);
  };

  return (
    <View style={textEditorStyles.container}>
      <TouchableOpacity onPress={handleOpenModal}>
        <Text style={textStyles}>{textStyles.text || 'Click to add text'}</Text>
      </TouchableOpacity>
      <ModalTextInput
        ref={textInputModal}
        onSave={styles => {
          setTextStyles(styles);
        }}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
      />
    </View>
  );
};

export default TextEditor;
