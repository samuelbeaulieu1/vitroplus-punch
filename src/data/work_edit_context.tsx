import moment from "moment";

export interface WorksEditContext {
    employee_id: string;
    date: moment.Moment;
}