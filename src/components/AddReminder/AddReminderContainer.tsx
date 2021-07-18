import { connect } from 'react-redux';

import AddReminder from './AddReminder';
import { closeAddReminder } from '../../redux/reminderStatus';
import { addDayInfo } from '../../redux/dayInfo';

interface State {
	reminderStatus: {
		isOpen: boolean
	}
}

const mapStateToProps = (state: State) => {
	return {
		isOpen: state.reminderStatus.isOpen
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAddReminder() );
		},
		onAddDayInfo: (obj) => {
			dispatch(addDayInfo(obj));
		}
	}
};

const AddReminderContainer = connect( mapStateToProps, mapDispatchToProps )( AddReminder );

export default AddReminderContainer;
