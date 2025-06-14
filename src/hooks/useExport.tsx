import {useRef} from 'react';
import {Platform, Alert} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {PermissionsAndroid} from 'react-native';
import ViewShot from 'react-native-view-shot';

export const useCanvasExport = () => {
  const viewShotRef = useRef<ViewShot>(null);

  const exportCanvas = async () => {
    try {
      if (!viewShotRef.current?.capture) return;

      if (Platform.OS === 'android' && Platform.Version <= 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to storage to save images',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Cannot save without storage permission',
          );
          return;
        }
      }

      const uri = await viewShotRef.current.capture();
      await CameraRoll.save(uri, {type: 'photo'});
      Alert.alert('Success', 'Design saved to gallery');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert(
        'Error',
        'Failed to save design: ' + (error as Error).message,
      );
    }
  };

  return {viewShotRef, exportCanvas};
};
