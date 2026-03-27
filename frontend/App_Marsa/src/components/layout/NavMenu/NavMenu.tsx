import './NavMenu.css';

export interface NavItem {
  label: string;
  href: string;
}

interface NavMenuProps {
  items: NavItem[];
  onClose: () => void;
}

const NavMenu = ({ items, onClose }: NavMenuProps) => (
  <ul className="nav-menu" role="menu">
    {items.map(({ label, href }) => (
      <li key={label} role="none">
        <a href={href} className="nav-menu__item" role="menuitem" onClick={onClose}>
          {label}
        </a>
      </li>
    ))}
  </ul>
);

export default NavMenu;
