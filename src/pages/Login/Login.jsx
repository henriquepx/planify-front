import './Login.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Login</h1>
            <p className="login-description">Coloque suas informações para fazer login.</p>
          </div>
          <form className="login-form">
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <div  className="password-input-container">
                    <input type="email" id="email" className="form-input" placeholder="seuemail@example.com" />
                </div>
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
