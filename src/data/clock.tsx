import moment from "moment";

export interface Clock {
    id?: string;
    employee_id: string;
    date: moment.Moment;
}