import styled from '@emotion/styled'
import React from 'react'

const StyledTableHead = styled.div`
    border-bottom: 2px solid var(--color-secondary);
    background: var(--color-element-background-dark);
    padding: 1rem 0.5rem;
    display: flex;
    gap: 0.5rem;
`

export interface TableHeadProps {
    color?: string;
}

const TableHead: React.FC<TableHeadProps> = (props) => {
  return (
    <StyledTableHead style={props.color && { borderBottom: `2px solid ${props.color}` } as any}>
        {props.children}
    </StyledTableHead>
  )
}

export default TableHead