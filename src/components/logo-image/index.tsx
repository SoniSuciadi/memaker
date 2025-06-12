import {useMemo} from 'react';
import {Image, View} from 'react-native';
import {logoImageSize} from './style';

const LogoImage = ({size}: {size: number}) => {
  const imageStyle = useMemo(() => logoImageSize(size), [size]);
  return (
    <View>
      <Image
        source={require('../../assets/image/logo.png')}
        style={imageStyle}
      />
    </View>
  );
};
export default LogoImage;
