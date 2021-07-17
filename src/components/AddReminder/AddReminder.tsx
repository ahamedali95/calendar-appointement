import React, {ChangeEvent, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";


const styles = (theme: Theme) => createStyles({
	addReminderFormContainer: {
		minHeight: '250px',
		marginTop: '10px',
		display: 'flex',
		flexDirection: 'column'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	titleContent: {
		fontSize: '28px'
	},
	titleLabel: {
		fontSize: '28px'
	}
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void
}

const AddReminder = (props: Props) => {
        const [ title, setTitle ] = useState<string>('');
        const [ color, setColor ] = useState<string>('');
		const { classes, isOpen, onClose } = props;

		return (
			<Dialog
				open={ isOpen }
				onClose={onClose}
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
					<Grid
						direction='row'
						container
					>
						<Grid item container>
							<Grid item xs={10}>
								<TextField
									fullWidth
									label='Add title'
									InputLabelProps={{
										classes: {
											root: classes.titleLabel
										}
									}}
									InputProps={{
										classes: {
											input: classes.titleContent
										}
									}}
                                    value={title}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
								/>
							</Grid>
							<Grid item>
								<Box mt={1} ml={2}>
									<Button
										color='primary'
										size='large'
										variant='contained'
									>
										Save
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		);
}

export default withStyles(styles)( AddReminder );
