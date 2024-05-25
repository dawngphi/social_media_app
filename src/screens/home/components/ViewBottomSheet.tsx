import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SvgAdd from '@/assets/icons/iconSVG/Add';
import {colors} from '@/theme';
import SvgMute from '@/assets/icons/iconSVG/Mute';
import SvgHide from '@/assets/icons/iconSVG/Hide';
import SvgBlock from '@/assets/icons/iconSVG/Block';
import {useTranslation} from 'react-i18next';
import {Author} from '@/type';
import {userInfoSelector} from '@/redux/test/userStore';
import {useAppSelector} from '@/redux/store';
import {icons} from '@/assets';

interface ViewBottomSheetProps {
  author: Author | undefined;
  onPressToggle?: () => void;
  onPressMute?: () => void;
  title?: string;
  onPressHide?: () => void;
  onPressBlock?: () => void;
  onPressEdit?: () => void;
  onPressReport?: () => void;
  onPressRemove?: () => void;
}
const ViewBottomSheet: React.FC<ViewBottomSheetProps> = ({
  author,
  onPressToggle,
  onPressMute,
  title,
  onPressBlock,
  onPressHide,
  onPressEdit,
  onPressReport,
  onPressRemove,
}) => {
  const {t} = useTranslation();
  const userInfo = useAppSelector(userInfoSelector);

  return (
    <View style={styles.container}>
      {userInfo._id === author?._id ? (
        <View>
          <TouchableOpacity style={styles.follow} onPress={onPressEdit}>
            <Image
              source={icons.ic_edit}
              style={[styles.img, {width: 22, height: 22}]}
            />
            <Text style={styles.textFollow}>{t('Edit')}</Text>
          </TouchableOpacity>
          <View style={{marginTop: 16}} />
          <TouchableOpacity style={styles.follow} onPress={onPressRemove}>
            <Image
              source={icons.ic_remove}
              style={[styles.img, {width: 22, height: 22}]}
            />
            <Text style={styles.textFollow}>{t('Remove')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.click} onPress={onPressReport}>
            <Image
              source={icons.ic_report}
              style={[styles.img, {width: 22, height: 22}]}
            />
            <Text style={styles.textFollow}>{t('Report')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default React.memo(ViewBottomSheet);

const styles = StyleSheet.create({
  click: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  container2: {
    width: 326,
    paddingBottom: 12,
    marginTop: 16,
    backgroundColor: colors.greyLight,
    borderRadius: 10,
    alignSelf: 'center',
  },
  img: {
    marginStart: 24,
  },
  container: {
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.white,
  },
  follow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greyLight,
    borderRadius: 10,
    width: 330,
    height: 50,
    alignSelf: 'center',
  },
  textFollow: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.black,
    marginStart: 20,
  },
});
