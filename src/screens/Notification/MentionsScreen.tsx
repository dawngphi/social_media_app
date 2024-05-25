import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ListRenderItem,
} from 'react-native';
interface ListItem {
  id: number;
  title: string;
  follow: string;
  tag: string;
  time: string;
  imageUri?: string;
  type?: number;
  icon?: string;
}
import {useTranslation} from 'react-i18next';

const formatText = (text: string) => {
  return text.length > 20 ? text.slice(0, 20) + '...' : text;
};

const MentionsScreen = () => {
  const {t} = useTranslation();
  const data: ListItem[] = [
    {
      id: 1,
      imageUri:
        'https://lh3.googleusercontent.com/-eKol7jffhIA/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkmrGrt3N80VTCfonwvlUE4RXRIjgg/s128-c/photo.jpg',
      title: 'Nightgamer mentioned you',
      follow: 'Turn up the heat with my UTOPIA',
      tag: '@traviscott you are the bes rapp',
      time: '2s',
      icon: 'https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/432783167_821826239776796_3320816307640071840_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FbH5GxF8_TIAb7d8FbV&_nc_ht=scontent.fsgn5-11.fna&oh=00_AfDY3Ildncoq75AbFZ4SOje8LEsy-GlUwfkNVnXuVWZV-Q&oe=661A620C',
      type: 1,
    },
    {
      id: 2,
      imageUri:
        'https://lh3.googleusercontent.com/-eKol7jffhIA/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkmrGrt3N80VTCfonwvlUE4RXRIjgg/s128-c/photo.jpg',
      title: 'quanhoang mentioned you',
      follow: 'Turn up the heat with my UTOPIA',
      tag: '@traviscott you are the bes rapp',
      time: '2s',
      icon: 'https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/432783167_821826239776796_3320816307640071840_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FbH5GxF8_TIAb7d8FbV&_nc_ht=scontent.fsgn5-11.fna&oh=00_AfDY3Ildncoq75AbFZ4SOje8LEsy-GlUwfkNVnXuVWZV-Q&oe=661A620C',
      type: 1,
    },
    {
      id: 3,
      imageUri:
        'https://lh3.googleusercontent.com/-eKol7jffhIA/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkmrGrt3N80VTCfonwvlUE4RXRIjgg/s128-c/photo.jpg',
      title: 'Nightgamer mentioned you',
      follow: 'Take care of your self. You’re all you have.',
      tag: '@traviscott this quote hits me hard for real',
      time: '2s',
      icon: 'https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/432783167_821826239776796_3320816307640071840_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FbH5GxF8_TIAb7d8FbV&_nc_ht=scontent.fsgn5-11.fna&oh=00_AfDY3Ildncoq75AbFZ4SOje8LEsy-GlUwfkNVnXuVWZV-Q&oe=661A620C',
      type: 2,
    },
  ];

  const renderItem: ListRenderItem<ListItem> = ({item}) => (
    <View>
      <View style={styles.containerView}>
        <View style={styles.imgView}>
          <Image source={{uri: item.imageUri}} style={styles.image} />
          {item.icon && (
            <Image style={styles.imageIcon} source={{uri: item.icon}} />
          )}
        </View>
        <View style={{}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.follow}>{formatText(item.follow)}</Text>
          <Text style={styles.tag}>{formatText(item.tag)}</Text>
          <Text>{item.time}</Text>
        </View>
        {item.type === 1 && (
          <View style={styles.buttonContainer}>
            <Image style={styles.imageFollow} source={{uri: item.imageUri}} />
          </View>
        )}
      </View>
      <View
        style={{
          borderBottomColor: '#F1F1F1',
          borderBottomWidth: 1,
          margin: 10,
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MentionsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  imgView: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    aspectRatio: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2C2B2B',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flex: 1,
  },
  imageFollow: {
    width: 65,
    height: 65,
    borderRadius: 8,
    flexShrink: 8,
  },
  follow: {},
  tag: {},
  imageIcon: {
    width: 15,
    height: 15,
    position: 'absolute',
    bottom: 20,
    left: 0,
    // color: '#FFFFFF',
    backgroundColor: '#E693BF',
    borderRadius: 30,
  },
});
