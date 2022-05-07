import styled from "@emotion/styled"
import React from "react"

const StyledShadow = styled.div`
    box-shadow: 3px 5px 4px var(--color-shadow);
`

const Shadow: React.FC = (props) => {
    return (
        <StyledShadow>
            {props.children}
        </StyledShadow>
    )
}

export default Shadow
