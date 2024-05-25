import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colors} from '@/theme';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {Dispatch, SetStateAction} from 'react';
import React from 'react';
import {icons} from '@/assets';
import {useTranslation} from 'react-i18next';

interface ToolBarProps {
  setMedias: Dispatch<SetStateAction<ImageOrVideo[]>>;
  setToolBarHeight: Dispatch<SetStateAction<number>>;
  audienceType: number;
  handlePresentModalPress: any;
  handlePresentImageModalPress: any;
  showBottomSheet: Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
}

const ToolBar = ({
  setToolBarHeight,
  audienceType,
  handlePresentModalPress,
  handlePresentImageModalPress,
  editMode,
}: ToolBarProps) => {
  const onLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setToolBarHeight(height + 24);
  };

  const {t} = useTranslation();

  return (
    <View style={styles.body} onLayout={onLayout}>
      {editMode ? (
        <View />
      ) : (
        <TouchableOpacity onPress={handlePresentImageModalPress}>
          <FontAwesomeIcon
            icon={faPaperclip}
            size={24}
            color={colors.primaryColor}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={styles.audience}>
        <Image
          style={{width: 34, height: 24}}
          source={
            audienceType === 0
              ? icons.planet
              : audienceType === 1
              ? icons.frame
              : icons.ic_tag
          }
        />
        <Text style={styles.audienceText}>
          {audienceType === 0
            ? t('Everyone can reply')
            : audienceType === 1
            ? t('People you follow')
            : t('Only people you mention')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToolBar;

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.neutralWhite4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  audience: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  audienceText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.primaryColor,
    marginLeft: 8,
  },
});
