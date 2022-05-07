import { faPlus, faUserEdit, faUserMinus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import Row from 'common/Row'
import Column from 'common/Column'
import Table from 'common/table/Table'
import TableBody, { TableBodyStyle } from 'common/table/TableBody'
import TableHead from 'common/table/TableHead'
import React, { useContext, useEffect, useState } from 'react'
import AdminActions from 'components/Admin/AdminActions'
import { AdministrationColors } from 'components/Admin/Administration'
import AdminSectionTitle from 'components/Admin/AdminSectionTitle'
import { Link } from 'react-router-dom'
import { getEmployees } from 'services/employee_service'
import { Employee } from 'data/employee'
import EmployeeDelete from './EmployeeDelete'
import { AuthenticationContext } from 'components/Authentication'
import { handleError } from 'services/api'
import styled from '@emotion/styled'

const StyledData = styled.div`
    @media (max-width: 800px) {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 75px;
    }
`

const EmployeesStyle = {
    tableRow: {
        gridTemplateColumns: "max(80px, 10%) 25% 20% auto",
    },
    btn: {
        border: `1px solid ${AdministrationColors.Orange}`, 
        color: AdministrationColors.Orange
    }
} as any

function removeEmployee(employee: Employee, setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>) {
    setEmployees((employees: Employee[]) => {
        const newEmployees: Employee[] = [];
        employees.forEach((e: Employee) => {
            if (e.id !== employee.id) {
                newEmployees.push(e);
            }
        });

        return newEmployees;
    });
}

const Employees: React.FC = () => {
    const authCtx = useContext(AuthenticationContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        getEmployees(authCtx).then((employees: Employee[]) => {
            setEmployees(employees);
        }).catch(e => handleError(e, null, authCtx));
    }, [authCtx]);

    return (
    <div className='admin-container'>
        <AdminActions></AdminActions>
        <AdminSectionTitle color={AdministrationColors.OrangeBg} title="Administration des employés" icon={faUsers} ></AdminSectionTitle>
        <Table>
            <TableHead color={AdministrationColors.Orange}>
                <Row style={{...TableBodyStyle.tableRow, ...EmployeesStyle.tableRow}}>
                    <Column></Column>
                    <Column>Nom</Column>
                    <Column>Prénom</Column>
                    <Column align='flex-end'>
                        <Link to="/administration/employee">
                            <Button variant="outlined" style={EmployeesStyle.btn}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </Button>
                        </Link>
                    </Column>
                </Row>
            </TableHead>
            <TableBody>
                { employees.map((employee: Employee) => (
                    <Row key={employee.id} style={{...TableBodyStyle.tableRow, ...TableBodyStyle.bodyRow, ...EmployeesStyle.tableRow}}>
                        <Column>
                            <Link to={`/administration/employee/${employee.id}`}>
                                <Button variant="outlined" style={EmployeesStyle.btn}>
                                    <FontAwesomeIcon icon={faUserEdit}></FontAwesomeIcon>
                                </Button>
                            </Link>
                        </Column>
                        <Column>
                            <StyledData>
                                {employee.first_name}
                            </StyledData>
                        </Column>
                        <Column>
                            <StyledData>
                                {employee.last_name}
                            </StyledData>
                        </Column>
                        <Column align='flex-end'>
                            <Button variant="outlined" onClick={() => {
                                    setSelectedEmployee(employee);
                                    setShowModal(true);
                                }}>
                                <FontAwesomeIcon icon={faUserMinus}></FontAwesomeIcon>
                            </Button>
                        </Column>
                    </Row>
                ))}
            </TableBody>
        </Table>
        { showModal && selectedEmployee != null &&  
            <EmployeeDelete 
                employee={selectedEmployee} 
                onCancel={() => setShowModal(false)}
                onSuccess={() => {
                    setShowModal(false);
                    removeEmployee(selectedEmployee, setEmployees);
                }}></EmployeeDelete>
        }
    </div>
    )
}

export default Employees