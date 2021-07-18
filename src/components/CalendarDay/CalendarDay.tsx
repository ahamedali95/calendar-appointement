import React, {useMemo, useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import deepPurple from '@material-ui/core/colors/deepPurple';
import type { Theme } from '@material-ui/core/styles';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

import {isSameMonth, isSameDay, getDate, format} from 'date-fns';

import {Reminder} from "../../redux/dayInfo";
import ReminderUtil from "../../utils/ReminderUtil";
import {Typography} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
	dayCell: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		cursor: 'pointer'
	},
	dayCellOutsideMonth: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		backgroundColor: '#fcf2ff',
		cursor: 'pointer'
	},
	dateNumber: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: 'transparent'
	},
	todayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[400],
	},
	focusedAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: '#f1f1f1',
	},
	focusedTodayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[800],
	},
	remindersContainer: {
		height: '100%',
	},
	listItem: {
		borderRadius: '2px 1px',
		color: '#fff',
		border: '1px dotted #000'
	}
});

interface DateObj {
	date: Date
}

interface Props extends WithStyles<typeof styles>{
	calendarDate: Date;
	dateObj: DateObj;
	onDayClick: (dateObj: string) => unknown;
	reminders: Reminder[];
}

const CalendarDay = (props: Props) => {
	const { classes, dateObj, calendarDate, onDayClick, reminders } = props;
	const [ focused, setFocused ] = useState(false);

	const isToday = isSameDay( dateObj.date, new Date() );
	const avatarClass = isToday && focused ? classes.focusedTodayAvatar :
		isToday ? classes.todayAvatar :
		focused ? classes.focusedAvatar :
		classes.dateNumber;

	const onMouseOver = () => setFocused(true);
	const onMouseOut = () => setFocused(false);

	const formattedData = useMemo((): Record<string, Reminder[]> => {
		return ReminderUtil.sortReminders(reminders);
	}, [ reminders ]);

	const getList = (): JSX.Element => {
		const items = [];

		for (const key in formattedData) {
			formattedData[key].forEach((reminder: Reminder) => {
				const date = new Date(1970, 0, 1, Number(reminder.time.split(':')[0]), Number(reminder.time.split(':')[1]));
				const title = reminder.title.length > 10 ? reminder.title.slice(0, 10) + '...' : reminder.title;

				items.push(
					<ListItem
						className={classes.listItem}
						style={{ backgroundColor: `${reminder.color}` }}
					>
						<Typography variant='caption' component='span'>{format(date, 'hh:mm a')}</Typography>
						<Typography variant='caption' component='span'>&nbsp;-&nbsp;{title}</Typography>
					</ListItem>
				);
			});
		}

		return <List style={{height: `${100 - (100 * 50/100)}px`, overflow: 'auto'}}>{items}</List>
	};

	return (
		<div
			onMouseOver={ onMouseOver }
			onMouseOut={ onMouseOut }
			onClick={ () => onDayClick( format(dateObj.date, 'MM-dd-yyyy') ) }
			className={
				isSameMonth( dateObj.date, calendarDate )
					? classes.dayCell
					: classes.dayCellOutsideMonth
			}
		>
			<Avatar className={ avatarClass }>{ getDate( dateObj.date ) }</Avatar>
			<div className={ classes.remindersContainer }>
				{reminders.length ? getList() : []}
			</div>
		</div>
	)
};

export default withStyles( styles )( CalendarDay );
