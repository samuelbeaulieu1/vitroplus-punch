import { AuthenticationContext, AuthenticationCtx } from "components/Authentication";
import { useState, useEffect, useContext } from "react";
import { handleError } from "services/api";

export function useData<T>(getter: (authCtx: AuthenticationCtx) => Promise<T[]>): [T[], boolean] {
    const authCtx = useContext(AuthenticationContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<T[]>([]);
    
    useEffect(() => {
        getter(authCtx).then(data => {
            setData(data);
            setIsLoading(false);
        }).catch((e) => handleError(e, null, authCtx));
    }, [getter, authCtx]);

    return [data, isLoading];
}