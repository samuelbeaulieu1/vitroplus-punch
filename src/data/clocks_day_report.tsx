import moment from "moment";
import { EmployeeClocks } from "./employee_clocks";

export interface ClocksDayReport {
    date: moment.Moment;
    report: EmployeeClocks[];
}