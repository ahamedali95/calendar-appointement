import { createSlice } from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

const initialAgendaState = {
    isOpen: false,
    date: null
};

interface DateObj {
    date: Date
}

const agendaStatus = createSlice( {
    name: 'agendaStatus',
    initialState: initialAgendaState,
    reducers: {
        openAgenda(state, action: PayloadAction<DateObj>) {
            state.isOpen = true;
            state.date = action.payload.date
        },
        closeAgenda(state) {
            state.isOpen = false;
            state.date = null;
        }
    }
});

export const { openAgenda, closeAgenda } = agendaStatus.actions;
export default agendaStatus.reducer;