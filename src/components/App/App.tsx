import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import * as dateFns from 'date-fns';

import CalendarGrid from '../CalendarGrid';
import AgendaDayContainer from '../AgendaDay/AgendaDayContainer';
import AddReminderContainer from '../AddReminder/AddReminderContainer';
import './App.css';

const styles = (theme: Theme) => createStyles({
    appName: {
        textShadow: "1px 1px 1px #fff, 2px 2px 1px #fff",
        fontSize: "1.6rem",
        marginLeft: theme.spacing(1)
    },
    logo: {
        fontSize: "1.8em"
    },
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	calendar: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '10px',
		margin: '25px',
		width: '100%',
		height: '90%',
        marginTop: theme.spacing(11)
	},
	calendarHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '100px',
		width: '100%'
	},
	fabAdd: {
		position: 'absolute',
		bottom: '60px',
		right: '50px',
		color: '#FFF',
		backgroundColor: green[600],
		'&:hover': {
			backgroundColor: green[800]
		}
	}
});

interface Props extends WithStyles<typeof styles>{
	onFabAddClick: () => void
}

interface State {
	date: Date
}

class App extends Component<Props, State> {
	constructor( props: Props ) {
		super( props );

		this.state = {
			date: new Date()
		};
	}

	compnentDidMount() {

	}

	// arrow functions to skip binding in constructor
	// wow I love this date library
	prevMonth = () => {
		this.setState( { date: dateFns.subMonths( this.state.date, 1 ) } );
	};

	nextMonth = () => {
		this.setState( { date: dateFns.addMonths( this.state.date, 1 ) } );
	};

    currentMonth = () => {
        this.setState( { date: new Date() } );
    };

	render() {
		const { classes, onFabAddClick } = this.props;
		const { date } = this.state;

		const month = date.toLocaleString( 'en-us', { month: 'long' } );
		const year = dateFns.getYear( date );

		return (
			<div className={ classes.root }>
				<Paper className={ classes.calendar }>
					<AppBar>
						<Toolbar>
							{/* Ideally, official application logo belongs here*/}
							<CalendarTodayIcon />
							<Typography
								className={classes.appName}
								variant="h6"
							>
								Book Remainder
							</Typography>
						</Toolbar>
					</AppBar>
					<header className={ classes.calendarHeader }>
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={this.currentMonth}
                        >
                            Today
                        </Button>
						<IconButton aria-label='Last Month' onClick={ this.prevMonth }>
							<KeyboardArrowLeftIcon fontSize='large' />
						</IconButton>
						<Typography variant='h3'>
							{ month } { year }
						</Typography>
						<IconButton aria-label='Next Month' onClick={ this.nextMonth }>
							<KeyboardArrowRightIcon fontSize='large' />
						</IconButton>
					</header>
					<CalendarGrid
						date={ date }
					/>
					<Fab
						aria-label='Add'
						className={classes.fabAdd}
						onClick={ onFabAddClick }
					>
						<AddIcon />
					</Fab>
				</Paper>
				<AgendaDayContainer />
				<AddReminderContainer />
			</div>
		);
	}
}

export default withStyles( styles )( App );
