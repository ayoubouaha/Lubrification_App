import './Header.css';
import logo from '../../../assets/MarsaLogo.png';
import { useTheme } from '../../../theme/ThemeProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { DEFAULT_CRANE_ID } from '../../../config/cranesConfig';

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Header = ({ isSidebarOpen, onToggleSidebar }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { craneId } = useParams();
  const activeCraneId = craneId ?? DEFAULT_CRANE_ID;

  return (
    <header className="header">
      <div className="header__bar">
        <button
          type="button"
          className={`header__menu-btn ${isSidebarOpen ? 'header__menu-btn--open' : ''}`}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
        >
          <span className="hamburger" />
        </button>

        <a
          href="#"
          className="header__logo"
          aria-label="App Marsa home"
          onClick={event => {
            event.preventDefault();
            navigate(`/crane/${activeCraneId}/dashboard`);
          }}
        >
          <img src={logo} alt="App Marsa logo" className="header__logo-image" />
        </a>

        <button
          type="button"
          className="header__theme-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  );
};

export default Header;
