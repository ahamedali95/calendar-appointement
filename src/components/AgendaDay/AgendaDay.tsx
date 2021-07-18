import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import type { Theme } from '@material-ui/core/styles';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

import * as dateFns from 'date-fns';

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
	onClose: () => void;
}

const AgendaDay = (props: Props) => {
	const { classes, agendaStatus, onClose } = props;
	const dateTitle = agendaStatus.date ? dateFns.format( new Date(agendaStatus.date), 'LLLL do, yyyy' ) : 'Closing';

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
				<Typography>
					Use this space to list the reminders.
				</Typography>
			</DialogContent>
		</Dialog>
	);
}

export default withStyles( styles )( AgendaDay );
