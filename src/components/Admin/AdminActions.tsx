import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

const AdminActionsStyle = {
    actionsContainer: {
        width: "100%", 
        borderBottom: "2px solid var(--color-secondary)", 
        marginBottom: "1rem", 
        display: "inline-flex",
        paddingBottom: "0.5rem",
    }
} as any

export interface AdminActionsProps {
    back?: string;
}

const AdminActions: React.FC<AdminActionsProps> = (props) => {
  return (
    <div style={AdminActionsStyle.actionsContainer}>
        <Link to={props.back ? props.back:"/administration"}>
            <IconButton color="secondary">
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
            </IconButton>
        </Link>
        {props.children}
    </div>
  )
}

export default AdminActions