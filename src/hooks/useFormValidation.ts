import React, { useState } from 'react';

export const useFormValidation = () => {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    loginError: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const setLoginError = (errorMessage: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, loginError: errorMessage }));
  };

  const validateForm = () => {
    const { email, password, fullName } = values;

    const emailError = !email ? 'Поле обязательно для заполнения' : !/\S+@\S+\.\S+/.test(email) ? 'Неверный формат электронной почты' : '';
    const passwordError = !password ? 'Поле обязательно для заполнения' : '';
    const fullNameError = !fullName ? 'Поле обязательно для заполнения' : '';

    setErrors({
      email: emailError,
      password: passwordError,
      fullName: fullNameError,
      loginError: ''
    });

    return !(emailError || passwordError || fullNameError);
  };

  return {
    values,
    errors,
    handleChange,
    validateForm,
    setLoginError
  };
};
