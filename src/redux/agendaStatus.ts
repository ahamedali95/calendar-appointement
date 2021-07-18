import { createSlice } from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

//Allow me to introduce redux-toolkit which is an opinionated redux library that includes all the procedure
//for fast and efficient Redux development. Please checkout my blog on this topic: https://ahamedblogs.wordpress.com/2020/09/24/writing-redux-logic-efficiently-with-redux-toolkit/
const initialAgendaState = {
    isOpen: false,
    date: null
};

const agendaStatus = createSlice( {
    name: 'agendaStatus',
    initialState: initialAgendaState,
    reducers: {
        openAgenda(state, action: PayloadAction<string>) {
            state.isOpen = true;
            state.date = action.payload
        },
        closeAgenda(state) {
            state.isOpen = false;
            state.date = null;
        }
    }
});

export const { openAgenda, closeAgenda } = agendaStatus.actions;
export default agendaStatus.reducer;