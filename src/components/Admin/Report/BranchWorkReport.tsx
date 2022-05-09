import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; 
import Card from 'common/card/Card';
import CardBody from 'common/card/CardBody';
import CardHead from 'common/card/CardHead';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import 'styles/administration.css';
import { AdministrationColors } from 'components/Admin/Administration';
import AdminActions from 'components/Admin/AdminActions';
import Row from 'common/Row';
import AdminSectionTitle from 'components/Admin/AdminSectionTitle';
import { useParams } from 'react-router';
import moment from 'moment';
import { downloadBranchReportPdf, getBranchReport } from 'services/clock_service';
import Column from 'common/Column';
import { AuthenticationContext } from 'components/Authentication';
import { handleError } from 'services/api';
import { BranchEmployeeReport, BranchReport } from 'data/branch_report';
import { Button, TextField } from '@mui/material';
import { InputLabelProps } from 'common/DatePicker';
import { NotificationContext } from 'components/Notification';

type EditEmployee = (id: string, key: string, value: number) => void;

const useBranchReport = (id: string, start: moment.Moment, end: moment.Moment): [BranchReport|null, EditEmployee, () => void] => {
    const notificationHandler = useContext(NotificationContext);
    const authCtx = useContext(AuthenticationContext);
    const [report, setReport] = useState<BranchReport|null>(null);
    
    useEffect(() => {
        getBranchReport(authCtx, id, start, end)
            .then((report) => {
                report.employees_report = Object.values(report.employees_report);
                setReport(report);
            })
            .catch(e => handleError(e, null, authCtx));
    }, [id, start, end, authCtx]);

    const editEmployee = (id: string, key: string, value: number) => {
        if (report === null)
            return;

        const newReport: BranchReport = {...report};
        const newEmployeesReport: BranchEmployeeReport[] = [];

        newReport.employees_report.forEach((e) => {
            if (e.employee.id === id) {
                newEmployeesReport.push({
                    ...e,
                    [key]: value,
                });
                return;
            }

            newEmployeesReport.push(e);
        });

        newReport.employees_report = newEmployeesReport;
        setReport(newReport);
    }

    const downloadReport = () => {
        if (report === null)
            return;

        downloadBranchReportPdf(authCtx, report).then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `RapportTravail_${moment(report.start_date).format("YYYYMMDD")}_${moment(report.end_date).format("YYYYMMDD")}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }).catch(e => handleError(e, notificationHandler, authCtx));
    }
    
    return [report, editEmployee, downloadReport];
}

const BranchWorkReport: React.FC = () => {
    const { start, end, id } = useParams();
    const startDate = useMemo(() => moment(start), [start]);
    const endDate = useMemo(() => moment(end), [end]);

    const [report, editEmployee, downloadReport] = useBranchReport(id || "", startDate, endDate);

    return (
        <div className='admin-container'>
            <AdminActions back='/administration/workReports'>
                <Button 
                    variant='outlined' 
                    color="primary" 
                    style={{ marginLeft: "1rem" }}
                    onClick={() => downloadReport()}>
                    Télécharger le rapport
                </Button>
            </AdminActions>
            <AdminSectionTitle 
                color={AdministrationColors.BlueBg} 
                icon={faCalendarAlt} 
                title={`Rapport du travail des employés de la succursale ${report?.branch.store} entre ${start} et ${end}`}></AdminSectionTitle>
            <Card style={{ marginBottom: "1rem" }}>
                <CardHead style={{ background: AdministrationColors.Blue }}></CardHead>
                <CardBody>
                { report !== null && report.employees_report.map((employeeReport, i) => 
                    <Row key={i}>
                        <Column>
                            {employeeReport.employee.first_name} {employeeReport.employee.last_name}
                        </Column>
                        <Column>
                            <TextField
                                InputLabelProps={InputLabelProps}  
                                type="number"
                                label="Temps travaillé"
                                value={employeeReport.total_time}
                                onChange={(e) => editEmployee(employeeReport.employee.id as string, "total_time", Number(e.target.value))}
                                variant="standard"/>
                            <TextField 
                                InputLabelProps={InputLabelProps}  
                                type="number"
                                style={{ marginLeft: "1rem" }}
                                label="Temps supplémentaire"
                                value={employeeReport.overtime}
                                onChange={(e) => editEmployee(employeeReport.employee.id as string, "overtime", Number(e.target.value))}
                                variant="standard"/>
                        </Column>
                    </Row>
                )}
                </CardBody>
            </Card>
        </div>
    )
}

export default BranchWorkReport