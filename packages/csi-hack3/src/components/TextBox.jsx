import { InputAdornment, TextField } from "@mui/material"

export default function TextBox({
    name,
    startIcon,
    endIcon,
    startValue,
    endValue,
    inputText,
    isEditing = true,
    register,
    helperText,
    onTextChange,
    ...rest
}) {
    return (
        <TextField
            name={name}
            margin="none"
            disabled={!isEditing}
            defaultValue={inputText}
            fullWidth
            InputProps={{
                startAdornment: startIcon ? (
                    <InputAdornment position="start">{startIcon}</InputAdornment>
                ) : endValue ? (
                    <InputAdornment position="start">{startValue}</InputAdornment>
                ) : null,
                endAdornment: endIcon ? (
                    <InputAdornment position="end">{endIcon}</InputAdornment>
                ) : endValue ? (
                    <InputAdornment position="end">{endValue}</InputAdornment>
                ) : null
            }}
            {...register(name)}
            onChange={(e) => {
                register(name).onChange(e)
                if (onTextChange) {
                    onTextChange(e)
                }
            }}
            helperText={helperText}
            {...rest}
        />
    )
}
