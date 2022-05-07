import { createTheme } from "@mui/material";
import 'styles/palette.css';

const DarkTheme = createTheme({
    palette: {
        primary: {
            main: "#e2351e",
        },
        secondary: {
            main: "#b1bec9",
        },
        background: {
            default: "#11181f",
        },
        text: {
            primary: "#b1bec9",
            secondary: "#5090D3"
        }
    },
    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    backgroundColor: "#141c24",
                    "&.Mui-selected": {
                        backgroundColor: "#11151a",
                        "&:hover": {
                            background: "#11181f",
                        }
                    },
                    "&:hover": {
                        background: "#12181f",
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: "#11181f",
                }
            }
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    background: "#1d2936"
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: "white"
                }
            }
        }
    } as any
});

export default DarkTheme;