import React, {FunctionComponent, useState} from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";


import {createStyles, Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";


export type Color = {
  value: string,
  label: string
};

const colors: Color[] = [
    { value: '#b21807', label: 'Tomato' },
    { value: '#00a78b', label: 'Peacock' },
    { value: '#f28500', label: 'Tangerine' },
    { value: '#738276', label: 'Sage' },
    { value: '#b57edc', label: 'Floral' },
    { value: '#ffe135', label: 'Banana' },
    { value: '#579229', label: 'Basil' },
    { value: '#6d1cac', label: 'Calender' }
];

const circleColorPickerStyles = (theme: Theme) => createStyles({
    formControl: {
        minWidth: 50,
    },
    tomato: {
        backgroundColor: '#b21807',
    },
    peacock: {
        backgroundColor: '#00a78b'
    },
    tangerine: {
        backgroundColor: '#f28500'
    },
    sage: {
        backgroundColor: '#738276'
    },
    floral: {
        backgroundColor: '#b57edc'
    },
    banana: {
        backgroundColor: '#ffe135'
    },
    basil: {
        backgroundColor: '#579229'
    },
    calender: {
      backgroundColor: theme.palette.primary.main
    },
    badge: {
      color: 'white'
    },
    badgeHighlight: {
        '&:hover': {
            border: '0.5px solid black',
            pointer: 'cursor'
        }
    }
});

interface CircleColorPickerProps extends WithStyles<typeof circleColorPickerStyles> {
    value: Color,
    onValueChange: (value: Color) => unknown
}

const CircleColorPicker: FunctionComponent<CircleColorPickerProps> = ({ classes, value, onValueChange }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const handleColorSelection = (color: Color): void => {
        debugger
        onValueChange(color);
        setIsOpen(false);
        console.log(color)
    };

    return (
        <>

            <FormControl
                className={classes.formControl}
            >
                <Tooltip
                    placement='bottom'
                    title={ isOpen ? '' : 'Select remainder color'}
                >
                    {
                        isOpen ?

                                <Select
                                    open
                                    onClose={() => setIsOpen(false)}
                                >
                                    {
                                        colors.map((color: Color, index: number): JSX.Element => {
                                            return (
                                                <Box
                                                    key={`${color.value}-${index}`}
                                                    mt={2}
                                                    ml={3}
                                                >
                                                    <Tooltip
                                                        placement='top'
                                                        title={color.label}
                                                    >
                                                        <Badge
                                                            onClick={() => handleColorSelection(color)}
                                                            badgeContent={color.value === value.value ? '✓' : ''}
                                                            classes={{
                                                                badge: `${classes[`${color.label[0].toLowerCase()}${color.label.substr(1)}`]} ${classes.badgeHighlight} ${classes.badge}`
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </Box>
                                            );
                                        })
                                    }
                                </Select>
                            :
                            <Button onClick={() => setIsOpen(true)}>
                                <Badge
                                    badgeContent=""
                                    classes={{badge: `${classes[`${value.label[0].toLowerCase()}${value.label.substr(1)}`]}`}}
                                />
                                <Box ml={2} />
                                <ExpandMoreIcon />
                            </Button>
                    }
                </Tooltip>
            </FormControl>

        </>
    );
};

export default withStyles(circleColorPickerStyles)(CircleColorPicker);