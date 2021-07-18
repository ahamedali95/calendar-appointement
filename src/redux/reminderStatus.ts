import {createSlice} from '@reduxjs/toolkit';

const initialAddReminderState = {
    isOpen: false
};

const reminderStatus = createSlice({
    name: 'reminderStatus',
    initialState: initialAddReminderState,
    reducers: {
        openAddReminder(state) {
            state.isOpen = true;
        },
        closeAddReminder(state) {
            state.isOpen = false
        }
    }
});

export const { openAddReminder, closeAddReminder } = reminderStatus.actions;
export default reminderStatus.reducer;