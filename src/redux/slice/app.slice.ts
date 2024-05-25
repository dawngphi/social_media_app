import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SliceName} from '@/redux/constant';
import {fetchUserById} from '@/redux/action';
import {useLogger} from '@/utils';
import {NewfeedAction} from '../action/newfeed.action';

interface AppState {
  isLoading: boolean;
}

const logger = useLogger('Test');
const initialState: AppState = {
  isLoading: false,
};
const appSlice = createSlice({
  name: SliceName.APP,
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(NewfeedAction.fetchNewFeed.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(NewfeedAction.fetchNewFeed.rejected, (state, action) => {
        state.isLoading = false;
      }).addCase(NewfeedAction.fetchNewFeed.pending, (state, action) => {
        state.isLoading = true;
      });;
  },
});
export const {setLoading} = appSlice.actions;
export const appReducer = appSlice.reducer;
