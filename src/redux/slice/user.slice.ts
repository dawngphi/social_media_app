import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin, loginWithGoogle } from "@/network";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createAsyncThunk } from "@reduxjs/toolkit";



interface IUser {
    _id: string
    userName: string
    fullName: string
    avatar: string
    dob: string
    googleId: string
    links: any[]
    role: number
    following_status: number
    account_type: number
    fcm_token: string
    createdAt: string
    updatedAt: string
    __v: number
    accessToken: string
    refreshToken: string
    isFirstTimeLogin: boolean
}

interface UserState {
    user: IUser;
}
const initialState: UserState = {
    user: {
        _id: "",
        userName: "",
        fullName: "",
        avatar: "",
        dob: "",
        googleId: "",
        links: [],
        role: 0,
        following_status: 0,
        account_type: 0,
        fcm_token: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
        accessToken: "",
        refreshToken: "",
        isFirstTimeLogin: false,
    },
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        }
    },

    
});
export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;