import {Button} from '@material-ui/core'
import React from 'react'

interface MainFormProps {
    openLoginForm: () => void
}

export const MainForm: React.FC<MainFormProps> = ({openLoginForm}) => {
    return (
        <div className='main-form'>
            <Button
                style={{marginBottom: '10px'}}
                fullWidth
                variant="contained"
            >
                google
            </Button>
            <Button
                style={{marginBottom: '10px'}}
                onClick={openLoginForm}
                fullWidth
                variant="contained"
            >
                Войти через почту
            </Button>
        </div>
    )
}
