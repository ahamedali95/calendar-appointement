import {Color} from '../components/AddReminder/CircleColorPicker';

export type InitialState = {
  title: string;
  color: Color;
  datetime: Date;
  note: string;
};

export const initialState: InitialState = {
    title: '',
    color: { value: '#6d1cac', label: 'Calender' },
    datetime: new Date(),
    note: ''
};

type ActionWithPayload = {
    type: string;
    property: string;
    value: any;
};

type ActionWithoutPayload = {
    type: string;
};

type Action = ActionWithPayload | ActionWithoutPayload;

// From my experience, one improvement I suggest we make is build a genericReducer
// that may be used throughout our application wherever we have forms. This would allow us
// to easily manage updates to JSON blobs which may be persisted later. Moreover,
// this generic reducer may also take in property validators that validates property values.
// i.e., is this field valid? did the user enter a valid year? etc... Then
// we show an error accordingly at field level.
const remainderDetailsReducer = (state: InitialState, action: Action) => {
    switch (action.type) {
        case('UPDATE_PROPERTY'): {
            const $action = action as ActionWithPayload;

            return {
                ...state,
                [$action.property]: $action.value
            };
        }
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

export default remainderDetailsReducer;
