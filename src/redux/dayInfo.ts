import { createSlice } from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

type Reminder = {
    title: string;
    color: string;
    time: string;
    note: string;
};

export type Day = {
    date: string;
    reminders: Reminder[];
};

type InitialState = Day[];

const initialState: InitialState = [];

const dayInfo = createSlice({
   name: 'dayInfo',
    initialState,
    reducers: {
        addDayInfo(state, action: PayloadAction<Day>) {
            // Please note redux-toolkit uses ImmerJS. With the backing of Immer, it is now possible to mutate the
            // state directly inside createReducer and it will internally create immutable copies which forms the new state.
           const day: Day | undefined = state.find((day: Day): boolean => {
              return day.date === action.payload.date;
           });

           if (day) {
               day.reminders.push(action.payload.reminders[0]);
           } else {
               state.push({
                   date: action.payload.date,
                   reminders: action.payload.reminders
               })
           }
       }
    }
});

export const { addDayInfo } = dayInfo.actions;
export default dayInfo.reducer;