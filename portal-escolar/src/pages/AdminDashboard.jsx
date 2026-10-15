import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import StatCard from '../components/dashboard/StatCard';
import DataTable from '../components/dashboard/DataTable';
import { users, courses } from '../data/users';

const menuItems = ['Resumen', 'Usuarios', 'Cursos'];

const userColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Nombre' },
  { key: 'email', header: 'Correo' },
  { key: 'role', header: 'Rol' },
];
 
const courseColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Curso' },
  { key: 'progress', header: 'Avance (%)' },
];
 
const AdminDashboard = ({ user, onLogout }) => {
  const [section, setSection] = useState('Resumen');
  const totalAdmins = users.filter((u) => u.role === 'admin').length;
 
  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      menuItems={menuItems}
      activeItem={section}
      onSelect={setSection}
    >
      <h2>Panel de Administración</h2>
 
      {section === 'Resumen' && (
        <div className="stats-grid">
          <StatCard label="Usuarios registrados" value={users.length} color="blue" />
          <StatCard label="Administradores" value={totalAdmins} color="purple" />
          <StatCard label="Cursos activos" value={courses.length} color="green" />
        </div>
      )}
 
      {section === 'Usuarios' && (
        <Card title="Lista de usuarios">
          <DataTable columns={userColumns} rows={users} />
        </Card>
      )}
 
      {section === 'Cursos' && (
        <Card title="Cursos">
          <DataTable columns={courseColumns} rows={courses} />
        </Card>
      )}
    </DashboardLayout>
  );
};
 
export default AdminDashboard;
