import { faBuilding, faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from 'react'
import AdminActions from 'components/Admin/AdminActions'
import { AdministrationColors } from 'components/Admin/Administration'
import AdminSectionTitle from 'components/Admin/AdminSectionTitle'
import { useNavigate, useParams } from "react-router-dom";
import Card from 'common/card/Card'
import CardHead from 'common/card/CardHead'
import { Button, TextField } from '@mui/material'
import CardBody from 'common/card/CardBody'
import Row from 'common/Row'
import SaveContainer from 'components/Admin/SaveContainer'
import { InputLabelProps } from 'common/DatePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Branch } from 'data/branch'
import { createBranch, getBranch, updateBranch } from 'services/branch_service'
import { NotificationContext } from 'components/Notification'
import BranchDelete from './BranchDelete'
import { useSave } from 'hooks/save_hook'
import { useEdit } from 'hooks/edit_hook'

const BranchPage: React.FC = () => {
    const notificationHandler = useContext(NotificationContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [branch, setBranch] = useEdit<Branch>({
        store: "",
        owner: "",
        address: "",
        phone: "",
    }, getBranch, id);
    const [isDisabled, saveBranch, hasError] = useSave<Branch>({ 
        notificationHandler, 
        id, 
        createHandler: createBranch, 
        updateHandler: updateBranch, 
        onCreate: (b: Branch) => {
            navigate(`/administration/branch/${b.id}`);
        }
    });

    return (
    <div className='admin-container'>
        <AdminActions back="/administration/branches">
            { id !== undefined && 
                <Button variant="outlined" style={{ marginLeft: "1rem" }} onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </Button>
            }
        </AdminActions>
        <AdminSectionTitle color={AdministrationColors.GreenBg} title="Succursale" icon={faBuilding} ></AdminSectionTitle>
        <Card>
            <CardHead style={{ background: AdministrationColors.Green }}></CardHead>
            <CardBody>
                <Row>
                    <TextField 
                        InputLabelProps={InputLabelProps} 
                        label="Magasin" 
                        variant="standard"
                        value={branch.store}
                        disabled={isDisabled}
                        error={hasError("store")}
                        onChange={(e) => setBranch("store", e.target.value)}></TextField>
                    <TextField 
                        InputLabelProps={InputLabelProps} 
                        label="Propriétaire" 
                        variant="standard"
                        value={branch.owner}
                        disabled={isDisabled}
                        error={hasError("owner")}
                        onChange={(e) => setBranch("owner", e.target.value)}></TextField>
                </Row>
                <Row style={{ gridTemplateColumns: "100%" }}>
                    <TextField 
                        InputLabelProps={InputLabelProps} 
                        label="Adresse" 
                        variant="standard"
                        value={branch.address}
                        disabled={isDisabled}
                        error={hasError("address")}
                        onChange={(e) => setBranch("address", e.target.value)}></TextField>
                </Row>
                <Row>
                    <TextField 
                        InputLabelProps={InputLabelProps} 
                        label="Téléphone" 
                        variant="standard"
                        value={branch.phone}
                        disabled={isDisabled}
                        error={hasError("phone")}
                        onChange={(e) => setBranch("phone", e.target.value)}></TextField>
                </Row>
                <SaveContainer disabled={isDisabled} onClick={() => saveBranch(branch)}></SaveContainer> 
            </CardBody>
        </Card>
        { showModal && 
            <BranchDelete 
                branch={branch} 
                onCancel={() => setShowModal(false)}
                onSuccess={() => navigate("/administration/branches")}></BranchDelete>
        }
    </div>
    )
}

export default BranchPage