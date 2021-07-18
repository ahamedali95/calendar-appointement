import React, {useCallback} from 'react';

import * as dateFns from 'date-fns';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import type { Theme } from '@material-ui/core/styles';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

import type {Reminder} from '../../redux/dayInfo';
import Reminders from './Reminders';

const styles = (theme: Theme) => createStyles({
	remindersContainer: {
		minHeight: '250px',
		marginTop: '10px'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	toolbarButtonHidden: {
		visibility: 'hidden'
	},
	toolbarButtonVisible: {
		visibility: 'visible'
	}
});

interface Props extends WithStyles<typeof styles>{
	agendaStatus: {
		isOpen: boolean;
		date: string;
	};
	onClose: () => unknown;
	reminders: Reminder[];
	onRemoveDayInfo: (val: { day: string; reminderId: string }) => unknown
}

const AgendaDay = (props: Props) => {
	const { classes, agendaStatus, onClose, reminders, onRemoveDayInfo } = props;
	const dateTitle = agendaStatus.date ? dateFns.format( new Date(agendaStatus.date), 'LLLL do, yyyy' ) : 'Closing';

	const handleReminderDelete = useCallback((reminder: Reminder): void => {
		onRemoveDayInfo({
			day: agendaStatus.date,
			reminderId: reminder.id
		});
	}, [ onRemoveDayInfo, agendaStatus.date ]);

	return (
		<Dialog
			open={ agendaStatus.isOpen }
			onClose={ onClose }
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='md'
		>
			<DialogTitle id='form-dialog-title'>
				{ dateTitle }
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={ onClose }>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.remindersContainer }>
				<Reminders
					onReminderDelete={handleReminderDelete}
					data={reminders}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default withStyles( styles )(AgendaDay);
