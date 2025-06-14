import {launchImageLibrary} from 'react-native-image-picker';
import {Asset} from 'react-native-image-picker';
import {Alert} from 'react-native';

export const useImagePicker = () => {
  const pickImage = async (): Promise<Asset | null> => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return null;
      }

      if (result.errorCode) {
        console.error('ImagePicker Error: ', result.errorMessage);
        Alert.alert('Error', 'Failed to pick image');
        return null;
      }

      return result.assets?.[0] || null;
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while picking image');
      return null;
    }
  };

  return {pickImage};
};
