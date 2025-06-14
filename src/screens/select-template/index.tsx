import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {arrayOfTemplate} from '../../constant/arrayOfTemplate';
import {Text} from 'react-native';
import {SelectTemplateScreenNavigationProp} from '../../navigation/config';
import {useNavigation} from '@react-navigation/native';

const SelectTemplateScreen = () => {
  const navigation = useNavigation<SelectTemplateScreenNavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Select meme Template</Text>
      <ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        style={styles.scrollView}>
        {arrayOfTemplate.map((template, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('canvas', {canvasId: template.id})
            }>
            <View style={styles.imageContainer}>
              <Text style={styles.title}>{template.title}</Text>
              <Image
                source={template.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    color: '#333',
  },
  scrollView: {
    marginBottom: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 15,
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  image: {
    width: 250,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default SelectTemplateScreen;
