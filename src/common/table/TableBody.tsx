import styled from '@emotion/styled'
import React from 'react'

const StyledTableBody = styled.div`
    padding-top: 0.5rem;
    display: flex;
    flex-direction: column;
`
export const TableBodyStyle = {
  tableRow: { 
      padding: "0", 
      margin: "0",
      gap: "0",
  },
  bodyRow: {
      background: "var(--color-element-background)",
      padding: "0.5rem",
      marginBottom: "0.25rem",
  }
} as any

const TableBody: React.FC = (props) => {
  return (
    <StyledTableBody>
        {props.children}
    </StyledTableBody>
  )
}

export default TableBody