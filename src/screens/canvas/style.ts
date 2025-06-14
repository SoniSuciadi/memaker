import {Dimensions, StyleSheet} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

export const canvasStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gestureContainer: {
    flex: 1,
    width: '100%',
  },
  canvasOuterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    overflow: 'hidden',
  },
  zoomableCanvas: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
  },
  canvas: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'gray',
  },
  canvasBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'lightgray',
    opacity: 0.3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {},
  emptyCanvas: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  emptyCanvasText: {
    fontSize: 18,
    color: '#888',
  },
  textInput: {
    minWidth: 100,
    minHeight: 40,
    backgroundColor: 'white',
  },
});
