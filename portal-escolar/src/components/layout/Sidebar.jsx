const Sidebar = ({ items, activeItem, onSelect }) => {
  return (
    <aside className="sidebar">
      <ul>
        {items.map((item) => (
          <li key={item}>
            <button
              className={item === activeItem ? 'active' : ''}
              onClick={() => onSelect(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
 
export default Sidebar;
