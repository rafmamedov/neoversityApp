import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Типи для початкового стану
interface UserState {
  userInfo: { uid: string; email: string | null; displayName: string | null } | null;
}

const initialState: UserState = {
  userInfo: null,
};

// Створення slice для користувача
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState['userInfo']>) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
  },
});

// Експорт дій для використання у компонентах
export const { setUserInfo, clearUserInfo } = userSlice.actions;

// Експорт ред'юсера для підключення до Store
export default userSlice.reducer;
