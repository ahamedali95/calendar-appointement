import { createSlice } from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

export type Reminder = {
    title: string;
    color: string;
    time: string;
    note: string;
    id: string;
};

// Please note I am storing date in string format only to comply with Redux rule that non-serializable object
// should be not stored in store. Please refer: https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
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
       // In the future we may extend this include events, etc...
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
       },
        removeDayInfo(state, action: PayloadAction<{ day: string, reminderId: string}>) {
            const day: Day | undefined = state.find((day: Day): boolean => {
                return day.date === action.payload.day;
            });

            day && (day.reminders = day.reminders.filter((remainder: Reminder) => remainder.id !== action.payload.reminderId));
        }
    }
});

export const { addDayInfo, removeDayInfo } = dayInfo.actions;
export default dayInfo.reducer;