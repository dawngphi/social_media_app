import {Post, PostResponse} from '@/type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NewfeedAction} from '../action/newfeed.action';
import {useLogger} from '@/utils';
import {deletePost, upDatePost, upLoadPost} from '../action/post.action';

export interface MyPostState {
  posts: Post[];
  myPosts: Post[];
  myRepost: Post[];
  currentPage: number;
  status: 'idle' | 'loading' | 'failed';
  isLastPage: boolean;
}
const initialState: MyPostState = {
  posts: [],
  myPosts: [],
  myRepost: [],
  currentPage: 1,
  status: 'idle',
  isLastPage: false,
};
const myPostSlice = createSlice({
  name: 'newFeedSate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(NewfeedAction.fetchMyPost.fulfilled, (state, action) => {
        const post = action.payload.posts;
        state.myPosts = post.filter((item: Post) => !item.isRepost);
        state.myRepost = post.filter((item: Post) => item.isRepost);
        state.status = 'idle';
        if (!action.payload.nextPage) {
          state.isLastPage = true;
        }
        if (action.payload.posts.length === 0) {
          return;
        }
      })
      .addCase(NewfeedAction.fetchMyPost.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(NewfeedAction.fetchMyPost.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(NewfeedAction.likePost.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        if (state.myPosts.length > 0) {
          const postIndex = state.myPosts.findIndex(
            post => post._id === postId,
          );
          if (postIndex != -1) {
            state.myPosts[postIndex].isLiked =
              !state.myPosts[postIndex].isLiked;
            state.myPosts[postIndex].reactions = action.payload;
          }
        }
        if (state.myRepost.length > 0) {
          const postIndex = state.myRepost.findIndex(
            post => post._id === postId,
          );
          if (postIndex != -1) {
            state.myRepost[postIndex].isLiked =
              !state.myRepost[postIndex].isLiked;
            state.myRepost[postIndex].reactions = action.payload;
          }
        }
      })
      .addCase(upLoadPost.fulfilled, (state, action) => {
        const post = action.payload;
        state.myPosts.unshift(post);
      })
      .addCase(upDatePost.fulfilled, (state, action) => {
        const post = action.payload;
        const postIndex = state.myPosts.findIndex(p => p._id === post._id);
        state.myPosts[postIndex].body = post.body;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload._id;
        state.myPosts = state.myPosts.filter(post => post._id !== postId);
      });
  },
});
export const myPostReducer = myPostSlice.reducer;
