import "./AuthForm.css";

function AuthForm({
  onLogin,
  onRegister,
  loginData,
  registerData,
  onLoginChange,
  onRegisterChange,
  loading,
}) {
  return (
    <div className="container">
      <div className="illustration">
        <i
          className="fas fa-chart-line"
          style={{ fontSize: "80px", marginBottom: "20px" }}
        ></i>
        <h2>Potencia tu Marketing Digital</h2>
        <p>
          Accede a herramientas avanzadas para analizar, optimizar y hacer
          crecer tu negocio en línea.
        </p>
      </div>

      <div className="form-container">
        <div className="tabs">
          <div className="tab active" data-tab="login">
            Iniciar Sesión
          </div>
          <div className="tab" data-tab="register">
            Registrarse
          </div>
        </div>

        <form id="login-form" className="form active">
          <h2 className="form-title">Bienvenido de nuevo</h2>
          <p className="form-subtitle">Ingresa a tu cuenta para continuar</p>

          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              name="email"
              value={loginData.email}
              onChange={onLoginChange}
            />
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Contraseña"
              required
              name="password"
              value={loginData.password}
              onChange={onLoginChange}
            />
          </div>

          <div className="remember-forgot">
            <label className="remember">
              <input type="checkbox" /> Recordarme
            </label>
            <a href="#" className="forgot">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="btn" onClick={onLogin}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          <div className="divider">
            <span>O continúa con</span>
          </div>

          <div className="social-login">
            <div className="social-btn google">
              <i className="fab fa-google"></i>
            </div>
            <div className="social-btn facebook">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="social-btn twitter">
              <i className="fab fa-twitter"></i>
            </div>
          </div>

          <div className="form-footer">
            ¿No tienes una cuenta?{" "}
            <a href="#" id="go-to-register">
              Regístrate ahora
            </a>
          </div>
        </form>

        <form id="register-form" className="form">
          <h2 className="form-title">Crear una cuenta</h2>
          <p className="form-subtitle">Completa tus datos para registrarte</p>

          <div className="name-fields">
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Nombre"
                required
                name="name"
                value={registerData.name}
                onChange={onRegisterChange}
              />
            </div>

            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Apellido"
                required
                name="lastName"
                value={registerData.lastName}
                onChange={onRegisterChange}
              />
            </div>
          </div>

          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              name="email"
              value={registerData.email}
              onChange={onRegisterChange}
            />
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Contraseña"
              required
              name="password"
              value={registerData.password}
              onChange={onRegisterChange}
            />
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              required
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={onRegisterChange}
            />
          </div>

          <button type="submit" className="btn" onClick={onRegister}>
            {loading ? "Registrando..." : "Crear Cuenta"}
          </button>

          <div className="divider">
            <span>O regístrate con</span>
          </div>

          <div className="social-login">
            <div className="social-btn google">
              <i className="fab fa-google"></i>
            </div>
            <div className="social-btn facebook">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="social-btn twitter">
              <i className="fab fa-twitter"></i>
            </div>
          </div>

          <div className="form-footer">
            ¿Ya tienes una cuenta?{" "}
            <a href="#" id="go-to-login">
              Inicia sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
