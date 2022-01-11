import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertProps } from '../../components/Alert/Alert';

interface State {
  alert?: AlertProps,
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {} as State,
  reducers: {
    displayAlert: (state, action: PayloadAction<AlertProps>) => {
      state.alert = action.payload;
    },
    hideAlert: (state) => {
      state.alert = undefined;
    },
  },
});

const { displayAlert, hideAlert } = layoutSlice.actions;

export { displayAlert, hideAlert };
export default layoutSlice.reducer;
