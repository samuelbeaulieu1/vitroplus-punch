import styled from "@emotion/styled"
import React from "react"
import Shadow from "common/Shadow"

const StyledCardBody = styled.div`
    background-color: var(--color-element-background);
    padding: 1rem;
    border-radius: 0rem 0rem 0.15rem 0.15rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-direction: column;
`

export interface CardBodyProps {
    className?: string;
    style?: React.CSSProperties;
}

const CardBody: React.FC<CardBodyProps> = (props) => {
    return (
        <Shadow>
            <StyledCardBody className={props.className} style={props.style}>
                {props.children}
            </StyledCardBody>
        </Shadow>
    )
}

export default CardBody
