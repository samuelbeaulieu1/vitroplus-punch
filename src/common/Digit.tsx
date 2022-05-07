import React from "react"

export interface DigitProps {
    showDigit?: boolean;
    digit: string;
    childRef: React.RefObject<HTMLInputElement>;
    onChange: (value: string) => void;
    onBack: () => void;
}

const Digit = (props: DigitProps) => {
    return (
        <input 
            value={props.digit}
            ref={props.childRef}
            onKeyDown={(e) => {
                if (e.key === "Backspace") {
                    e.preventDefault();
                    props.onBack();
                }
            }}
            onInput={(e) => {
                props.onChange(e.currentTarget.value);
            }}
            type={props.showDigit ? "text":"password"} 
            className="digit"/>
    )
}

export default Digit
