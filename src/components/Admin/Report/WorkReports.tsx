import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; 
import Card from 'common/card/Card';
import CardBody from 'common/card/CardBody';
import CardHead from 'common/card/CardHead';
import React, { useContext, useState } from 'react'
import 'styles/administration.css';
import { AdministrationColors } from 'components/Admin/Administration';
import AdminActions from 'components/Admin/AdminActions';
import Row from 'common/Row';
import AdminSectionTitle from 'components/Admin/AdminSectionTitle';
import DatePicker from 'common/DatePicker';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useData } from 'hooks/data_hook';
import { getEmployees } from 'services/employee_service';
import { Branch } from 'data/branch';
import { getBranches } from 'services/branch_service';
import { Employee } from 'data/employee';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from 'components/Authentication';
import { getBranchReport } from 'services/clock_service';
import { handleError } from 'services/api';
import { NotificationContext } from 'components/Notification';

const WorkReports: React.FC = () => {
    const authCtx = useContext(AuthenticationContext);
    const notificationHandler = useContext(NotificationContext);
    const [employees, isLoadingEmployees] = useData<Employee>(getEmployees);
    const [branches, isLoadingBranches] = useData<Branch>(getBranches);

    const [employee, setEmployee] = useState("");
    const [branch, setBranch] = useState("");
    const [start, setStart] = useState<moment.Moment|null>(moment().isoWeekday(1));
    const [end, setEnd] = useState<moment.Moment|null>(moment().isoWeekday(5));

    function downloadReport() {
        const startDate = start as moment.Moment;
        const endDate = end as moment.Moment;
        getBranchReport(authCtx, branch, startDate, endDate).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `RapportTravail_${startDate.format("YYYYMMDD")}_${endDate.format("YYYYMMDD")}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }).catch(e => handleError(e, notificationHandler, authCtx));
    }
    
    return (
        <div className='admin-container'>
            <AdminActions></AdminActions>
            <AdminSectionTitle color={AdministrationColors.BlueBg} icon={faCalendarAlt} title="Rapports des travaux"></AdminSectionTitle>
            <Card style={{ marginBottom: "1rem" }}>
                <CardHead style={{ background: AdministrationColors.Blue }}></CardHead>
                <CardBody>
                    <Row style={{ marginBottom: "0" }}>
                        <DatePicker 
                            value={start?.format("YYYY-MM-DD") as string} 
                            onChange={(value) => setStart(value)} 
                            label="Date de début"></DatePicker>
                        <DatePicker 
                            value={end?.format("YYYY-MM-DD") as string} 
                            onChange={(value) => setEnd(value)} 
                            label="Date de fin"></DatePicker>
                    </Row>
                </CardBody>
            </Card>
            <Card style={{ marginBottom: "1rem" }}>
                <CardHead style={{ background: AdministrationColors.Blue }}>
                    <Typography gutterBottom variant="h6" component="div" color="text.primary" style={{ marginBottom: "0" }}>
                        Rapport du travail d'un employé
                    </Typography>
                </CardHead>
                <CardBody>
                    <Row>
                        <FormControl variant="standard">
                            <InputLabel id="employeeLabel" style={{ color: "var(--color-secondary)" }}>Employé</InputLabel>
                            { !isLoadingEmployees && (
                                <Select 
                                    labelId="employeeLabel" 
                                    value={employee} 
                                    onChange={(e) => setEmployee(e.target.value)}>
                                <MenuItem value=""></MenuItem>
                                { employees.map((employee: Employee) => (
                                    <MenuItem key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</MenuItem>
                                ))}
                                </Select>
                            )}
                        </FormControl>
                    </Row>
                    <Link 
                        to={`/administration/workReport/between/${start?.format("YYYY-MM-DD")}/${end?.format("YYYY-MM-DD")}/for/${employee}`} 
                        style={{ textDecoration: "none" }}>
                        <Button variant="outlined" disabled={employee === "" || start === null || end === null}>
                            Visualiser le rapport
                        </Button>
                    </Link>
                </CardBody>
            </Card>
            <Card>
                <CardHead style={{ background: AdministrationColors.Blue }}>
                    <Typography gutterBottom variant="h6" component="div" color="text.primary" style={{ marginBottom: "0" }}>
                        Rapport du travail par succursale
                    </Typography>
                </CardHead>
                <CardBody>
                    <Row>
                        <FormControl variant="standard">
                            <InputLabel id="employeeLabel" style={{ color: "var(--color-secondary)" }}>Succursale</InputLabel>
                            { !isLoadingBranches && (
                                <Select 
                                    labelId="branchLabel" 
                                    value={branch} 
                                    onChange={(e) => setBranch(e.target.value)}>
                                <MenuItem value=""></MenuItem>
                                { branches.map((branch: Branch) => (
                                    <MenuItem key={branch.id} value={branch.id}>{branch.store}</MenuItem>
                                ))}
                                </Select>
                            )}
                        </FormControl>
                    </Row>
                    <Button 
                        variant="outlined" 
                        onClick={() => downloadReport()} 
                        disabled={branch === "" || start === null || end === null}>
                        Visualiser le rapport
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default WorkReports