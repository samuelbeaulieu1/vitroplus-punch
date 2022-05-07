import styled from '@emotion/styled'
import React from 'react'

const StyledTable = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export interface TableProps {
    style?: any;
}

const Table: React.FC<TableProps> = (props) => {
    return (
        <StyledTable style={props.style}>
            {props.children}
        </StyledTable>
    )
}

export default Table