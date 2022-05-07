import { faUserCog } from '@fortawesome/free-solid-svg-icons'; 
import { TextField } from '@mui/material';
import Card from 'common/card/Card';
import CardBody from 'common/card/CardBody';
import CardHead from 'common/card/CardHead';
import React, { useContext, useState } from 'react'
import 'styles/administration.css';
import { AdministrationColors } from 'components/Admin/Administration';
import AdminActions from 'components/Admin/AdminActions';
import Row from 'common/Row';
import AdminSectionTitle from 'components/Admin/AdminSectionTitle';
import SaveContainer from 'components/Admin/SaveContainer';
import { AdminUpdate } from 'data/admin_update';
import { useEdit } from 'hooks/edit_hook';
import { NotificationContext } from 'components/Notification';
import { updatePassword } from 'services/admin_service';
import { Message } from 'data/message';
import { ApiError } from 'data/api_error';
import { handleError } from 'services/api';
import { AuthenticationContext } from 'components/Authentication';

const InputLabelProps = {
    style: {
        color: "var(--color-secondary)",
    }
}

export function useSave(): [boolean, (e: AdminUpdate) => void, (k: string) => boolean] {
    const authCtx = useContext(AuthenticationContext);
    const notificationHandler = useContext(NotificationContext);
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorFields, setErrorFields] = useState<string[]>([]);

    function save(val: AdminUpdate) {
        setIsDisabled(true);
        updatePassword(authCtx, val).then((message: Message) => {
            notificationHandler({
                message: message.message,
                type: "success"
            });
            setIsDisabled(false);
            setErrorFields([]);
        }).catch((e: ApiError) => {
            setErrorFields(handleError(e, notificationHandler, authCtx));
            setIsDisabled(false);
        });
    }

    function hasError(key: string): boolean {
        return errorFields.findIndex((f) => f === key) !== -1;
    }

    return [isDisabled, save, hasError];
}

const AdminAccount: React.FC = () => {
    const [admin, handleChange] = useEdit<AdminUpdate>({
        password: "",
        new_password: "",
        new_password_repeat: "",
    });
    const [isDisabled, save, hasError] = useSave();
    
    return (
        <div className='admin-container'>
            <AdminActions></AdminActions>
            <AdminSectionTitle color={AdministrationColors.RedBg} title="Compte administrateur" icon={faUserCog} ></AdminSectionTitle>
            <Card>
                <CardHead></CardHead>
                <CardBody>
                    <Row>
                        <TextField 
                            InputLabelProps={InputLabelProps} 
                            type="password" 
                            label="Mot de passe actuel" 
                            variant="standard"
                            value={admin.password}
                            disabled={isDisabled}
                            error={hasError("password")}
                            onChange={(e) => handleChange("password", e.target.value)}></TextField>
                    </Row>
                    <Row>
                        <TextField 
                            InputLabelProps={InputLabelProps} 
                            type="password" 
                            label="Nouveau mot de passe" 
                            variant="standard"
                            value={admin.new_password}
                            disabled={isDisabled}
                            error={hasError("new_password")}
                            onChange={(e) => handleChange("new_password", e.target.value)}></TextField>
                        <TextField 
                            InputLabelProps={InputLabelProps} 
                            type="password" 
                            label="Répéter le nouveau mot de passe" 
                            variant="standard"
                            value={admin.new_password_repeat}
                            disabled={isDisabled}
                            error={hasError("new_password_repeat")}
                            onChange={(e) => handleChange("new_password_repeat", e.target.value)}></TextField>
                    </Row>
                    <SaveContainer 
                        disabled={isDisabled}
                        onClick={() => save(admin)}></SaveContainer> 
                </CardBody>
            </Card>
        </div>
    )
}

export default AdminAccount