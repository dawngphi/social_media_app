import { Dimensions, Image } from "react-native";
import React from "react";
import { ImageOrVideo } from "react-native-image-crop-picker";

interface MediaContentProps {
  media: ImageOrVideo;
}

const { width } = Dimensions.get("window");
const imageWidth = width - 32;

const MediaContent = ({ media }: MediaContentProps) => {
  return (
    <Image source={{ uri: media.path }}
           style={{
             width: imageWidth,
             height: imageWidth * media.height / media.width, borderRadius: 12
           }} />
  );
};

export default MediaContent;
