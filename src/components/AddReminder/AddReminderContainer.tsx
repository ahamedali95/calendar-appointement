import { connect } from 'react-redux';
import AddReminder from './AddReminder';
import { closeAddReminder } from '../../redux/reminderStatus';

interface State {
	reminderStatus: {
		isOpen: boolean
	}
}

const mapStateToProps = (state: State) => {
	console.log(state)
	return { 
		isOpen: state.reminderStatus.isOpen
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAddReminder() );
		}
	}
};

const AddReminderContainer = connect( mapStateToProps, mapDispatchToProps )( AddReminder );

export default AddReminderContainer;
