// Added Redux doc inspired color schemes
// We can still add more configurations to our theme.
// Possibilities: dark theme color schemes, responsive typography, provide overrides for our
// components that controls the appearance i.e., button ripple effect can be turned off throughout
// the application. In real-world applications, our configurations will
// dictated by the UX specs from the design team.
import {createTheme, ThemeOptions} from "@material-ui/core/styles";

const theme: ThemeOptions = {
    palette: {
        primary: {
            main: "#6d1cac"
        },
        secondary: {
            main: "#7431ca"
        }
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    },
};

export default createTheme(theme);