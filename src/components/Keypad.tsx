import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useEffect, useMemo, useContext } from "react"
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@mui/material"
import Digit from "common/Digit"
import 'styles/keypad.css';
import { PinContext, PinContextInterface } from "./Home";

export interface KeypadProps {
    onSend: () => void;
}

const onChange = (value: string, index: number, setPin: any) => {
    setPin((pin: string[]) => {
        const newPin = [...pin];
        newPin[index] = value[value.length - 1];
        return newPin
    });
};

const back = (setPin: any) => {
    setPin((pin: string[]) => {
        const newPin = [...pin];
        let index = newPin.indexOf("");
        index = index === -1 ? pin.length:index;
        newPin[Math.max(index - 1, 0)] = "";
        return newPin;
    });
};

const getFocusIndex = (pin: string[]) => {
    let index = pin.indexOf("");
    return index === -1 ? 3:index;
}

const Keypad = (props: KeypadProps) => {
    const [showPin, setShowPin] = useState(false);
    const {pin, setPin} = useContext(PinContext) as PinContextInterface;
    const digitsRef = useMemo<React.RefObject<HTMLInputElement>[]>(() => pin.map(() => React.createRef<HTMLInputElement>()), [pin]);

    useEffect(() => {
        return () => {
            document.onkeydown = null;
        }
    }, []);
    useEffect(() => {
        const index = getFocusIndex(pin);
        const ref = digitsRef[index];
        if (ref.current !== null) {
            ref.current.focus();

            ref.current.onkeydown = (e) => {
                if (e.key === "Enter") {
                    props.onSend();
                }
            }
        }
    }, [pin, digitsRef, props]);

    return (
        <div className="digits-container">
            <div className="digits">
                {pin.map((digit, index) => (
                    <Digit 
                        key={index}
                        childRef={digitsRef[index]}
                        digit={digit} 
                        onBack={() => back(setPin)}
                        onChange={(value: string) => onChange(value, index, setPin)} 
                        showDigit={showPin}></Digit>
                ))}
            </div>
            <Button className="icon" color="secondary" variant="outlined" onClick={() => setShowPin(!showPin)}>
                <FontAwesomeIcon icon={showPin ? faEyeSlash:faEye}></FontAwesomeIcon>
            </Button>
        </div>
    )
}

export default Keypad
