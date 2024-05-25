import { RootState } from "../store";   
import { SliceName } from "../constant";

// export const userInfoSelector = (state: RootState) => state.user.userInfo;
export const userInfoSelector = (state: RootState) => state[SliceName.USER].user;