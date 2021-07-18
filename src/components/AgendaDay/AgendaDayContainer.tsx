import { connect } from 'react-redux';
import AgendaDay from './AgendaDay';
import { closeAgenda } from '../../redux/agendaStatus';

interface Props {}

interface State {
	agendaStatus: {
		isOpen: boolean,
		date: string
	}
}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	const { agendaStatus } = state;

	return { agendaStatus };
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAgenda() );
		}
	}
};

const AgendaDayContainer = connect( mapStateToProps, mapDispatchToProps )( AgendaDay );

export default AgendaDayContainer;
