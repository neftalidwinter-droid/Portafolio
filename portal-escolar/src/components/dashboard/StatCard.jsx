const StatCard = ({ label, value, color = 'blue' }) => {
  return (
    <div className={`stat-card stat-${color}`}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};
 
export default StatCard;
