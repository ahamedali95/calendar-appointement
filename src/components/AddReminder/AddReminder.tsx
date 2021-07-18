import React, {useCallback, useReducer} from 'react';

// I believe material-ui supports tree shaking as it uses ES6 to construct its modules
// so we can able to write more simplified import statements. To confirm,
// we can use the webpack-bundle-analyzer plugin to inspect the bundle size.
// I once get to explore tree-shaking, please check it out: https://ahamedblogs.wordpress.com/2020/02/11/reducing-js-bundle-sizes-using-tree-shaking/
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';

import { format } from 'date-fns';

import RemainderDetails from './ReminderDetails';
import { remainderDetailsReducer } from '../../reducers';
import { initialState as remainderDetailsState, InitialState } from '../../reducers/remainderDetailsReducer';
import type {Day} from '../../redux/dayInfo';


const styles = () => createStyles({
	addReminderFormContainer: {
		minHeight: '260px',
		marginTop: '10px',
		display: 'flex',
		flexDirection: 'column'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	}
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean;
	onClose: () => void;
	onAddDayInfo: (obj: Day) => unknown;
}

const AddReminder = (props: Props) => {
		const { classes, isOpen, onClose, onAddDayInfo } = props;
		const [ state, dispatch ] = useReducer(remainderDetailsReducer, remainderDetailsState, undefined);

		const handleClose = (): void => {
			handleResetClick(); //Clear fields on close of the dialog. Currently, MUI dialog does not clear internal state on close.
			onClose();
		};

		const handleSaveClick = (): void => {
			const day: Day = {
				date: format(state.datetime, 'MM-dd-yyyy'),
				reminders: [{
					title: state.title,
					color: state.color.value,
					note: state.note,
					time: format(state.datetime, 'hh:mm a')
				}]
			};

			onAddDayInfo(day);
		};

		const handleChange = useCallback((property: keyof InitialState, value: any): void => {
			dispatch({ type: 'UPDATE_PROPERTY', property, value });
		}, [ dispatch ]);

		const handleResetClick = useCallback((): void => {
			dispatch({ type: 'RESET' });
		}, [ dispatch ]);

		console.log(state)

		return (
			<Dialog
				open={isOpen}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
				fullWidth={ true }
				maxWidth='md'
			>
				<DialogTitle id='form-dialog-title'>
					Add Reminder
					<IconButton aria-label='Close' className={ classes.closeButton } onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<Divider light />
				<DialogContent className={ classes.addReminderFormContainer }>
					<RemainderDetails
						data={state}
						onChange={handleChange}
						onCancelClick={handleClose}
						onSaveClick={handleSaveClick}
						onResetClick={handleResetClick}
					/>
				</DialogContent>
			</Dialog>
		);
}

export default withStyles(styles)( AddReminder );
