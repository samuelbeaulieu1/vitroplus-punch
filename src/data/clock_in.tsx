import moment from "moment";

export interface ClockIn {
    employee: string;
    date: moment.Moment;
}