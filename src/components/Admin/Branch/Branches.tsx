import { faBuilding, faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import Row from 'common/Row'
import Column from 'common/Column'
import Table from 'common/table/Table'
import TableBody, { TableBodyStyle } from 'common/table/TableBody'
import TableHead from 'common/table/TableHead'
import React, { useContext, useEffect, useState } from 'react'
import AdminActions from 'components/Admin/AdminActions'
import { AdministrationColors } from 'components/Admin/Administration'
import AdminSectionTitle from 'components/Admin/AdminSectionTitle'
import { Link } from 'react-router-dom'
import { Branch } from 'data/branch'
import { getBranches } from 'services/branch_service'
import BranchDelete from './BranchDelete'
import { AuthenticationContext } from 'components/Authentication'
import { handleError } from 'services/api'
import styled from '@emotion/styled'

const StyledData = styled.div`
    @media (max-width: 800px) {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 75px;
    }
`

const BranchesStyle = {
    tableRow: {
        gridTemplateColumns: "max(80px, 10%) 25% 30% auto",
    },
    btn: {
        border: `1px solid ${AdministrationColors.Green}`, 
        color: AdministrationColors.Green
    }
} as any

function removeBranch(branch: Branch, setBranches: React.Dispatch<React.SetStateAction<Branch[]>>) {
    setBranches((branches: Branch[]) => {
        const newBranches: Branch[] = [];
        branches.forEach((e: Branch) => {
            if (e.id !== branch.id) {
                newBranches.push(e);
            }
        });

        return newBranches;
    });
}

const Branches: React.FC = () => {
    const authCtx = useContext(AuthenticationContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [branches, setBranches] = useState<Branch[]>([]);
    useEffect(() => {
        getBranches(authCtx).then((branches: Branch[]) => {
            setBranches(branches);
        }).catch(e => handleError(e, null, authCtx));
    }, [authCtx]);

    return (
    <div className='admin-container'>
        <AdminActions></AdminActions>
        <AdminSectionTitle color={AdministrationColors.GreenBg} title="Administration des succursales" icon={faBuilding} ></AdminSectionTitle>
        <Table>
            <TableHead color={AdministrationColors.Green}>
                <Row style={{...TableBodyStyle.tableRow, ...BranchesStyle.tableRow}}>
                    <Column></Column>
                    <Column>Magasin</Column>
                    <Column>Propriétaire</Column>
                    <Column align='flex-end'>
                        <Link to="/administration/branch">
                            <Button variant="outlined" style={BranchesStyle.btn}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </Button>
                        </Link>
                    </Column>
                </Row>
            </TableHead>
            <TableBody>
                { branches.map((branch: Branch) =>
                    <Row key={branch.id} style={{...TableBodyStyle.tableRow, ...TableBodyStyle.bodyRow, ...BranchesStyle.tableRow}}>
                        <Column>
                            <Link to={`/administration/branch/${branch.id}`}>
                                <Button variant="outlined" style={BranchesStyle.btn}>
                                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                </Button>
                            </Link>
                        </Column>
                        <Column>
                            <StyledData>
                                {branch.store}
                            </StyledData>
                        </Column>
                        <Column>
                            <StyledData>
                                {branch.owner}
                            </StyledData>
                        </Column>
                        <Column align='flex-end'>
                            <Button variant="outlined" onClick={() => {
                                    setSelectedBranch(branch);
                                    setShowModal(true);
                                }}>
                                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                            </Button>
                        </Column>
                    </Row>
                )}
            </TableBody>
        </Table>
        { showModal && selectedBranch != null &&  
            <BranchDelete 
                branch={selectedBranch} 
                onCancel={() => setShowModal(false)}
                onSuccess={() => {
                    setShowModal(false);
                    removeBranch(selectedBranch, setBranches);
                }}></BranchDelete>
        }
    </div>
    )
}

export default Branches