import {StyleSheet, Text, View, FlatList, Animated} from 'react-native';
import React, { useState } from 'react';
import {MyPostState} from '@/redux/slice/mypost.slice';
import {useAppSelector} from '@/redux/store';
import CardView from '@/screens/home/components/CardView';
import {colors} from '@/theme';
import { Post } from '@/type';

interface Props {
  post?:Post[]
  scrollY: any; // hoặc thay any bằng kiểu dữ liệu phù hợp nếu có
}

  const RepliesProfile:React.FC<Props> = ({ scrollY ,post}) => {
    const { myRepost}: MyPostState = useAppSelector(
      state => state.myPost,
    );
    // console.log('myRepost',myRepost[0].reactions.length )
    return (
      <View style={styles.container}>
     <Animated.FlatList
    contentContainerStyle={{paddingBottom: 1000}}
        ListFooterComponent={
          <View
            style={{
              width: 10,
              margin: 35,
              height: 10,
              alignSelf: 'center',
              borderRadius: 15,
              backgroundColor: colors.primaryColor,
            }}
          />
        }
        data={post ?? myRepost}
        renderItem={({item}) => (
          console.log('item', item.reactions),
          (
            <CardView
            fullName={item.author.fullName}
              userName={item.author.userName}
              resposter={item.reposter}
              userId={item.author._id}
              _id={item._id}
              isLike={item.isLiked}
              key={item._id}
              style={{marginTop: 10}}
              avatar={item.author.avatar}
              hour={item.createdAt}
              title={item.author.fullName}
              description={item.body}
              tag={''}
              image={item.media}
              star={item.reactions.length}
              comment={item.comments.length}
              showView={true}
            />
          )
        )}
        keyExtractor={item => item._id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16} // Adjust based on your needs
      />
    </View>
  );
};

export default RepliesProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});
