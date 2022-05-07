import { Typography, Button } from '@mui/material';
import Modal from 'common/modal/Modal';
import ModalClose from 'common/modal/ModalClose';
import ModalContent from 'common/modal/ModalContent';
import { AuthenticationContext } from 'components/Authentication';
import { NotificationContext } from 'components/Notification';
import { ApiError } from 'data/api_error';
import { Employee } from 'data/employee';
import { useContext } from 'react';
import { handleError } from 'services/api';
import { deleteEmployee } from 'services/employee_service';

export interface EmployeeDeleteProps {
    employee: Employee;
    onSuccess?: () => void;
    onCancel: () => void;
}

const EmployeeDelete = (props: EmployeeDeleteProps) => {
    const authCtx = useContext(AuthenticationContext);
    const notificationHandler = useContext(NotificationContext);

    const onDelete = () => {
        deleteEmployee(authCtx, props.employee.id as string).then(() => {
            if (props.onSuccess)
                props.onSuccess();
        }).catch((e: ApiError) => handleError(e, notificationHandler, authCtx));
    }

    return (
        <Modal onClick={() => props.onCancel()}>
            <ModalContent>
                <Typography gutterBottom variant="h6" component="div" style={{ textAlign: "center" }}>
                    Voulez-vous vraiment supprimer l'employé 
                    <span style={{ color: "var(--color-accent)" }}> {props.employee.first_name} {props.employee.last_name}</span>?
                    <br/>
                    Toutes les heures enregistrées seront supprimées.
                </Typography>
                <div style={{ display: "inline-flex", gap: "1em" }}>
                    <Button variant="outlined" color="success" onClick={() => onDelete()}>Confirmer</Button>
                </div>
                <ModalClose onClick={() => props.onCancel()}></ModalClose>
            </ModalContent>
        </Modal>
    )
}

export default EmployeeDelete