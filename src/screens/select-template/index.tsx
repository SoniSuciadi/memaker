import {Image, ScrollView, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {arrayOfTemplate} from '../../constant/arrayOfTemplate';
import {Text} from 'react-native';
import {SelectTemplateScreenNavigationProp} from '../../navigation/config';
import {useNavigation} from '@react-navigation/native';
import {selectTemplateStyle} from './style';

const SelectTemplateScreen = () => {
  const navigation = useNavigation<SelectTemplateScreenNavigationProp>();
  return (
    <SafeAreaView style={selectTemplateStyle.container}>
      <Text style={selectTemplateStyle.headerTitle}>Select meme Template</Text>
      <ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={selectTemplateStyle.scrollContainer}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        style={selectTemplateStyle.scrollView}>
        {arrayOfTemplate.map((template, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('canvas', {canvasId: template.id})
            }>
            <View style={selectTemplateStyle.imageContainer}>
              <Text style={selectTemplateStyle.title}>{template.title}</Text>
              <Image
                source={template.image}
                style={selectTemplateStyle.image}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectTemplateScreen;
