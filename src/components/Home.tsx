import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from '@mui/material';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Card from 'common/card/Card';
import CardBody from 'common/card/CardBody';
import CardHead from 'common/card/CardHead';
import Modal from 'common/modal/Modal';
import ModalContent from 'common/modal/ModalContent';
import 'styles/index.css';
import Keypad from './Keypad';
import { NotificationContext } from './Notification';
import { clockInOut } from 'services/clock_service';
import { handleError } from 'services/api';
import { ClockIn } from 'data/clock_in';
import moment from 'moment';
import { EmployeeClocks } from 'data/employee_clocks';
import { getDailyReport } from 'services/employee_service';
import Column from 'common/Column';
import Row from 'common/Row';
import { Clock } from 'data/clock';
import { AuthenticationContext } from './Authentication';
import { ApiError } from 'data/api_error';
import ModalClose from 'common/modal/ModalClose';

const DailyReportStyle = {
    in: {
        color: "var(--color-success)"
    },
    out: {
        color: "var(--color-error)"
    },
    entry: {
        justifyContent: "center", 
        display: "inline-flex",
        marginBottom: "0",
        gap: "3rem",
    },
    row: {
        display: "inline-flex",
        justifyContent: "center",
    },
    data: {
        color: "var(--color-accent)",
        fontWeight: "bold",
        paddingLeft: "0.5rem",
    },
} as any

export interface PinContextInterface {
    pin: string[],
    setPin: React.Dispatch<React.SetStateAction<string[]>>,
}

export const PinContext = createContext<PinContextInterface | null>(null);

function usePin(): [string[], any, () => void] {
    const notificationHandler = useContext(NotificationContext);
    const [pin, setPin] = useState(["", "", "", ""]);

    const clockIn = useCallback(() => {
        if (pin.join("").length !== 4) {
            return;
        }

        clockInOut(pin.join("")).then((res: ClockIn) => {
            notificationHandler({
                type: "success",
                message: `${res.employee} a entré son pin à ${moment(res.date).format("YYYY-MM-DD HH:mm")}`,
                timeout: 4000,
            });
            setPin(["", "", "", ""]);
        }).catch((e: ApiError) => {
            handleError(e, notificationHandler);
        });
    }, [pin, notificationHandler]);
    
    return [pin, setPin, clockIn];
}

function useDailyReport(): [EmployeeClocks|null, (pin: string[]) => void] {
    const authCtx = useContext(AuthenticationContext);
    const notificationHandler = useContext(NotificationContext);
    const [report, setReport] = useState<EmployeeClocks|null>(null);

    const getReport = (pin: string[]) => {
        const pinVal = pin.join("");
        if (pinVal.length !== 4) {
            return;
        }

        getDailyReport(authCtx, pinVal)
            .then(report => setReport(report))
            .catch((e: ApiError) => handleError(e, notificationHandler));
    }

    return [report, getReport];
}

const Home: React.FC = () => {
    const [pin, setPin, clockIn] = usePin();
    const [showModal, setShowModal] = useState(false);
    const [report, getReport] = useDailyReport();

    useEffect(() => {
        setShowModal(report !== null);
    }, [report]);

    return (
        <PinContext.Provider value={{pin, setPin}}>
            <div className="container">
                <div style={{ gridArea: "keypad" }}>
                <Card>
                    <CardHead>
                        <FontAwesomeIcon icon={faUserClock}></FontAwesomeIcon>
                    </CardHead>
                    <CardBody>
                        <Typography gutterBottom variant="h5" component="div">
                            PIN employé
                        </Typography>
                        <Keypad onSend={() => clockIn()}/>
                        <Button 
                            disabled={pin.join("").length !== 4}
                            onClick={() => clockIn()}
                            variant="outlined" 
                            style={{minWidth: "200px"}} 
                            color="primary">Envoyer</Button>
                        <Button 
                            disabled={pin.join("").length !== 4}
                            color="secondary" 
                            onClick={() => getReport(pin)}>Rapport journalier</Button>
                    </CardBody>
                </Card>
                </div>  
            </div>
            { showModal && report !== null && 
                <Modal onClick={() => setShowModal(false)}>
                    <ModalContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Rapport journalier
                        </Typography>
                        <div>
                            <Row style={DailyReportStyle.row}>
                                <Column>
                                    <span style={{ ...DailyReportStyle.data, marginBottom: "1rem" }}>
                                        {report.employee.first_name} {report.employee.last_name}
                                    </span>
                                </Column>
                            </Row>
                            <Row style={{ ...DailyReportStyle.row, marginBottom: "1rem", fontSize: "15px" }}>
                                <Column style={{ display: "block", textAlign: "center" }}>
                                    Date: 
                                    <span style={DailyReportStyle.data}>
                                        {moment(report.date).format("YYYY-MM-DD")}
                                    </span>,
                                    Durée: 
                                    <span style={DailyReportStyle.data}>
                                        {report.total_time}
                                    </span>
                                </Column>
                            </Row>
                            { report.clocks.map((c: Clock, i: number) => 
                                <Row key={i} style={DailyReportStyle.entry}>
                                    <Column style={{ width: "100%" }} align="flex-end">
                                            <span>{moment(c.date).format("HH:mm")}</span>
                                    </Column>
                                    <Column style={{ width: "100%" }} align="start">
                                        { i % 2 === 0 ? (
                                            <span style={DailyReportStyle.in}>Entrée</span> 
                                        ):(
                                            <span style={DailyReportStyle.out}>Sortie</span>
                                        )}
                                    </Column>
                                </Row>
                            )}
                        </div>
                        <ModalClose onClick={() => setShowModal(false)}></ModalClose>
                    </ModalContent>
                </Modal>
            }
        </PinContext.Provider>
    )
}

export default Home
