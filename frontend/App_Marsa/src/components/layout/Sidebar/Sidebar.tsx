import './Sidebar.css';
import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DEFAULT_CRANE_ID } from '../../../config/cranesConfig';
import { resolveSidebarTo, type SidebarItem } from '../../../navigation/sidebarConfig';

interface SidebarProps {
  isOpen: boolean;
  items: SidebarItem[];
  onClose: () => void;
}

type OpenByLevel = Record<number, string | null>;

const resolveTo = (item: SidebarItem, currentCraneId: string): string | null => {
  if (!item.to) return null;
  return resolveSidebarTo(item.to, currentCraneId);
};

const findActiveChain = (
  items: SidebarItem[],
  pathname: string,
  currentCraneId: string,
): string[] => {
  for (const item of items) {
    const to = resolveTo(item, currentCraneId);
    const selfMatches = to ? pathname === to || pathname.startsWith(`${to}/`) : false;
    const childChain = item.children ? findActiveChain(item.children, pathname, currentCraneId) : [];

    if (selfMatches || childChain.length) {
      return [item.id, ...childChain];
    }
  }

  return [];
};

interface SidebarNodeProps {
  item: SidebarItem;
  level: number;
  openByLevel: OpenByLevel;
  setOpenByLevel: (updater: (previous: OpenByLevel) => OpenByLevel) => void;
  currentCraneId: string;
  pathname: string;
  onClose: () => void;
}

const SidebarNode = ({
  item,
  level,
  openByLevel,
  setOpenByLevel,
  currentCraneId,
  pathname,
  onClose,
}: SidebarNodeProps) => {
  const navigate = useNavigate();
  const hasChildren = Boolean(item.children?.length);
  const to = resolveTo(item, currentCraneId);
  const isActive = Boolean(to && (pathname === to || pathname.startsWith(`${to}/`)));

  const isOpen = openByLevel[level] === item.id;
  const Icon = item.icon;

  if (!hasChildren && to) {
    return (
      <li>
        <NavLink
          to={to}
          className={({ isActive: isNavActive }) =>
            `sidebar__link ${isNavActive ? 'sidebar__link--active' : ''}`
          }
          onClick={() => onClose()}
        >
          {Icon ? <Icon size={18} className="sidebar__icon" /> : null}
          <span className="sidebar__label">{item.label}</span>
        </NavLink>
      </li>
    );
  }

  const childChain = item.children ? findActiveChain(item.children, pathname, currentCraneId) : [];
  const hasActiveDescendant = childChain.length > 0;

  return (
    <li>
      <button
        type="button"
        className={`sidebar__summary ${isActive || hasActiveDescendant ? 'sidebar__summary--active' : ''}`}
        aria-expanded={isOpen}
        onClick={() => {
          setOpenByLevel(previous => ({
            ...previous,
            [level]: previous[level] === item.id ? null : item.id,
          }));

          if (to) {
            navigate(to);
            onClose();
          }
        }}
      >
        <span className="sidebar__summary-left">
          {Icon ? <Icon size={18} className="sidebar__icon" /> : null}
          <span className="sidebar__label">{item.label}</span>
        </span>
        <span className={`sidebar__chevron ${isOpen ? 'sidebar__chevron--open' : ''}`} aria-hidden="true" />
      </button>

      {isOpen ? (
        <ul className="sidebar__sublist">
          {item.children?.map(child => (
            <SidebarNode
              key={child.id}
              item={child}
              level={level + 1}
              openByLevel={openByLevel}
              setOpenByLevel={setOpenByLevel}
              currentCraneId={currentCraneId}
              pathname={pathname}
              onClose={onClose}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

const Sidebar = ({ isOpen, items, onClose }: SidebarProps) => {
  const { pathname } = useLocation();
  const { craneId } = useParams();
  const currentCraneId = craneId ?? DEFAULT_CRANE_ID;

  const activeChain = useMemo(
    () => findActiveChain(items, pathname, currentCraneId),
    [items, pathname, currentCraneId],
  );

  const [openByLevel, setOpenByLevel] = useState<OpenByLevel>({});

  useEffect(() => {
    if (!activeChain.length) return;
    setOpenByLevel(previous => {
      const next: OpenByLevel = { ...previous };
      activeChain.forEach((id, index) => {
        next[index] = id;
      });
      return next;
    });
  }, [activeChain]);

  return (
    <>
      <aside id="sidebar" className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} aria-hidden={!isOpen}>
        <nav className="sidebar__nav" aria-label="Navigation principale">
          <ul className="sidebar__list">
            {items.map(item => (
              <SidebarNode
                key={item.id}
                item={item}
                level={0}
                openByLevel={openByLevel}
                setOpenByLevel={setOpenByLevel}
                currentCraneId={currentCraneId}
                pathname={pathname}
                onClose={onClose}
              />
            ))}
          </ul>
        </nav>
      </aside>

      <button
        type="button"
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--visible' : ''}`}
        onClick={onClose}
        aria-label="Fermer la barre latérale"
      />
    </>
  );
};

export default Sidebar;
