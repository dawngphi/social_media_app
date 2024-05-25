import {Post, PostResponse} from '@/type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NewfeedAction} from '../action/newfeed.action';
import {deletePost, upDatePost, upLoadPost} from '../action/post.action';
import {ToastAndroid} from 'react-native';
import { localStorage } from '@/utils';

export interface NewFeedState {
  posts: Post[];
  currentPage: number;
  status: 'idle' | 'loading' | 'failed';
  isLastPage: boolean;
  isFollowing: boolean;
}
const initialState: NewFeedState = {
  posts: [],
  currentPage: 1,
  status: 'idle',
  isLastPage: false,
  isFollowing: localStorage.getBoolean('isFollowing') || false,
};
const newfeedSate = createSlice({
  name: 'newFeedSate',
  initialState,
  reducers: {
    upDateComment: (state, action: PayloadAction<any>) => {
      const {postId, comment} = action.payload;
      const postIndex = state.posts.findIndex(post => post._id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].comments = comment;
      }
    },
    setFollowing: (state, action: PayloadAction<boolean>) => {
      console.log('isFollowing*************************', action.payload); 
      state.isFollowing = action.payload;
      localStorage.set('isFollowing', action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(NewfeedAction.fetchNewFeed.fulfilled, (state, action) => {
        state.status = 'idle';
        const page = action.meta.arg;
        state.currentPage = page;
        if (!action.payload.nextPage) {
          state.isLastPage = true;
        }
        if (action.payload.posts.length === 0) {
          return;
        }
        if (page == 1) {
          state.posts = action.payload.posts;
        } else {
          state.posts = state.posts.concat(action.payload.posts);
        }
      })
      .addCase(NewfeedAction.fetchNewFeed.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(NewfeedAction.fetchNewFeed.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(NewfeedAction.likePost.fulfilled, (state, action) => {
        const reaction = action.payload;
        console.log('reaction*****', reaction);
        const postId = action.meta.arg;
        const postIndex = state.posts.findIndex(post => post._id === postId);
        state.posts[postIndex].isLiked = !state.posts[postIndex].isLiked;
        state.posts[postIndex].reactions = reaction;
      })
      .addCase(upLoadPost.fulfilled, (state, action) => {
        const post = action.payload;
        state.posts.unshift(post);
        ToastAndroid.show('Đã đăng pic của bạn', ToastAndroid.LONG);
      })
      .addCase(upDatePost.fulfilled, (state, action) => {
        const post = action.payload;
        const postIndex = state.posts.findIndex(p => p._id === post._id);
        state.posts[postIndex].body = post.body;
        ToastAndroid.show('Đã cập nhật pic của bạn', ToastAndroid.LONG);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload._id;
        state.posts = state.posts.filter(post => post._id !== postId);
      });
  },
});
export const newFeedReducer = newfeedSate.reducer;
export const {upDateComment,setFollowing} = newfeedSate.actions;
