import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId: number, thunkAPI) => {
        fetch('https://jsonplaceholder.typicode.com/todos/'+userId)
            .then(response => response.json())
            .then(json => json)
            .catch(err => console.log(err))
    }
)


// call dữ liêu
// pending : show loading
// fulfilled : lấy data , tắt loading

// promise
// pending : đang thực thi
// fulfilled : thành công
// rejected : đéo thành công
