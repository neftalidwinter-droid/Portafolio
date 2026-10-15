import { useState } from 'react';
import Card from '../components/common/Card';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { users } from '../data/users';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const handleSubmit = (event) => {
    event.preventDefault(); // evita que la página se recargue
    const found = users.find((u) => u.email === email && u.password === password);
 
    if (found) {
      setError('');
      onLogin(found);
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };
 
  return (
    <div className="login-page">
      <Card title="Iniciar sesión">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Correo"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@escuela.edu"
          />
          <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="****"
          />
          {error && <p className="error">{error}</p>}
          <Button type="submit" fullWidth>
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};
 
export default LoginPage;
