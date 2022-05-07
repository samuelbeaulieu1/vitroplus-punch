import { Button } from '@mui/material';
import Row from 'common/Row';

const SaveContainerStyle = {
    saveContainer: {
        gridTemplateColumns: "auto", 
        marginBottom: "0",
        justifyContent: "center"
    }
} as any

export interface SaveContainerProps {
    onClick?: () => void;
    disabled?: boolean;
}

const SaveContainer = (props: SaveContainerProps) => {
    return (
        <Row style={SaveContainerStyle.saveContainer}>
            <Button disabled={props.disabled} style={{ width: "fit-content" }} variant="outlined" onClick={props.onClick}>
                Sauvegarder
            </Button>
        </Row>
    );
}

export default SaveContainer