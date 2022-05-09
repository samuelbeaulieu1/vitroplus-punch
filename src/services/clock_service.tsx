import { AuthenticationCtx } from 'components/Authentication';
import { BranchReport } from 'data/branch_report';
import { Clock } from 'data/clock';
import { ClocksDayReport } from 'data/clocks_day_report';
import { ClockIn } from 'data/clock_in';
import { EmployeeClocks } from 'data/employee_clocks';
import { Message } from 'data/message';
import moment from 'moment';
import { get, api, put, post, onError, getHeaders, handleBlobResponse } from './api';

const endpoint = "Clock";

export const getEmployeeClocks = (auth: AuthenticationCtx, employeeId: string, date: moment.Moment): Promise<EmployeeClocks> => {
    return get<EmployeeClocks>({
        url: `${api}/${endpoint}/Date/${date.format("YYYY-MM-DD")}/For/${employeeId}`,
        authentication: auth,
    }).then(res => res.data);
}

export const getEmployeeClocksBetween = (auth: AuthenticationCtx, employeeId: string, start: moment.Moment, end: moment.Moment): Promise<ClocksDayReport[]> => {
    return get<ClocksDayReport[]>({
        url: `${api}/${endpoint}/Between/${start.format("YYYY-MM-DD")}/${end.format("YYYY-MM-DD")}/For/${employeeId}`,
        authentication: auth,
    }).then(res => res.data);
}

export const saveEmployeeClocks = (auth: AuthenticationCtx, clocks: Clock[], employeeId: string, date: moment.Moment): Promise<Message> => {
    return put<Message>({
        url: `${api}/${endpoint}/Date/${date.format("YYYY-MM-DD")}/For/${employeeId}`,
        authentication: auth,
    }, { clocks }).then(res => res.data);
}

export const clockInOut = (pin: string): Promise<ClockIn> => {
    return post<ClockIn>({
        url: `${api}/${endpoint}`,
    }, { pin }).then(res => res.data);
}

export const getBranchReport = (auth: AuthenticationCtx, branchId: string, start: moment.Moment, end: moment.Moment): Promise<BranchReport> => {
    return get<BranchReport>({
        url: `${api}/${endpoint}/Between/${start.format("YYYY-MM-DD")}/${end.format("YYYY-MM-DD")}/In/${branchId}`,
        authentication: auth,
    }).then(res => res.data);
}

export const downloadBranchReportPdf = (auth: AuthenticationCtx, report: BranchReport): Promise<Blob> => {
    const opts = {
        headers: getHeaders(auth.session?.token),
        method: "POST",
        body: JSON.stringify(report),
    }
    const start = moment(report.start_date).format("YYYY-MM-DD");
    const end = moment(report.end_date).format("YYYY-MM-DD");
    const url = `${api}/${endpoint}/Between/${start}/${end}/In/${report.branch.id}/ToPDF`

    return fetch(url, opts).then((res) => handleBlobResponse(res)).catch((e) => {
        throw onError(e);
    })
}