import AxiosInstance from "@/network/axiosInstance";
import { Post, PostResponse } from "@/type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const upLoadPost = createAsyncThunk(
    'post/uploadPost',
    async (data:any, thunkApi) => {
      try {
        const response = await AxiosInstance().post('post/upload_post', data);
        return response.data as Post; // Trả về dữ liệu để lưu vào store (nếu cần)
      } catch (error) {
        console.log('error', error);  
        return thunkApi.rejectWithValue(error);
      }
    },
  );

  export const upDatePost = createAsyncThunk(
    'post/updatePost',
    async (data:any, thunkApi) => {
      try {
        const response = await AxiosInstance().patch(`post/update_post/${data.id}`, data.data);
        return response.data as Post; // Trả về dữ liệu để lưu vào store (nếu cần)
      } catch (error) {
        console.log('error', error);  
        return thunkApi.rejectWithValue(error);
      }
    },
  );

  export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (id:string, thunkApi) => {
      try {
        const response =  await AxiosInstance().delete(
          `post/delete_post/${id}`,
        );
        console.log('response', response);
        return response.data as Post; // Trả về dữ liệu để lưu vào store (nếu cần)
      } catch (error) {
        console.log('error', error);  
        return thunkApi.rejectWithValue(error);
      }
    },
  );