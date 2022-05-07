import { Typography } from '@mui/material'
import React from 'react'
import "styles/administration.css";
import { faBuilding, faCalendarAlt, faClipboardList, faUserCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import AdministrationTab from './AdministrationTab';

export enum AdministrationColors {
    Red = "#e2351e",
    RedBg = "#e2351e4b",
    Orange = "#cf8338",
    OrangeBg = "#cf83384b",
    Green = "#6fb037",
    GreenBg = "#6fb0374b",
    Yellow = "#eaed39",
    YellowBg = "#eaed394b",
    Blue = "#387ecf",
    BlueBg = "#387ecf4b",
    Pink = "#cf38a6",
    PinkBg = "#cf38a64b",
}

const Administration: React.FC = () => {
    return (
        <div className="admin-container">
            <Typography gutterBottom variant="h5" component="div" color="text.primary">
                Administration
            </Typography>
            <div className="grid">
                <AdministrationTab 
                    link='employees'
                    background={AdministrationColors.Orange} 
                    iconColor={AdministrationColors.OrangeBg}
                    icon={faUsers}
                    text="Administration des employés"/>
                <AdministrationTab 
                    link='workReports'
                    background={AdministrationColors.Blue} 
                    iconColor={AdministrationColors.BlueBg}
                    icon={faCalendarAlt}
                    text="Rapports des travaux"/>
                <AdministrationTab 
                    link='account'
                    background={AdministrationColors.Red} 
                    iconColor={AdministrationColors.RedBg}
                    icon={faUserCog}
                    text="Compte administrateur"/>
                <AdministrationTab 
                    link='works'
                    background={AdministrationColors.Pink} 
                    iconColor={AdministrationColors.PinkBg}
                    icon={faClipboardList}
                    text="Administration des travaux"/>
                <AdministrationTab 
                    link='branches'
                    background={AdministrationColors.Green} 
                    iconColor={AdministrationColors.GreenBg}
                    icon={faBuilding}
                    text="Administration des succursales"/>
            </div>
        </div>
    )
}

export default Administration
