import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you can add the API call to register the user
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Senha é obrigatória',
              minLength: {
                value: 6,
                message: 'A senha deve ter pelo menos 6 caracteres',
              },
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirmação de senha é obrigatória',
              validate: (value, formValues) =>
                value === formValues.password || 'As senhas não coincidem',
            })}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};


export default Register;
