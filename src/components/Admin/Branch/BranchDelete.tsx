import { Typography, Button } from '@mui/material';
import Modal from 'common/modal/Modal';
import ModalContent from 'common/modal/ModalContent';
import { AuthenticationContext } from 'components/Authentication';
import { NotificationContext } from 'components/Notification';
import { Branch } from 'data/branch';
import { useContext } from 'react';
import { ApiError } from 'data/api_error';
import { handleError } from 'services/api';
import { deleteBranch } from 'services/branch_service';
import ModalClose from 'common/modal/ModalClose';

export interface BranchDeleteProps {
    branch: Branch;
    onSuccess?: () => void;
    onCancel: () => void;
}

const BranchDelete = (props: BranchDeleteProps) => {
    const authCtx = useContext(AuthenticationContext);
    const notificationHandler = useContext(NotificationContext);

    function onDelete() {
        deleteBranch(authCtx, props.branch.id as string).then(() => {
            if (props.onSuccess)
                props.onSuccess();
        }).catch((e: ApiError) => handleError(e, notificationHandler, authCtx));
    }

    return (
        <Modal onClick={() => props.onCancel()}>
            <ModalContent>
                <Typography gutterBottom variant="h6" component="div" style={{ textAlign: "center" }}>
                    Voulez-vous vraiment supprimer la succursale 
                    <span style={{ color: "var(--color-accent)" }}> {props.branch.store}</span>?
                </Typography>
                <div style={{ display: "inline-flex", gap: "1em" }}>
                    <Button variant="outlined" color="success" onClick={() => onDelete()}>Confirmer</Button>
                </div>
                <ModalClose onClick={() => props.onCancel()}></ModalClose>
            </ModalContent>
        </Modal>
    )
}

export default BranchDelete