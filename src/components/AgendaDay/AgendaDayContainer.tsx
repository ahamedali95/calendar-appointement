import { connect } from 'react-redux';

import AgendaDay from './AgendaDay';
import { closeAgenda } from '../../redux/agendaStatus';
import type {Day} from "../../redux/dayInfo";
import { removeDayInfo } from '../../redux/dayInfo';

interface Props {}

interface State {
	agendaStatus: {
		isOpen: boolean,
		date: string
	},
	days: Day[]
}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	const { agendaStatus } = state;
	const day = state.days.find((day: Day) => day.date === agendaStatus.date);

	return {
		agendaStatus,
		reminders: day ? day.reminders : []
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAgenda() );
		},
		onRemoveDayInfo: (val: { day: string, reminderId: string }) => {
			dispatch(removeDayInfo(val))
		}
	}
};

const AgendaDayContainer = connect( mapStateToProps, mapDispatchToProps )( AgendaDay );

export default AgendaDayContainer;
