import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { FormControl, InputLabel, Select, Button, MenuItem } from '@mui/material'
import Card from 'common/card/Card'
import CardBody from 'common/card/CardBody'
import CardHead from 'common/card/CardHead'
import Row from 'common/Row'
import React, { useEffect, useState } from 'react'
import AdminActions from 'components/Admin/AdminActions'
import { AdministrationColors } from 'components/Admin/Administration'
import AdminSectionTitle from 'components/Admin/AdminSectionTitle'
import DatePicker from 'common/DatePicker';
import WorksEdit from './WorksEdit'
import { Employee } from 'data/employee'
import { getEmployees } from 'services/employee_service'
import moment from 'moment'
import { WorksEditContext } from 'data/work_edit_context'
import { useData } from 'hooks/data_hook'

const Works: React.FC = () => {
    const [employees, isLoading] = useData<Employee>(getEmployees);
    const [employee, setEmployee] = useState<string>("");
    const [date, setDate] = useState<moment.Moment|null>(moment());
    const [worksEditContext, setWorksEditContext] = useState<WorksEditContext|null>(null);
    const [isValidForm, setIsValidForm] = useState(false);
    useEffect(() => {
        setIsValidForm(employee !== "" && date !== null);
    }, [employee, date]);

    const getClocks = () => {
        if (date !== null) {
            setWorksEditContext({
                employee_id: employee,
                date: date,
            });
        }
    }

    return (
    <div className='admin-container'>
        <AdminActions></AdminActions>
        <AdminSectionTitle color={AdministrationColors.PinkBg} title="Administration des travaux" icon={faClipboardList} ></AdminSectionTitle>
        <Card>
            <CardHead style={{ background: AdministrationColors.Pink }}></CardHead>
            <CardBody>
                <Row>
                    <FormControl variant="standard">
                        <InputLabel id="employeeLabel" style={{ color: "var(--color-secondary)" }}>Employé</InputLabel>
                        { !isLoading && (
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

                    <DatePicker value={date?.format("YYYY-MM-DD") as string} onChange={(value) => setDate(value)} label="Date"></DatePicker>
                </Row>
                <Button variant="outlined" onClick={() => getClocks()} disabled={!isValidForm}>
                    Rechercher
                </Button>
            </CardBody>
        </Card>
        { worksEditContext !== null && 
            <WorksEdit context={worksEditContext}></WorksEdit>
        }
    </div>
    )
}

export default Works