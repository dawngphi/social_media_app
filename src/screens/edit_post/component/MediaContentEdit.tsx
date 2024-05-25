import {Dimensions} from 'react-native';
import React from 'react';
import {Media} from '@/type';
import AutoHeightImage from 'react-native-auto-height-image';

interface MediaContentProps {
  media: Media;
}

const {width} = Dimensions.get('window');
const imageWidth = width - 32;

const MediaContentEdit = ({media}: MediaContentProps) => {
  return (
    <AutoHeightImage
      source={{uri: media.link}}
      width={imageWidth}
      style={{
        borderRadius: 12,
      }}
    />
  );
};

export default MediaContentEdit;
