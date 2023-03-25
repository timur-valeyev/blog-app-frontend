import {Button} from '@material-ui/core'
import React from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {RegisterFormSchema} from '../../../utils/validations'
import {FormField} from '../../FormField'

interface RegisterFormProps {
    openRegisterForm: () => void
    openLoginForm: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({openRegisterForm, openLoginForm}) => {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(RegisterFormSchema)
    })
    const onSubmit = (data: any) => console.log(data)

    return (
            <FormProvider {...form}>
                <form className='register-form' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name='fullname' label='Фамилия Имя' type='text' />
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
