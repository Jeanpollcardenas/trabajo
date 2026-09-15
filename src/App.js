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

function Dados() {
  const [caras, setCaras] = useState(6);
  const [cantidad, setCantidad] = useState(1);
  const [resultados, setResultados] = useState([]);

  const lanzarDados = () => {
    const nuevosResultados = Array.from({ length: cantidad }, () => (
      Math.floor(Math.random() * caras) + 1
    ));
    setResultados(nuevosResultados);
  };

  return (
    <section className="tool-card">
      <div className="tool-heading">
        <span className="tool-kicker">Herramienta 02</span>
        <h2>Lanza los dados</h2>
        <p>Elige el tipo y la cantidad de dados para obtener un resultado al instante.</p>
      </div>
      <div className="controls-grid">
        <label>
          Caras del dado
          <select value={caras} onChange={(event) => setCaras(Number(event.target.value))}>
            <option value="4">D4</option>
            <option value="6">D6</option>
            <option value="8">D8</option>
            <option value="10">D10</option>
            <option value="12">D12</option>
            <option value="20">D20</option>
          </select>
        </label>
        <label>
          Cantidad
          <input type="number" min="1" max="10" value={cantidad} onChange={(event) => setCantidad(Math.min(10, Math.max(1, Number(event.target.value) || 1)))} />
        </label>
      </div>
      <button className="tool-button" type="button" onClick={lanzarDados}>Lanzar dados</button>
      <div className="results-panel" aria-live="polite">
        {resultados.length ? resultados.map((resultado, index) => <span className="result-die" key={`${resultado}-${index}`}>{resultado}</span>) : <span className="empty-result">Tus resultados aparecerán aquí</span>}
      </div>
      {resultados.length > 1 && <p className="result-total">Total: <strong>{resultados.reduce((total, resultado) => total + resultado, 0)}</strong></p>}
    </section>
  );
}

function NumerosAleatorios() {
  const [minimo, setMinimo] = useState(1);
  const [maximo, setMaximo] = useState(100);
  const [cantidad, setCantidad] = useState(1);
  const [resultados, setResultados] = useState([]);

  const generarNumeros = () => {
    const limiteInferior = Math.min(minimo, maximo);
    const limiteSuperior = Math.max(minimo, maximo);
    const nuevosResultados = Array.from({ length: cantidad }, () => (
      Math.floor(Math.random() * (limiteSuperior - limiteInferior + 1)) + limiteInferior
    ));
    setResultados(nuevosResultados);
  };

  return (
    <section className="tool-card">
      <div className="tool-heading">
        <span className="tool-kicker">Herramienta 03</span>
        <h2>Genera números</h2>
        <p>Define un rango y crea números aleatorios sin repetir el proceso manualmente.</p>
      </div>
      <div className="controls-grid numbers-controls">
        <label>
          Desde
          <input type="number" value={minimo} onChange={(event) => setMinimo(Number(event.target.value))} />
        </label>
        <label>
          Hasta
          <input type="number" value={maximo} onChange={(event) => setMaximo(Number(event.target.value))} />
        </label>
        <label>
          Cantidad
          <input type="number" min="1" max="20" value={cantidad} onChange={(event) => setCantidad(Math.min(20, Math.max(1, Number(event.target.value) || 1)))} />
        </label>
      </div>
      <button className="tool-button" type="button" onClick={generarNumeros}>Generar números</button>
      <div className="results-panel" aria-live="polite">
        {resultados.length ? resultados.map((resultado, index) => <span className="result-number" key={`${resultado}-${index}`}>{resultado}</span>) : <span className="empty-result">Tus números aparecerán aquí</span>}
      </div>
    </section>
  );
}

function App() {
  const [herramienta, setHerramienta] = useState('registro');

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <span className="brand-mark">AZAR</span>
          <p>Herramientas rápidas para jugar, probar y decidir.</p>
        </div>
        <nav className="tool-nav" aria-label="Herramientas">
          <button className={herramienta === 'registro' ? 'active' : ''} type="button" onClick={() => setHerramienta('registro')}>Registro</button>
          <button className={herramienta === 'dados' ? 'active' : ''} type="button" onClick={() => setHerramienta('dados')}>Dados</button>
          <button className={herramienta === 'numeros' ? 'active' : ''} type="button" onClick={() => setHerramienta('numeros')}>Números aleatorios</button>
        </nav>
      </header>
      {herramienta === 'registro' && <Registro />}
      {herramienta === 'dados' && <Dados />}
      {herramienta === 'numeros' && <NumerosAleatorios />}
    </main>
  );
}

export default App;