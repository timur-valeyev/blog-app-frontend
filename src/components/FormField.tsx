import React from 'react'
import {TextField} from '@material-ui/core'
import {useFormContext} from 'react-hook-form'

interface FormFieldProps {
    name: string
    label: string
    type: string
}

export const FormField: React.FC<FormFieldProps> = (props) => {
    const {name, label, type} = props
    const {register, formState} = useFormContext()

    return (
        <div>
            <TextField
                {...register(name)}
                error={!!formState.errors[name]?.message}
                // helperText={formState.errors[name]?.message}
                className="mb-20"
                size="small"
                label={label}
                name={name}
                type={type}
                variant="outlined"
                fullWidth
            />
        </div>
    )
}