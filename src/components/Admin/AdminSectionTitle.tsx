import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import React from 'react';

export interface AdminSectionTitleProps {
    title: string;
    color: string;
    icon: IconDefinition;
}

const AdminSectionTitle: React.FC<AdminSectionTitleProps> = (props) => {
  return (
    <Typography gutterBottom variant="h5" component="div" color="text.primary">
        <FontAwesomeIcon icon={props.icon} style={{marginRight: "1rem"}} color={props.color}></FontAwesomeIcon>
        {props.title}
        {props.children}
    </Typography>
  )
}

export default AdminSectionTitle