import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from '@mui/material'
import Card from 'common/card/Card'
import CardBody from 'common/card/CardBody'
import CardHead from 'common/card/CardHead'
import React from 'react'
import { useRef, useState } from 'react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AdministrationTabStyle = {
    tab: {
        position: "relative",
        padding: "2rem",
    },
    tabHover: {
        cursor: "pointer",
        background: "#24303d",
    },
    containerHover: {
        transform: "scale(1.015)",
        transition: "all 0.20s ease-in-out",
    },
    tabText: {
        zIndex: "1",
        fontWeight: "600",
        textAlign: "center",
    },
    tabIcon: {
        position: "absolute",
        fontSize: "72px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "0",
    }
} as any

export interface AdministrationTabProps {
    background: string;
    iconColor: string;
    icon: IconDefinition;
    text: string;
    link: string;
}

const routeToLink = (link: React.MutableRefObject<any>) => {
    if (link.current != null) {
        link.current.click();
    }
}

const AdministrationTab = (props: AdministrationTabProps) => {
    const [isHover, setIsHover] = useState(false);
    const [tabStyle, setTabStyle] = useState({});
    const [containerStyle, setContainerStyle] = useState({});
    const linkRef = useRef(null);
    useEffect(() => {
        if (isHover) {
            setTabStyle({...AdministrationTabStyle.tab, ...AdministrationTabStyle.tabHover});
            setContainerStyle(AdministrationTabStyle.containerHover);
        } else {
            setTabStyle(AdministrationTabStyle.tab);
            setContainerStyle({});
        }
    }, [isHover])

    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={() => routeToLink(linkRef)}>
            <Card style={containerStyle}>
                <CardHead style={{background: props.background}}></CardHead>
                <CardBody style={tabStyle}>
                    <Typography style={AdministrationTabStyle.tabText} gutterBottom variant="h6" component="div">
                        {props.text}
                    </Typography>
                    <div style={AdministrationTabStyle.tabIcon}>
                        <FontAwesomeIcon color={props.iconColor} icon={props.icon}></FontAwesomeIcon>
                    </div>
                </CardBody>
                <Link ref={linkRef} to={props.link}></Link>
            </Card> 
        </div>
    )
}

export default AdministrationTab