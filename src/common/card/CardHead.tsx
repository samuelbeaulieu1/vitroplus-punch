import styled from "@emotion/styled"
import React from "react"

const StyledCardHead = styled.div`
    background-color: var(--color-primary);
    padding: 0.5rem 1rem;
`

export interface CardHeadProps {
    className?: string;
    style?: React.CSSProperties;
}

const CardHead: React.FC<CardHeadProps> = (props) => {
    return (
        <StyledCardHead  className={props.className} style={props.style}>
            {props.children}
        </StyledCardHead>
    )
}

export default CardHead
