export interface TextEditorState {
  text: string;
  color: string;
  fontWeight: 'normal' | 'bold';
  showColorPicker: boolean;
}
export interface TextStyles {
  color: string;
  fontWeight: 'normal' | 'bold';
  text: string;
}

export interface ModalTextInputRef {
  open: (currentStyles?: Partial<TextStyles>) => void;
  close: () => void;
  getStyles: () => TextStyles;
}

export interface ModalTextInputProps {
  onSave: (styles: TextStyles) => void;
  onDelete: () => void;
  onDuplicate: (text: TextStyles) => void;
}
