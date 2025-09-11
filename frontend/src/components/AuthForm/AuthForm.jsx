import "./AuthForm.css";

function AuthForm({
  onLogin,
  onRegister,
  loginData,
  registerData,
  onLoginChange,
  onRegisterChange,
  loading,
  passwordError,
  passwordStrength,
  onTabChange,
}) {
  const handleTabClick = (tabName) => {
    document
      .querySelectorAll(".form")
      .forEach((form) => form.classList.remove("active"));
    document
      .querySelectorAll(".tab")
      .forEach((tab) => tab.classList.remove("active"));

    document.getElementById(`${tabName}-form`).classList.add("active");
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
    if (typeof onTabChange === "function") onTabChange();
  };

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
          <div
            className="tab active"
            data-tab="login"
            onClick={() => handleTabClick("login")}
          >
            Iniciar Sesión
          </div>
          <div
            className="tab"
            data-tab="register"
            onClick={() => handleTabClick("register")}
          >
            Registrarse
          </div>
        </div>

        <form id="login-form" className="form active" onSubmit={onLogin}>
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

          <button type="submit" className="btn">
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
            <a
              href="#"
              id="go-to-register"
              onClick={() => handleTabClick("register")}
            >
              Regístrate ahora
            </a>
          </div>
        </form>

        <form
          id="register-form"
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            onRegister(e);
          }}
        >
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

          {passwordStrength && (
            <div
              style={{
                color: passwordStrength.includes("Muy fuerte")
                  ? "green"
                  : passwordStrength.includes("Fuerte")
                  ? "blue"
                  : passwordStrength.includes("Media")
                  ? "orange"
                  : "red",
                fontSize: "12px",
                marginTop: "5px",
              }}
            >
              Fortaleza: {passwordStrength}
            </div>
          )}

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

          {passwordError && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {passwordError}
            </div>
          )}

          <button type="submit" className="btn">
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
            <a
              href="#"
              id="go-to-login"
              onClick={() => handleTabClick("login")}
            >
              Inicia sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
