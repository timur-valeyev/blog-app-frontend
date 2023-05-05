import React from 'react'
import {TextField} from '@material-ui/core'

interface FormFieldProps {
  name: string
  label: string
  type: string
}

export const FormField: React.FC<FormFieldProps> = (props) => {
  const {name, label, type} = props

  return (
    <div>
      <TextField
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