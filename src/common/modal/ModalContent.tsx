import styled from '@emotion/styled'
import React from 'react'

const StyledModalContent = styled.div`
    background-color: var(--color-element-background);
    min-width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-radius: 0rem 0rem 0.15rem 0.15rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-direction: column;
    border-radius: 4px;
`

export interface ModalContentProps {
    style?: any;
}

const ModalContent: React.FC<ModalContentProps> = (props) => {
    return (
        <StyledModalContent style={props.style} onClick={(e) => e.stopPropagation()}>
            {props.children}
        </StyledModalContent>
    )
}

export default ModalContent