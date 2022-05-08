import { Button, TextField, Typography } from "@mui/material";
import { InputLabelProps } from "common/DatePicker";
import Modal from "common/modal/Modal";
import ModalClose from "common/modal/ModalClose";
import ModalContent from "common/modal/ModalContent";
import { ApiError } from "data/api_error";
import { Session } from "data/session";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { authenticate } from "services/admin_service";
import { handleError } from "services/api";
import { NotificationContext } from "./Notification";

export interface AuthenticationCtx {
    session: Session|null;
    connect: (onConnect?: () => void) => void;
    disconnect: () => void;
}

export interface AuthenticationEdit {
    session: Session|null,
    setSession: any;
    showModal: boolean;
    setShowModal: any;
    password: string;
    setPassword: any;
    isDisabled: boolean;
    hasError: (k: string) => boolean;
    connect: () => void;
    newConn: (onConnect?: () => void) => void;
}

export const AuthenticationContext = createContext<AuthenticationCtx>({session: null, connect: () => {}, disconnect: () => {}});

function useAdmin(): AuthenticationEdit {
    const notificationHandler = useContext(NotificationContext);
    const [session, setSession] = useState<Session|null>(null);
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorFields, setErrorFields] = useState<string[]>([]);
    const onConnect = useRef<(() => void)|undefined>(undefined);

    const connect = useCallback(() => {
        setIsDisabled(true);
        authenticate(password).then((session: Session) => {
            setSession(session);
            setIsDisabled(false);
            setErrorFields([]);
            setShowModal(false);
            if (onConnect.current !== undefined) {
                onConnect.current();
                onConnect.current = undefined;
            }
        }).catch((e: ApiError) => {
            setErrorFields(handleError(e, notificationHandler));
            setIsDisabled(false);
        });
    }, [password, notificationHandler]);

    const hasError = (key: string): boolean => {
        return errorFields.findIndex((f) => f === key) !== -1;
    }

    const newConn = useCallback((onConn?: () => void) => {
        onConnect.current = onConn;
        setPassword("");
        setSession(null);
        setShowModal(true);
    }, [])

    useEffect(() => {
        const keypressHandler = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                connect();
            }
        }

        if (showModal) {
            document.body.addEventListener("keydown", keypressHandler);
        }

        return () => document.body.removeEventListener("keydown", keypressHandler);
    }, [connect, showModal]);

    return {
        session,
        setSession,
        showModal,
        setShowModal,
        password,
        setPassword,
        isDisabled,
        hasError,
        connect,
        newConn,
    };
}

const AuthenticationContainer: React.FC = (props) => {
    const {
        session,
        setSession,
        showModal,
        setShowModal,
        password,
        setPassword,
        isDisabled,
        hasError,
        connect,
        newConn,
    } = useAdmin();
    const context = useMemo<AuthenticationCtx>(() => {
        return {
            session: session,
            connect: (onConnect?: () => void) => {
                newConn(onConnect);
            },
            disconnect: () => {
                setSession(null);
            },
        }
    }, [session, newConn, setSession]);
    const inputRef = useRef<any>(null);
    useEffect(() => {
        if (showModal && inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [showModal, inputRef]);

    return (
    <AuthenticationContext.Provider value={context}>
        { showModal && 
            <Modal onClick={() => setShowModal(false)}>
                <ModalContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Authentification
                    </Typography>
                    <TextField 
                        InputLabelProps={InputLabelProps} 
                        label="Mot de passe" 
                        variant="standard"
                        type="password"
                        value={password}
                        inputRef={inputRef}
                        disabled={isDisabled}
                        error={hasError("password")}
                        onChange={(e) => setPassword(e.target.value)}></TextField>
                    <Button 
                        variant="outlined"
                        color="primary" 
                        disabled={isDisabled}
                        onClick={() => connect()}>envoyer</Button>
                    <ModalClose onClick={() => setShowModal(false)}></ModalClose>
                </ModalContent>
            </Modal>
        }
        {props.children}
    </AuthenticationContext.Provider>
    )
}

export default AuthenticationContainer