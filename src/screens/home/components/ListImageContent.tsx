import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import event = Animated.event;
import AutoHeightImage from 'react-native-auto-height-image';
import {Media} from '@/type';

interface ListMediaContentProps {
  medias: Media[];
}

const {width} = Dimensions.get('window');
const previewCount = 1;
const itemMarginLeft = 12;
const itemWidth = width / (previewCount + 0.25);
const startScroll = itemWidth - itemWidth * 0.0625 - 12;

const ListImageContent = ({medias}: ListMediaContentProps) => {
  const snapToOffsets = medias.map((x, i) => {
    return i * itemWidth + startScroll;
  });

  return (
    <FlatList
      keyExtractor={(item) => item._id}
      pagingEnabled={true}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToOffsets={snapToOffsets}
      snapToAlignment={'center'}
      data={medias}
      renderItem={({item, index}) => (
        <AutoHeightImage
          source={{uri: item.link}}
          width={itemWidth - itemMarginLeft}
          style={[
            styles.image,
            index === 0
              ? {marginLeft: 16}
              : index === medias.length - 1
              ? {
                  marginRight: 16,
                  marginLeft: 16,
                }
              : {marginLeft: itemMarginLeft},
          ]}
        />
      )}
    />
  );
};

export default ListImageContent;

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height:400,
    resizeMode: 'cover',
    aspectRatio: 4/6,
  },
});