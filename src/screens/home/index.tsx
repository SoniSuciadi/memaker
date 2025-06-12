import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LogoImage from '../../components/logo-image';
import homeStyle from './home.style';
import ThemeButton from '../../components/theme-button';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../navigation/config';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <SafeAreaView style={homeStyle.container}>
      <View style={homeStyle.imageLogoContainer}>
        <LogoImage size={200} />
        <Text style={homeStyle.title}>Memaker</Text>
        <ThemeButton
          text="Let's Create a Template"
          backgroundColor="#3B4658"
          fontColor="#FFFFFF"
          fontSize={16}
          fontWeight="bold"
          borderRadius={12}
          onPress={() => {
            console.log('Navigating to select-template');
            navigation.navigate('select-template');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
