import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import 'styles/nav.css';
import logo from 'assets/images/vitroplus.png';
import React, { useContext } from 'react';
import { AuthenticationContext } from './Authentication';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authCtx = useContext(AuthenticationContext);

    const connect = () => {
        if (authCtx.session === null) {
            authCtx.connect(() => {
                navigate("/administration");
            });
        } else {
            navigate("/administration");
        }
    }

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src={logo} alt="Vitroplus" />
            </Link>
            <ul>
                { !location.pathname.includes("administration") ? (
                    <li>
                        <Button variant="contained" className="icon-btn" onClick={() => connect()}>
                            <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                        </Button>
                    </li>):(
                    <li>
                        <Link to={"/"} className="link">
                            <Button variant="outlined" className="icon-btn" color="warning" onClick={() => authCtx.disconnect()}>
                                <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                            </Button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
