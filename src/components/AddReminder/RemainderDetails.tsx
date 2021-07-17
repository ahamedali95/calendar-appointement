import React, {ChangeEvent, FunctionComponent, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {createStyles, Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CircleColorPicker, {Color} from "./CircleColorPicker";
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import Divider from "@material-ui/core/Divider";
import { DatePicker } from "@material-ui/pickers";
import ScheduleIcon from '@material-ui/icons/Schedule';


const remainderDetailsStyles = (theme: Theme) => createStyles({
    titleContent: {
        fontSize: '28px'
    },
    titleLabel: {
        fontSize: '28px'
    },
    note: {
        resize: "both",
        minHeight: "20px"
    }
});

interface RemainderDetailsProps extends WithStyles<typeof remainderDetailsStyles> {

}

const RemainderDetails: FunctionComponent<RemainderDetailsProps> = ({ classes }) => {
    const [ title, setTitle ] = useState<string>('');
    const [ date, setDate ] = useState<Date>(new Date());
    const [ color, setColor ] = useState<Color>({ value: '#6d1cac', label: 'Calender' }); //hex value

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
                <Grid item xs={1} />
                <Grid item xs={9}>
                    <TextField
                        fullWidth
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
            <Grid
                item
                container
            >
                <Grid item xs={1}>
                    <Box mt={1} />
                    <ScheduleIcon />
                </Grid>
                <Grid item>
                    <DatePicker
                        autoOk
                        format="MMM dd, yyyy"
                        variant="inline"
                        value={date}
                        onChange={(value: Date) => setDate(value)}
                    />
                </Grid>
            </Grid>
            <Grid
                item
                container
            >
              <Grid item xs={1}>
                  <Box mt={1} />
                  <InsertInvitationIcon />
              </Grid>
                <Grid item>
                    <CircleColorPicker
                        value={color}
                        onValueChange={(value: Color) => setColor(value)}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
};

export default withStyles(remainderDetailsStyles)(RemainderDetails);