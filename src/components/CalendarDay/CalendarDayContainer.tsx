import { connect } from 'react-redux';

import CalendarDay from './CalendarDay';
import { openAgenda } from '../../redux/agendaStatus';
import {Day} from "../../redux/dayInfo";
import {format} from "date-fns";

interface Props {
	dateObj: {
		date: Date
	};
}

interface State {
	agendaStatus: {
		isOpen: boolean,
		date: string
	};
	days: Day[];
}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	const day = state.days.find((day: Day) => day.date === format(ownProps.dateObj.date, 'MM-dd-yyyy'));

	return {
		...ownProps,
		reminders: day ? day.reminders : []
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onDayClick: (dateObj: string) => {
			dispatch( openAgenda( dateObj ) )
		}
	}
};

const CalendarDayContainer = connect( mapStateToProps, mapDispatchToProps )( CalendarDay );

export default CalendarDayContainer;
