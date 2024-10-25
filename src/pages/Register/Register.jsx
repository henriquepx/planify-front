import './Register.css';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(3, "A senha deve ter pelo menos 3 caracteres"),
  confirmPassword: z.string().min(3, "A confirmação de senha deve ter pelo menos 3 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      console.log('Cadastro efetuado');
  
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Cadastrar-se</h1>
            <p className="register-description">Preencha suas informações para criar uma conta.</p>
          </div>
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nome</label>
              <input type="text" id="name" className="form-input" placeholder="Seu Nome" {...register('name')} />
              {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-input" placeholder="seuemail@example.com" {...register('email')} />
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
                {errors.password && <p className="error-message">{errors.password.message}</p>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password" className="form-label">Confirmar Senha</label>
              <div className="password-input-container">
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  id="confirm-password"
                  className="form-input"
                  placeholder="********"
                  {...register('confirmPassword')}
                />
                <FontAwesomeIcon
                  icon={isConfirmPasswordVisible ? faEye : faEyeSlash}
                  className="password-toggle-icon"
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
              </div>
            </div>
            <button type="submit" className="form-input" style={{ cursor: 'pointer', backgroundColor: '#007bff', color: 'white' }}>Cadastrar</button>
          </form>
          <div className="register-footer">
            <p className="register-footer-text">
              Já possui uma conta? <a href="/" className="register-link">Login</a>
            </p>
          </div>
        </div>
      </div>
      <div className="register-background"></div>
    </div>
  );
};

export default Register;
