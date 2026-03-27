import { type NavigationItem } from '../navigation.config';
import './Navigation.css';

interface NavigationProps {
  items: NavigationItem[];
  onItemSelect: (item: NavigationItem) => void;
}

interface NavigationNodeProps {
  item: NavigationItem;
  level: number;
  onItemSelect: (item: NavigationItem) => void;
}

const NavigationNode = ({ item, level, onItemSelect }: NavigationNodeProps) => {
  const hasChildren = Boolean(item.children?.length);

  return (
    <li
      className={`navigation__item navigation__item--level-${level} ${
        hasChildren ? 'navigation__item--has-children' : ''
      }`}
    >
      <button type="button" className="navigation__link navigation__link--button" onClick={() => onItemSelect(item)}>
        {item.label}
      </button>

      {hasChildren && (
        <ul className="navigation__submenu" role="menu">
          {item.children?.map(child => (
            <NavigationNode
              key={`${item.label}-${child.label}`}
              item={child}
              level={level + 1}
              onItemSelect={onItemSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const Navigation = ({ items, onItemSelect }: NavigationProps) => {
  return (
    <nav className="navigation" aria-label="Header menu">
      <ul className="navigation__list">
        {items.map(item => (
          <NavigationNode key={item.label} item={item} level={0} onItemSelect={onItemSelect} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
