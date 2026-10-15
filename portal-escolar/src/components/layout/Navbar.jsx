import Button from '../common/Button';

const Navbar = ({ user, onLogout }) => {
  const roleLabel = user.role === 'admin' ? 'Administrador' : 'Usuario';
 
  return (
    <header className="navbar">
      <span className="navbar-brand">Portal Escolar</span>
      <div className="navbar-user">
        <span>{user.name} ({roleLabel})</span>
        <Button variant="secondary" onClick={onLogout}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};
 
export default Navbar;
