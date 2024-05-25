import {Dimensions, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import {ImageOrVideo} from 'react-native-image-crop-picker';

interface ListMediaContentProps {
  medias: Array<ImageOrVideo>;
}

const {width} = Dimensions.get('window');
const previewCount = 1;
const itemMarginLeft = 12;
const itemWidth = width / (previewCount + 0.25);
const startScroll = itemWidth - itemWidth * 0.0625 - 12;

const ListMediaContent = ({medias}: ListMediaContentProps) => {
  const snapToOffsets = medias.map((x, i) => {
    return i * itemWidth + startScroll;
  });

  return (
    <FlatList
      pagingEnabled={true}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToOffsets={snapToOffsets}
      snapToAlignment={'center'}
      data={medias}
      renderItem={({item, index}) => (
        <Image
          source={{uri: item.path}}
          style={[
            styles.image,
            {height: itemWidth * (item.height / item.width)},
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

export default ListMediaContent;

const styles = StyleSheet.create({
  image: {
    width: itemWidth - itemMarginLeft,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
