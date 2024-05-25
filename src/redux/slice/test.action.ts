import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId: number, thunkAPI) => {
        return 'test'
    }
)


