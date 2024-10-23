import './Login.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(3, "A senha deve ter pelo menos 3 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});
const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('*', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      console.log('Login efetuado');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Login</h1>
            <p className="login-description">Coloque suas informações para fazer login.</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <div  className="password-input-container">
                    <input type="email" id="email" className="form-input" placeholder="seuemail@example.com" {...register('password')} />
              </div>
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Senha</label>
              <div className="password-input-container">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  className="form-input"
                  placeholder="********"
                  {...register('password')}
                />
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                  className="password-toggle-icon"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              </div>
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <button type="submit" className="login-button">Entrar</button>
          </form>
          <div className="login-footer">
            <p className="login-footer-text">
              Ainda não possui uma conta? <a href="/register" className="login-link">Cadastrar-se</a>
            </p>
          </div>
        </div>
      </div>
      <div className="login-background"></div>
    </div>
  );
};

export default Login;
