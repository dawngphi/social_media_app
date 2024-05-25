import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SliceName} from '@/redux/constant';
import {useLogger} from '@/utils';
import {Notification} from '@/type';
import {fetchNoti} from '../action/newfeed.action';

interface NotificationState {
  isLoading: boolean;
  notification: Notification[];
}

const logger = useLogger('Test');
const initialState: NotificationState = {
  isLoading: false,
  notification: [],
};
const notiSlice = createSlice({
  name: SliceName.APP,
  initialState,
  reducers: {
    pushNoti(state, action: PayloadAction<Notification>) {
      state.notification.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNoti.fulfilled, (state, action) => {
      state.notification = action.payload as Notification[];
    });
  },
});
export const {pushNoti} = notiSlice.actions;
export const notiReducer = notiSlice.reducer;
