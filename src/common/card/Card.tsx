import styled from "@emotion/styled";
import React from "react"

const StyledCard = styled.div`
    width: 100%;
    height: 100%;
`

export interface CardProps {
    className?: string;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <StyledCard className={props.className} style={props.style}>
            {props.children}
        </StyledCard>
    )
}

export default Card
