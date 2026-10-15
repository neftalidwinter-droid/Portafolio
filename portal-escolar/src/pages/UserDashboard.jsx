import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import StatCard from '../components/dashboard/StatCard';
import DataTable from '../components/dashboard/DataTable';
import { courses } from '../data/users';

const menuItems = ['Inicio', 'Mis cursos', 'Mi perfil'];
 
const courseColumns = [
  { key: 'name', header: 'Curso' },
  { key: 'progress', header: 'Avance (%)' },
];
 
const UserDashboard = ({ user, onLogout }) => {
  const [section, setSection] = useState('Inicio');
  const total = courses.reduce((sum, c) => sum + c.progress, 0);
  const average = Math.round(total / courses.length);
 
  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      menuItems={menuItems}
      activeItem={section}
      onSelect={setSection}
    >
      <h2>Bienvenido, {user.name}</h2>
 
      {section === 'Inicio' && (
        <div className="stats-grid">
          <StatCard label="Cursos inscritos" value={courses.length} color="blue" />
          <StatCard label="Avance promedio" value={`${average}%`} color="green" />
        </div>
      )}
 
      {section === 'Mis cursos' && (
        <Card title="Mis cursos">
          <DataTable columns={courseColumns} rows={courses} />
        </Card>
      )}
 
      {section === 'Mi perfil' && (
        <Card title="Mi perfil">
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Correo:</strong> {user.email}</p>
          <p><strong>Rol:</strong> Usuario registrado</p>
        </Card>
      )}
    </DashboardLayout>
  );
};
 
export default UserDashboard;