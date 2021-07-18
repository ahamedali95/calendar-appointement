import { connect } from 'react-redux';

import CalendarDay from './CalendarDay';
import { openAgenda } from '../../redux/agendaStatus';

interface Props {

}

interface State {

}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	return { ...ownProps };
};

const mapDispatchToProps = (dispatch: any)=> {
	return {
		onDayClick: (dateObj: string) => {
			dispatch( openAgenda( dateObj ) )
		}
	}
};

const CalendarDayContainer = connect( mapStateToProps, mapDispatchToProps )( CalendarDay );

export default CalendarDayContainer;
