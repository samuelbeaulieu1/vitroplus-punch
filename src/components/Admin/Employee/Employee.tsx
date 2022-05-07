import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from 'react'
import AdminActions from 'components/Admin/AdminActions'
import { AdministrationColors } from 'components/Admin/Administration'
import AdminSectionTitle from 'components/Admin/AdminSectionTitle'
import { useNavigate, useParams } from "react-router-dom";
import Card from 'common/card/Card'
import CardHead from 'common/card/CardHead'
import { Button, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import CardBody from 'common/card/CardBody'
import Row from 'common/Row'
import SaveContainer from 'components/Admin/SaveContainer'
import { InputLabelProps } from 'common/DatePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createEmployee, getEmployee, updateEmployee } from 'services/employee_service'
import { Employee } from 'data/employee'
import { getBranches } from 'services/branch_service'
import { Branch } from 'data/branch'
import EmployeeDelete from './EmployeeDelete'
import { NotificationContext } from 'components/Notification'
import { useSave } from 'hooks/save_hook'
import { useEdit } from 'hooks/edit_hook'
import { useData } from 'hooks/data_hook'

const EmployeePage: React.FC = () => {
    const notificationHandler = useContext(NotificationContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [branches, isLoading] = useData<Branch>(getBranches);
    const [employee, handleChange] = useEdit<Employee>({
        first_name: "",
        last_name: "",
        branch_id: "",
        pin: "",
        is_constant_hours: false,
        constant_hours: 0,
        email: "",
    }, getEmployee, id);
    const [isDisabled, saveEmployee, hasError] = useSave<Employee>({ 
        notificationHandler, 
        id, 
        createHandler: createEmployee, 
        updateHandler: updateEmployee, 
        onCreate: (e: Employee) => {
            navigate(`/administration/employee/${e.id}`);
        }
    });

    return (
    <div className='admin-container'>
        <AdminActions back="/administration/employees">
            { id !== undefined && 
                <Button variant="outlined" style={{ marginLeft: "1rem" }} onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </Button>
            }
        </AdminActions>
        <AdminSectionTitle color={AdministrationColors.OrangeBg} title="Employé" icon={faUser} ></AdminSectionTitle>
        <Card>
            <CardHead style={{ background: AdministrationColors.Orange }}></CardHead>
            <CardBody>
                <Row>
                    <TextField 
                        InputLabelProps={InputLabelProps} 
                        label="Prénom" 
                        variant="standard"
                        value={employee.first_name}
                        disabled={isDisabled}
                        error={hasError("first_name")}
                        onChange={(e) => handleChange("first_name", e.target.value)}></TextField>
                    <TextField 
                        InputLabelProps={InputLabelProps} 
                        label="Nom" 
                        variant="standard"
                        value={employee.last_name}
                        disabled={isDisabled}
                        error={hasError("last_name")}
                        onChange={(e) => handleChange("last_name", e.target.value)}></TextField>
                </Row>
                <Row>
                    <TextField 
                        InputLabelProps={InputLabelProps} 
                        label="PIN" 
                        variant="standard"
                        disabled={isDisabled}
                        error={hasError("pin")}
                        value={employee.pin}
                        onChange={(e) => handleChange("pin", e.target.value)}></TextField>
                    <FormControl variant="standard">
                        <InputLabel id="branchLabel" style={{ color: "var(--color-secondary)" }}>Surccursale</InputLabel>
                        { !isLoading && (
                            <Select 
                                labelId="branchLabel" 
                                value={employee.branch_id} 
                                disabled={isDisabled}
                                error={hasError("branch_id")}
                                onChange={(e) => handleChange("branch_id", e.target.value)}>
                            <MenuItem value=""></MenuItem>
                            { branches.map((branch: Branch) => (
                                <MenuItem key={branch.id} value={branch.id}>{branch.store}</MenuItem>
                            ))}
                            </Select>
                        )}
                    </FormControl>
                </Row>
                <Row>
                    <TextField 
                        InputLabelProps={InputLabelProps} 
                        label="Courriel" 
                        variant="standard"
                        value={employee.email}
                        error={hasError("email")}
                        disabled={isDisabled}
                        onChange={(e) => handleChange("email", e.target.value)}></TextField>
                </Row>
                <Row>
                    <div style={{ textAlign: "center" }}>
                        <InputLabel style={{ color: "var(--color-secondary)" }}>Est temps constant</InputLabel>
                        <Checkbox 
                            size="small" 
                            checked={employee.is_constant_hours} 
                            disabled={isDisabled}
                            onChange={(e) => handleChange("is_constant_hours", e.target.checked)}/>
                    </div>
                    { employee.is_constant_hours && (
                        <TextField 
                            InputLabelProps={InputLabelProps} 
                            label="Nombre d'heures par semaine" 
                            variant="standard"
                            type="number"
                            value={employee.constant_hours}
                            disabled={isDisabled}
                            onChange={(e) => handleChange("constant_hours", Number(e.target.value))}></TextField>
                    )}
                </Row>
                <SaveContainer disabled={isDisabled} onClick={() => saveEmployee(employee)}></SaveContainer> 
            </CardBody>
        </Card>
        { showModal && 
            <EmployeeDelete 
                employee={employee} 
                onCancel={() => setShowModal(false)}
                onSuccess={() => navigate("/administration/employees")}></EmployeeDelete>
        }
    </div>
    )
}

export default EmployeePage;