import React, {FunctionComponent, useMemo} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {WithStyles, withStyles, createStyles} from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {format} from 'date-fns';

import {Reminder} from '../../redux/dayInfo';
import ReminderUtil from "../../utils/ReminderUtil";


const remindersStyles = () => createStyles({
    accordion: {
        borderBottom: '4px solid'
    },
    accordionDetails: {
        flexDirection: 'column'
    },
    accordionExpanded: {
        border: '1px solid'
    },
    reminderTime: {
        color: 'gray'
    }
});

interface RemindersProps extends WithStyles<typeof remindersStyles>{
    onReminderDelete: (value: Reminder) => unknown;
    data: Reminder[];
}

//Improvement: auto scroll to current time would be nice
const Reminders: FunctionComponent<RemindersProps> = ({ data, classes, onReminderDelete }) => {
    const formattedData = useMemo((): Record<string, Reminder[]> => {
        return ReminderUtil.sortReminders(data);
    }, [ data ]);

    const getList = (): JSX.Element[] => {
        const result = [];

        for (const key in formattedData) {
            result.push(
                <div key={key}>
                    <Box mt={3} />
                    <Typography variant='body2'>{format(new Date(1970, 0, 1, Number(key)), 'h:mm a')}</Typography>
                    <Box mt={2} />
                    {
                        formattedData[key].map((reminder: Reminder): JSX.Element => {
                            const date = new Date(1970, 0, 1, Number(reminder.time.split(':')[0]), Number(reminder.time.split(':')[1]));

                            return (
                                <Box
                                    key={reminder.id}
                                    ml={3}
                                    mb={1}
                                >
                                    <Accordion
                                        classes={{
                                            root: classes.accordion,
                                            expanded: classes.accordionExpanded
                                        }}
                                        style={{ borderColor: `${reminder.color}` }}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                            <Typography
                                                className={classes.reminderTime}
                                                component='span'
                                            >
                                                {format(date, 'hh:mm a')}
                                            </Typography>
                                            <Typography component='span'>&nbsp;-&nbsp;{reminder.title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={classes.accordionDetails}>
                                            <Typography>{reminder.note}</Typography>
                                        </AccordionDetails>
                                        <Divider />
                                        <AccordionActions>
                                            {/* Improvement: confirm before delete */}
                                            <Button
                                                color='primary'
                                                size='medium'
                                                variant='contained'
                                                onClick={() => onReminderDelete(reminder)}
                                            >
                                                Delete
                                            </Button>
                                        </AccordionActions>
                                    </Accordion>
                                </Box>
                            )
                        })
                    }
                    <Box mt={2} />
                    <Divider />
                </div>
            );
        }

        return result;
    };


    console.log(formattedData)

    return (
        <>
            {getList()}
        </>
    );
};

export default withStyles(remindersStyles)(Reminders);