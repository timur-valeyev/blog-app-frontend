import React from 'react'
import {Button} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {LoginFormSchema} from '../../../utils/validations'
import {FormField} from '../../FormField'

interface LoginFormProps {
    openRegisterForm: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({openRegisterForm}) => {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginFormSchema)
    })
    const onSubmit = (data: any) => console.log(data)

    return (
            <FormProvider {...form}>
                <form className="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name="email" label="почта" type="text"/>
                    <FormField name="password" label="пароль" type="password"/>
                    <div className="login-form__buttons">
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={!form.formState.isValid}
                        >
                            Войти
                        </Button>
                        <Button onClick={openRegisterForm} color="primary" variant="text">
                            Регистрация
                        </Button>
                    </div>
                </form>
            </FormProvider>
    )
}
