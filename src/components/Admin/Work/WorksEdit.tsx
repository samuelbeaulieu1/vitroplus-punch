import { Button, TextField, Typography } from '@mui/material'
import Row from 'common/Row'
import { AdministrationColors } from 'components/Admin/Administration'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Column from 'common/Column'
import TableBody, { TableBodyStyle } from 'common/table/TableBody'
import TableHead from 'common/table/TableHead'
import Table from 'common/table/Table'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Clock } from 'data/clock';
import { WorksEditContext } from 'data/work_edit_context'
import { useEditClocks } from 'hooks/clocks_edit_hook'
import { useContext } from 'react'
import { NotificationContext } from 'components/Notification'

const WorksEditStyle = {
    tableRow: {
        gridTemplateColumns: "10% 30% 40% auto",
    },
    btn: {
        border: `1px solid ${AdministrationColors.Pink}`, 
        color: AdministrationColors.Pink
    },
    worksTitle: {
        width: "100%",
        display: "flex", 
        padding: "0", 
        alignItems: "flex-start", 
        gap: "1rem", 
        marginTop: "2rem", 
        marginBottom: "1rem"
    },
    in: {
        color: "var(--color-success)"
    },
    out: {
        color: "var(--color-error)"
    },
} as any

export interface WorksEditProps {
    context: WorksEditContext;
}

const WorksEdit = (props: WorksEditProps) => {
    const notificationHandler = useContext(NotificationContext);
    const editHook = useEditClocks(props, notificationHandler);

    return (
        <>
            <div style={WorksEditStyle.worksTitle}>
                <Button variant="outlined" onClick={() => editHook.saveClocks()}>
                    Sauvegarder
                </Button>
                { !editHook.modified &&
                    <Typography variant="h6">
                        Durée: {editHook.metadata?.total_time}                    
                    </Typography>
                }
            </div>
            <Table>
                <TableHead color={AdministrationColors.Pink}>
                    <Row style={{...TableBodyStyle.tableRow, ...WorksEditStyle.tableRow}}>
                        <Column></Column>
                        <Column>Heure</Column>
                        <Column>Entrée/Sortie</Column>
                        <Column align='flex-end'>
                            <Button variant="outlined" style={WorksEditStyle.btn} onClick={() => editHook.addClockEntry()}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </Button>
                        </Column>
                    </Row>
                </TableHead>
                <TableBody>
                    { editHook.clocks.length > 0 ? (
                        <>
                            { editHook.clocks.map((c: Clock, i: number) => 
                                <Row key={i} style={{...TableBodyStyle.tableRow, ...TableBodyStyle.bodyRow, ...WorksEditStyle.tableRow}}>
                                    <Column></Column>
                                    <Column>
                                        <TextField 
                                            type="time"
                                            value={c.date.format("HH:mm")}
                                            onChange={(e) => editHook.editClockEntry(e.target.value, i)}
                                            onBlur={() => editHook.sortClocks()}
                                            variant="standard"/>
                                    </Column>
                                    <Column>
                                        { i % 2 === 0 ? (
                                        <span style={WorksEditStyle.in}>Entrée</span> 
                                        ):(
                                            <span style={WorksEditStyle.out}>Sortie</span>
                                        )}
                                    </Column>
                                    <Column align='flex-end'>
                                        <Button variant="outlined" onClick={() => editHook.deleteClockEntry(i)}>
                                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                        </Button>
                                    </Column>
                                </Row>
                            )}
                        </>
                    ):(
                        <span style={{ textAlign: "center" }}>Aucune entrée</span>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default WorksEdit