import { AuthenticationContext, AuthenticationCtx } from "components/Authentication";
import { useState, useEffect, useContext } from "react";
import { handleError } from "services/api";

type GetHandler<T> = (ctx: AuthenticationCtx, id: string) => Promise<T>;
type Setter = (key: string, value: any) => void;

export function useEdit<T>(defaultValue: T, getHandler?: GetHandler<T>, id?: string): [T, Setter] {
    const authCtx = useContext(AuthenticationContext);
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        if (id !== undefined && getHandler !== undefined) {
            getHandler(authCtx, id).then((val: T) => setValue(val)).catch((e) => handleError(e, null, authCtx));
        }
    }, [id, getHandler, authCtx]);

    function handleChange(key: string, value: any) {
        setValue((v: T) => {
            return {
                ...v,
                [key]: value,
            }
        });
    }

    return [value, handleChange];
}