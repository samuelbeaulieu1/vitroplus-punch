import { WorksEditProps } from "components/Admin/Work/WorksEdit";
import { AuthenticationContext } from "components/Authentication";
import { NotificationHandler } from "components/Notification";
import { Clock } from "data/clock";
import { EmployeeClocks } from "data/employee_clocks";
import moment from "moment";
import { useState, useEffect, useCallback, useContext } from "react";
import { handleError } from "services/api";
import { getEmployeeClocks, saveEmployeeClocks } from "services/clock_service";

export interface EditClocksHook {
    metadata: EmployeeClocks|null;
    clocks: Clock[];
    modified: boolean;
    editClockEntry: (date: any, i: number) => void;
    addClockEntry: () => void;
    deleteClockEntry: (i: number) => void;
    sortClocks: () => void;
    saveClocks: () => void;
}

export function useEditClocks(props: WorksEditProps, notificationHandler: NotificationHandler): EditClocksHook {
    const authCtx = useContext(AuthenticationContext);
    const [clocks, setClocks] = useState<Clock[]>([]);
    const [metadata, setMetadata] = useState<EmployeeClocks|null>(null);
    const [modified, setModified] = useState(false);

    const load = useCallback(() => {
        getEmployeeClocks(authCtx, props.context.employee_id, props.context.date).then((clocks: EmployeeClocks) => {
            clocks.clocks.map((c: Clock) => 
                c.date = moment(c.date)
            );
            setClocks(clocks.clocks);
            setMetadata(clocks);
            setModified(false);
        }).catch(e => handleError(e, null, authCtx));
    }, [props.context.date, props.context.employee_id, authCtx]);

    useEffect(() => {
        load();
    }, [load]);

    const sortClocks = (): void => {
        const newClocks = [...clocks];
        setClocks(newClocks.sort((a, b) => a.date.diff(b.date)));
    }

    const saveClocks = () => {
        saveEmployeeClocks(authCtx, clocks, props.context.employee_id, props.context.date).then((res) => {
            notificationHandler({
                type: "success",
                message: res.message,
            });
            load();
        }).catch(e => handleError(e, null, authCtx));
    }

    const editClockEntry = (date: any, index: number) => {
        const newClocks = clocks.map((c: Clock, i: number) => {
            if (i === index) {
                return {
                    ...c,
                    date: moment(props.context.date.format("YYYY-MM-DD ") + date),
                };
            }

            return c;
        });

        setClocks(newClocks);
        setModified(true);
    }

    const addClockEntry = () => {
        const newClocks = [
            ...clocks,
            {
                employee_id: props.context.employee_id,
                date: moment(moment().format("YYYY-MM-DD ") + "00:00"),
            }
        ]

        setClocks(newClocks);
        setModified(true);
    }

    const deleteClockEntry = (index: number) => {
        const newClocks = [...clocks];
        newClocks.splice(index, 1);

        setClocks(newClocks);
        setModified(true);
    }

    return {
        metadata,
        clocks: clocks, 
        modified,
        editClockEntry, 
        addClockEntry, 
        deleteClockEntry,
        sortClocks,
        saveClocks,
    };
}