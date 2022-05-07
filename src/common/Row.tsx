import styled from '@emotion/styled'
import React from 'react'

const StyledRow = styled.div`
    width: 100%;
    grid-gap: 5rem;
    margin-bottom: 1rem;
    padding-left: 5rem;
    padding-right: 5rem;
    display: grid;
    grid-template-columns: calc(50% - 2.5rem) calc(50% - 2.5rem);

    @media (max-width: 800px) {
        grid-template-columns: 100%;
        margin-bottom: 0rem;
        grid-gap: 0rem;
        padding-left: 2rem;
        padding-right: 2rem;
    }
`

export interface RowProps {
    style?: any;
}

const Row: React.FC<RowProps> = (props) => {
  return (
    <StyledRow style={props.style}>
        {props.children}
    </StyledRow>
  )
}

export default Row