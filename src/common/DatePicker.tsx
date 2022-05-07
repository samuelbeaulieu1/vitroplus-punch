import { DesktopDatePicker } from '@mui/lab'
import { TextField } from '@mui/material'

export const InputLabelProps = {
    style: {
        color: "var(--color-secondary)",
    }
}

export interface DatePickerProps {
    label: string;
    onChange: (value: any) => void;
    value: string;
    style?: any;
}

const DatePicker = (props: DatePickerProps) => {
    return (
        <DesktopDatePicker 
            value={props.value}
            onChange={(value) => props.onChange(value)}
            label={props.label} 
            renderInput={
                (params) => (
                    <TextField 
                        {...params} 
                        style={{ marginBottom: "0.5rem", ...props.style }} 
                        variant="standard" 
                        InputLabelProps={InputLabelProps}/>
                )
            } />
    )
}

export default DatePicker