import {useState} from 'react';
import './App.css';

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: ""
  }
 
  );

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'contrasena') {
      const score = evaluatePasswordStrength(value);
      setPasswordScore(score);
    }
  }

  const evaluatePasswordStrength = (password) => {
    if (!password) return 0;
    let score = 0;
    const length = password.length;
    if (length >= 8) score += 25;
    if (length >= 12) score += 10;
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    if (score > 100) score = 100;
    return score;
  }

  const getPasswordLabel = (score) => {
    if (score === 0) return '';
    if (score < 30) return 'Muy débil';
    if (score < 50) return 'Débil';
    if (score < 70) return 'Aceptable';
    if (score < 90) return 'Buena';
    return 'Excelente';
  }

  const getPasswordColor = (score) => {
    if (score < 30) return '#e74c3c';
    if (score < 50) return '#e67e22';
    if (score < 70) return '#f1c40f';
    if (score < 90) return '#2ecc71';
    return '#27ae60';
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido";
    }
    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es obligatoria";
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres";
    }
    if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden";
    }
    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      // Aquí puedes enviar los datos del formulario al servidor o realizar otras acciones
    } 
  };

  return (
    <div className="registro-page">
      <h2 className="registro-title">Formulario de Registro</h2>

      <form className="registro-form" onSubmit={handleSubmit}>
        <div className="registro-field">
          <label> Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre}</p>}
        </div>
        <div className="registro-field">
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          {errors.correo && <p style={{ color: 'red' }}>{errors.correo}</p>}
        </div>
        <div className="registro-field">
          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
          />
          {errors.contrasena && <p style={{ color: 'red' }}>{errors.contrasena}</p>}
          <div className="password-strength">
            <div className="strength-bar" aria-hidden>
              <div
                className="strength-fill"
                style={{ width: `${passwordScore}%`, background: getPasswordColor(passwordScore) }}
              />
            </div>
            <div className="strength-label">{getPasswordLabel(passwordScore)}</div>
          </div>
        </div>
        <div className="registro-field">
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmarContrasena"
            value={formData.confirmarContrasena}
            onChange={handleChange}
          />
          {errors.confirmarContrasena && <p style={{ color: 'red' }}>{errors.confirmarContrasena}</p>}
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {success && <p style={{ color: 'green' }}>Registro exitoso!</p>}
    </div>
  );
}

export default Registro;