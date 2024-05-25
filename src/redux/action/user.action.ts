import {createAsyncThunk} from '@reduxjs/toolkit';
import {ActionKey} from './action_key';
import AxiosInstance from '@/network/axiosInstance';
export const login = createAsyncThunk(
  ActionKey.user.login,
  async (idToken: string) => {
    const user = await AxiosInstance().post('/auth/google', {idToken});
    return user;
  },
);
