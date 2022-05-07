import { AuthenticationCtx } from 'components/Authentication';
import { Employee } from 'data/employee';
import { EmployeeClocks } from 'data/employee_clocks';
import { Message } from 'data/message';
import { del, get, post, api, put } from './api';

const endpoint = "Employee";

export const getEmployees = (auth: AuthenticationCtx): Promise<Employee[]> => {
    return get<Employee[]>({
        url: `${api}/${endpoint}`,
        authentication: auth,
    }).then(res => res.data);
}

export const getEmployee = (auth: AuthenticationCtx, id: string): Promise<Employee> => {
    return get<Employee>({
        url: `${api}/${endpoint}/${id}`,
        authentication: auth,
    }).then(res => res.data);
}

export const deleteEmployee = (auth: AuthenticationCtx, id: string): Promise<Message> => {
    return del<Message>({
        url: `${api}/${endpoint}/${id}`,
        authentication: auth,
    }).then(res => res.data);
}

export const createEmployee = (auth: AuthenticationCtx, employee: Employee): Promise<Employee> => {
    return post<Employee>({
        url: `${api}/${endpoint}`,
        authentication: auth,
    }, employee).then(res => res.data);
}

export const updateEmployee = (auth: AuthenticationCtx, employee: Employee): Promise<Message> => {
    return put<Message>({
        url: `${api}/${endpoint}/${employee.id}`,
        authentication: auth,
    }, employee).then(res => res.data);
}

export const getDailyReport = (auth: AuthenticationCtx, pin: string): Promise<EmployeeClocks> => {
    return get<EmployeeClocks>({
        url: `${api}/${endpoint}/${pin}/DailyReport`,
        authentication: auth,
    }).then(res => res.data);
}