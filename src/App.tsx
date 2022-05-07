import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/lab";
import { CssBaseline } from "@mui/material";
import React from "react";
import Navbar from "./components/Navbar";
import DarkTheme from './themes/DarkTheme'
import AdapterMoment from '@mui/lab/AdapterMoment';
import NotificationContainer from "components/Notification";
import AuthenticationContainer from "components/Authentication";
import RoutesContainer from "components/Routes";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={DarkTheme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <NotificationContainer>
                    <AuthenticationContainer>
                        <RoutesContainer>
                            <Navbar />
                        </RoutesContainer>
                    </AuthenticationContainer>
                </NotificationContainer>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
