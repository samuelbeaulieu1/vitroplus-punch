import moment from "moment";

export interface Session {
    token: string;
    expires_at: moment.Moment;
}