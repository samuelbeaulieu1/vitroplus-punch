import styled from '@emotion/styled';
import React from 'react'

const StyledModal = styled.div`
    display: block;
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.753);
`

export interface ModalProps {
    onClick: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <StyledModal onClick={() => props.onClick()}>
        {props.children}
    </StyledModal>
  )
}

export default Modal