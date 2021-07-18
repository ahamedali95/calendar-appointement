import React, {ChangeEvent, FunctionComponent, useMemo} from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {createStyles, WithStyles} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import SubjectIcon from '@material-ui/icons/Subject';

import {InitialState} from '../../reducers/remainderDetailsReducer';
import CircleColorPicker from './CircleColorPicker';
import type {Color} from './CircleColorPicker';


const remainderDetailsStyles = () => createStyles({
    titleContent: {
        fontSize: '20px'
    },
    titleLabel: {
        fontSize: '20px'
    },
    note: {
        resize: 'both',
        minHeight: '20px'
    },
    floatRight: {
        float: 'right'
    }
});

interface ReminderDetailsProps extends WithStyles<typeof remainderDetailsStyles> {
    onCancelClick: () => unknown;
    onSaveClick: () => unknown;
    onChange: (property: keyof InitialState, value: any) => unknown;
    data: InitialState;
    onResetClick: () => unknown;
}

const ReminderDetails: FunctionComponent<ReminderDetailsProps> = ({ classes, onCancelClick, onSaveClick, onChange, data, onResetClick }) => {
    const isTitleValid = useMemo((): boolean => (data.title.length <= 30), [ data.title ]);

    return (
        <Grid
            direction='column'
            container
            spacing={3}
        >
            <Grid
                item
                container
            >
                <Grid
                    item
                    xs={1}
                />
                <Grid
                    item
                    xs={9}
                >
                    <TextField
                        fullWidth
                        error={!isTitleValid}
                        helperText={isTitleValid ? '' : 'Maximum of 30 characters allowed'}
                        label='Add title'
                        InputLabelProps={{
                            classes: {
                                root: classes.titleContent
                            }
                        }}
                        InputProps={{
                            classes: {
                                input: classes.titleContent
                            }
                        }}
                        value={data.title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('title', e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Box
                        mt={3}
                        ml={2}
                    >
                        <CircleColorPicker
                            value={data.color}
                            onValueChange={(value: Color) => onChange('color', value)}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid
                item
                container
                spacing={3}
            >
                <Grid item xs={1}>
                    <Box mt={1} />
                    <InsertInvitationIcon />
                </Grid>
                <Grid item>
                    <KeyboardDateTimePicker
                        variant='inline'
                        value={data.datetime}
                        onChange={(value: Date) => onChange('datetime', value)}
                        format='MMM dd, yyyy hh:mm a..aaa'
                    />
                </Grid>
            </Grid>
            <Grid
                item
                container
            >
                <Grid
                    item
                    xs={1}
                >
                    <Box mt={1} />
                    <SubjectIcon />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        fullWidth
                        placeholder='Note...'
                        multiline
                        inputProps={{ className: classes.note }}
                        value={data.note}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('note', e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid
                item
                container
                justifyContent='flex-end'
                spacing={2}
            >
                <Grid item>
                    <Button
                        color='secondary'
                        size='large'
                        variant='outlined'
                        onClick={onResetClick}
                    >
                        Reset
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        color='secondary'
                        size='large'
                        variant='outlined'
                        onClick={onCancelClick}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        color='primary'
                        disabled={!isTitleValid}
                        size='large'
                        variant='contained'
                        onClick={onSaveClick}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default withStyles(remainderDetailsStyles)(ReminderDetails);