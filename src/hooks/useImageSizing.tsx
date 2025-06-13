import {useEffect, useState} from 'react';
import {_Image} from 'react-native';
import {Template} from '../constant/arrayOfTemplate';

const useImageSizing = (selectTemplateImage: Template | undefined) => {
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [calculatedSize, setCalculatedSize] = useState({
    width: 0,
    height: 0,
  });

  const handleLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setContainerSize({width, height});
  };

  useEffect(() => {
    if (selectTemplateImage) {
      const {width, height} = _Image.resolveAssetSource(
        selectTemplateImage.image,
      );
      setImageSize({width, height});
    }
  }, [selectTemplateImage]);

  useEffect(() => {
    if (containerSize.width > 0 && imageSize.width > 0) {
      const containerRatio = containerSize.height / containerSize.width;
      const imageRatio = imageSize.height / imageSize.width;

      let finalWidth, finalHeight;

      if (imageRatio > containerRatio) {
        finalHeight = containerSize.height;
        finalWidth = finalHeight / imageRatio;
      } else {
        finalWidth = containerSize.width;
        finalHeight = finalWidth * imageRatio;
      }

      setCalculatedSize({
        width: finalWidth,
        height: finalHeight,
      });
    }
  }, [containerSize, imageSize]);

  return {
    calculatedSize,
    handleLayout,
  };
};

export default useImageSizing;
