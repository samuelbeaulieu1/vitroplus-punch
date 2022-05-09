import moment from "moment";
import { Branch } from "./branch";
import { Employee } from "./employee";

export interface BranchReport {
    start_date: moment.Moment;
    end_date: moment.Moment;
    branch: Branch;
    employees_report: BranchEmployeeReport[];
}

export interface BranchEmployeeReport {
    employee: Employee;
    total_time: number;
    overtime: number;
}