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
import { Employee } from 'data/employee';
import { getEmployee } from 'services/employee_service';
import moment from 'moment';
import { ClocksDayReport } from 'data/clocks_day_report';
import { getEmployeeClocksBetween } from 'services/clock_service';
import { Clock } from 'data/clock';
import Column from 'common/Column';
import { AuthenticationContext } from 'components/Authentication';
import { handleError } from 'services/api';

const WorkReportStyle = {
    in: {
        color: "var(--color-success)"
    },
    out: {
        color: "var(--color-error)"
    },
    entry: {
        justifyContent: "center", 
        display: "inline-flex",
        gap: "2rem",
        marginBottom: "0", 
    }
} as any

const useEmployee = (id: string): Employee => {
    const authCtx = useContext(AuthenticationContext);
    const [employee, setEmployee] = useState<Employee>({
        first_name: "",
        last_name: "",
        branch_id: "",
        pin: "",
        is_constant_hours: false,
        constant_hours: 0,
        email: "",
    });

    useEffect(() => {
        getEmployee(authCtx, id).then((employee) => {
            setEmployee(employee);
        });
    }, [authCtx, id]);

    return employee;
}

const useEmployeeReport = (id: string, start: moment.Moment, end: moment.Moment): ClocksDayReport[] => {
    const authCtx = useContext(AuthenticationContext);
    const [reports, setReports] = useState<ClocksDayReport[]>([]);
    
    useEffect(() => {
        getEmployeeClocksBetween(authCtx, id, start, end)
            .then((reports) => setReports(reports))
            .catch(e => handleError(e, null, authCtx));
    }, [id, start, end, authCtx]);
    
    return Object.values(reports);
}

const EmployeeWorkReport: React.FC = () => {
    const { start, end, id } = useParams();
    const startDate = useMemo(() => moment(start), [start]);
    const endDate = useMemo(() => moment(end), [end]);

    const employee = useEmployee(id || "");
    const reports = useEmployeeReport(id || "", startDate, endDate);

    return (
        <div className='admin-container'>
            <AdminActions back='/administration/workReports'></AdminActions>
            <AdminSectionTitle 
                color={AdministrationColors.BlueBg} 
                icon={faCalendarAlt} 
                title={`Rapport du travail de ${employee.first_name} ${employee.last_name} entre ${start} et ${end}`}></AdminSectionTitle>
            { reports.map((report, i) => 
                <Card key={i} style={{ marginBottom: "1rem" }}>
                    <CardHead style={{ background: AdministrationColors.Blue }}>
                        <b>
                            Date: {moment(Object.values(report.report)[0].date).utc().format("YYYY-MM-DD")},
                            Durée: {Object.values(report.report)[0].total_time}
                        </b>
                    </CardHead>
                    <CardBody>
                        { Object.values(report.report)[0].clocks.map((c: Clock, i: number) => 
                            <Row key={i} style={WorkReportStyle.entry}>
                                <Column>
                                        {moment(c.date).format("HH:mm")}
                                </Column>
                                <Column>
                                    { i % 2 === 0 ? (
                                        <span style={WorkReportStyle.in}>Entrée</span> 
                                    ):(
                                        <span style={WorkReportStyle.out}>Sortie</span>
                                    )}
                                </Column>
                            </Row>
                        )}
                    </CardBody>
                </Card>
            )}
            { reports.length === 0 &&
                <b style={{ textAlign: "center", marginTop: "2rem", color: "var(--color-accent)" }}>
                    L'employé n'a aucune entrée dans la période
                </b>
            }
        </div>
    )
}

export default EmployeeWorkReport