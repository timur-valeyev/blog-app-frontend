import {Button} from '@material-ui/core'
import React, {useState} from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {RegisterFormSchema} from '../../../utils/validations'
import {FormField} from '../../FormField'
import {registerUser} from "../../../store/slices/authSlice";
import {useAppDispatch} from "../../../store/hooks";

interface RegisterFormProps {
    openRegisterForm: () => void
    openLoginForm: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({openRegisterForm, openLoginForm}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useAppDispatch()

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(RegisterFormSchema)
    })

    const onSubmit = async (data: any) => {
        try {
            dispatch(registerUser(data))
            setErrorMessage('')
        } catch (err: any) {
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }

    return (
            <FormProvider {...form}>
                <form className='register-form' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name='fullName' label='Фамилия Имя' type='text' />
                    <FormField name='email' label='Почта' type='text' />
                    <FormField name='password' label='Пароль' type='password' />
                    <div className='register-form__buttons'>
                        <Button
                            onClick={openRegisterForm}
                            type='submit'
                            color="primary"
                            variant="contained"
                            disabled={!form.formState.isValid}
                        >
                            Загеристрироваться
                        </Button>
                        <Button onClick={openLoginForm} color="primary" variant="text">
                            Войти
                        </Button>
                    </div>
                </form>
            </FormProvider>
    )
}
