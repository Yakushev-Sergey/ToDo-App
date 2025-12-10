import { useState } from 'react'
import { userService, type User } from '../../User'
import formRegStyle from './registrationForm.module.css'

interface RegistrationFormProps {
  onUserChange: (user: User | null) => void;

}

export const RegistrationForm = ({ onUserChange }: RegistrationFormProps) => {

  // показать или скрыть пароль 
  const [showPassword, setShowPassword] = useState(false)
  // false = регистрация, true = вход
  const [isLogin, setIsLogin] = useState(false);
  // проверка формы 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  // ошибка формы 
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    submit: ''
  })


  // Валидация имени  
  const validateUserName = (username: string): boolean => {
    if (isLogin) return true;
    return username.length > 2;
  }

  // Валидация email
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  // Валидация пароля 
  const validatePassword = (password: string): boolean => {
    return password.length >= 3 && password.length <= 10;
  }

  // Обработчик изменения полей
  const handkeInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Валидация в реальном времени
    let isValid = false;
    switch (field) {
      case 'username':
        isValid = validateUserName(value)
        break;
      case 'email':
        isValid = validateEmail(value)
        break;
      case 'password':
        isValid = validatePassword(value)
        break;
    }
    setErrors(prev => ({
      ...prev,
      [field]: isValid ? '' : 'errors'
    }))
  }
  // Проверка всей формы
  const validateForm = (): boolean => {

    const usernameValid = validateUserName(formData.username);
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);

    setErrors({
      username: usernameValid ? '' : 'errors',
      email: emailValid ? '' : 'errors',
      password: passwordValid ? '' : 'errors',
      submit: ''
    });

    return usernameValid && emailValid && passwordValid;
  }

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return;
    try {
      if (isLogin) {
        // ВХОД
        const user = userService.loginUser(formData.email, formData.password);
        onUserChange(user)
      } else {
        // РЕГИСТРАЦИЯ
        const user = userService.registerUser(
          formData.username,
          formData.email,
          formData.password
        )
        onUserChange(user)
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      }

      setErrors({
        username: '',
        email: '',
        password: '',
        submit: ''
      });

      setErrors(prev => ({ ...prev, submit: '' }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
      }))

      if (error instanceof Error) {
        if (error.message.includes('email') || error.message.includes('email')) {
          setErrors(prev => ({ ...prev, email: 'errors' }))
        }
        if (error.message.includes('Пароль') || error.message.includes('password')) {
          setErrors(prev => ({ ...prev, password: 'errors' }))
        }
      }
    }
  }

  // ПРОВЕРКА СУЩЕСТВУЮЩЕГО EMAIL ПРИ ВВОДЕ
  const handleEmailChange = (value: string) => {
    // handkeInputChange('email', value);
    setFormData(prev => ({
      ...prev,
      email: value
    }));

    const isValid = validateEmail(value);
    setErrors(prev => ({
      ...prev,
      email: isValid ? '' : 'errors'
    }))

    if (isLogin && value.includes('@')) {
      const existingUser = userService.findUserByEmail(value)
      if (existingUser) {
        setErrors(prev => ({
          ...prev,
          email: 'Этот email уже зарегистрирован',
          submit: 'Пользователь с таким email уже существует. Войдите в систему.'
        }))
      }
    }


  }

  // Функция для определения класса поля
  const getFieldClassName = (fieldName: string, baseClass: string) => {
    const hasError = errors[fieldName as keyof typeof errors]
    const hasValue = formData[fieldName as keyof typeof formData]

    if (hasError) {
      return `${baseClass} ${formRegStyle.errors}`
    } else if (hasValue && !hasError) {
      return `${baseClass} ${formRegStyle.valid}`
    }
    return baseClass;
  }

  return (
    <>
      <div className={formRegStyle.RegistrationFormWrapper}>

        <div className={formRegStyle.submitError}>{errors.submit}</div>

        <form className={formRegStyle.form} action="" onSubmit={handleSubmit}>
          <div className={formRegStyle.choice}>
            <span className={formRegStyle.spanChoice} onClick={() => setIsLogin(false)}>
              Резистрация
            </span>
            <span className={formRegStyle.spanChoice} onClick={() => setIsLogin(true)}>
              Вход
            </span>
          </div>

          {!isLogin && (
            <>
              <input className={getFieldClassName('username', formRegStyle.name)}
                type="text"
                placeholder='Введите имя '
                max={20}
                value={formData.username}
                onChange={(e) => handkeInputChange('username', e.target.value)}
              />
            </>
          )}

          <>
            <input className={getFieldClassName('email', formRegStyle.email)}
              type="text"
              placeholder='Ваша почта'
              max={20}
              value={formData.email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </>

          <div className={formRegStyle.passwordWrapper}>
            <input className={getFieldClassName('password', formRegStyle.pasword)}
              type={showPassword ? 'text' : 'password'}
              placeholder='Пароль'
              max={10}
              value={formData.password}
              onChange={(e) => handkeInputChange('password', e.target.value)}
            />
            <button className={formRegStyle.showPassword} type='button' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👀" : "🙈"}
            </button>

          </div>

          <button type="submit" className={formRegStyle.submitButton}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </>
  )
}