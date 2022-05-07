import styled from '@emotion/styled';
import React from 'react'

const StyledColumn = styled.div`
  display: flex;
  align-items: center;
`

export interface ColumnProps {
    style?: any;
    align?: string;
}

const Column: React.FC<ColumnProps> = (props) => {
  return (
    <StyledColumn style={{...props.style, justifyContent: props.align}}>
        {props.children}
    </StyledColumn>
  )
}

export default Column