import './Register.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Cadastrar-se</h1>
            <p className="register-description">Preencha suas informações para criar uma conta.</p>
          </div>
          <form className="register-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nome</label>
              <input type="text" id="name" className="form-input" placeholder="Seu Nome" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-input" placeholder="seuemail@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Senha</label>
              <div className="password-input-container">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  className="form-input"
                  placeholder="********"
                />
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                  className="password-toggle-icon"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
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
                />
                <FontAwesomeIcon
                  icon={isConfirmPasswordVisible ? faEye : faEyeSlash}
                  className="password-toggle-icon"
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                />
              </div>
            </div>
            <button type="submit" className="register-button">Cadastrar</button>
          </form>
          <div className="register-footer">
            <p className="register-footer-text">
              Já possui uma conta? <a href="/login" className="register-link">Login</a>
            </p>
          </div>
        </div>
      </div>
      <div className="register-background"></div>
    </div>
  );
};

export default Register;
