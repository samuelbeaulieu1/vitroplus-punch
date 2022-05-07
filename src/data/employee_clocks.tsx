import moment from "moment";
import { Clock } from "./clock";
import { Employee } from "./employee";

export interface EmployeeClocks {
    clocks: Clock[];
    date: moment.Moment;
    total_time: string;
    total_time_value: number;
    total_time_float: number;
    employee: Employee;
}