import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Typography } from "@mui/material";
import Shadow from "common/Shadow";
import { Notification } from "data/notification";
import React, { createContext, useState } from "react";

const notificationStyle = {
    container: {
        position: "absolute",
        width: "400px",
        height: "300px",
        zIndex: 99,
        left: "50%",
        transform: "translate(-50%, 0)",
        display: "flex",
        flexDirection: "column",
        padding: "0.5em",
        gap: "0.5em",
        overflow: "hidden",
        pointerEvents: "none",
    },
    notification: {
        color: "white",
        position: "relative",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "50px",
        padding: "0.25em 0.5em",
    },
    notificationSuccess: {
        background: "#69bb26",
    },
    notificationError: {
        background: "rgb(235, 63, 63)",
    },
    closeBtn: {
        position: "absolute",
        color: "white",
        top: "0rem",
        right: "0rem",
        pointerEvents: "all",
    },
} as any;

export const SuccessTitle = "Succès";
export const ErrorTitle = "Erreur";

export type NotificationHandler = (notif: Notification) => void;
export const NotificationContext = createContext<NotificationHandler>(() => {});

let id = 0;

function useNotification(): [notifications: Notification[], addNotif: (n: Notification) => void, removeNotif: (n: Notification) => void] {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Notification) => {
        if (notification === undefined) return;

        notification.id = id++;
        setNotifications((notifications: Notification[]) => {
            if (notification.title === undefined) {
                notification.title = notification.type === "success" ? SuccessTitle:ErrorTitle;
            }
            return [...notifications, notification];
        });
        setTimeout(() => {
            removeNotification(notification);
        }, notification.timeout || 2500);
    }

    const removeNotification = (notification: Notification) => {
        if (notification === undefined) return;

        setNotifications((notifications: Notification[]) => {
            const notifs: Notification[] = [];

            notifications.forEach((n: Notification) => {
                if (n.id !== notification.id) {
                    notifs.push(n);
                }
            });
            return notifs;
        });
    }

    return [notifications, addNotification, removeNotification];
}

const NotificationContainer: React.FC = (props) => {
    const successStyle = {...notificationStyle.notification, ...notificationStyle.notificationSuccess};
    const errorStyle = {...notificationStyle.notification, ...notificationStyle.notificationError};
    const [notifications, addNotification, removeNotification] = useNotification();

    return (
    <NotificationContext.Provider value={addNotification}>
        <div style={notificationStyle.container}>
            { notifications.map((notification: Notification, i: number) => 
                <Shadow key={i}>
                    <div style={notification.type === "error" ? errorStyle:successStyle}>
                        { notification.title !== undefined && 
                            <Typography gutterBottom variant="h6" component="div">
                                {notification.title}
                            </Typography>
                        }
                        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                            {notification.message}
                        </pre>
                        <IconButton style={notificationStyle.closeBtn} onClick={() => removeNotification(notification)}>
                            <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                        </IconButton>
                    </div>
                </Shadow>
            )}
        </div>
        {props.children}
    </NotificationContext.Provider>
    )
}

export default NotificationContainer