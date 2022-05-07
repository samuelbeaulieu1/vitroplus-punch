import { AuthenticationContext, AuthenticationCtx } from "components/Authentication";
import { NotificationHandler } from "components/Notification";
import { Message } from "data/message";
import { useContext, useState } from "react";
import { ApiError } from "data/api_error";
import { handleError } from "services/api";

export interface SaveProps<T> {
    notificationHandler: NotificationHandler;
    id?: string;
    createHandler: (ctx: AuthenticationCtx, val: T) => Promise<T>;
    updateHandler: (ctx: AuthenticationCtx, val: T) => Promise<Message>;
    onCreate?: (val: T) => void;
}

export function useSave<T>(props: SaveProps<T>): [boolean, (e: T) => void, (k: string) => boolean] {
    const authCtx = useContext(AuthenticationContext);
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorFields, setErrorFields] = useState<string[]>([]);

    function save(val: T) {
        setIsDisabled(true);
        if (props.id === undefined) {
            props.createHandler(authCtx, val).then((e: T) => {
                props.notificationHandler({
                    message: "Le record a été créé",
                    type: "success"
                });
                setErrorFields([]);
                setIsDisabled(false);
                if (props.onCreate) {
                    props.onCreate(e);
                }
            }).catch((e: ApiError) => {
                setErrorFields(handleError(e, props.notificationHandler, authCtx));
                setIsDisabled(false);
            });
        } else {
            props.updateHandler(authCtx, val).then((message: Message) => {
                props.notificationHandler({
                    message: message.message,
                    type: "success"
                });
                setIsDisabled(false);
                setErrorFields([]);
            }).catch((e: ApiError) => {
                setErrorFields(handleError(e, props.notificationHandler, authCtx));
                setIsDisabled(false);
            });
        }
    }

    function hasError(key: string): boolean {
        return errorFields.findIndex((f) => f === key) !== -1;
    }

    return [isDisabled, save, hasError];
}