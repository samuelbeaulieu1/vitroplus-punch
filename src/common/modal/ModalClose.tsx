import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import React from 'react'

const ModalCloseStyle = {
    close: {
        position: "absolute",
        top: "-1rem",
        right: "-1rem",
    }
} as any;

export interface ModalCloseProps {
    onClick: () => void;
}

const ModalClose: React.FC<ModalCloseProps> = (props) => {
    return (
        <IconButton 
            color="error"
            style={ModalCloseStyle.close} 
            onClick={() => props.onClick()}>
                <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
        </IconButton>
    )
}

export default ModalClose