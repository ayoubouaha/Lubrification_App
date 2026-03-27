import { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { SIDEBAR_ITEMS } from '../../../navigation/sidebarConfig';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout-root">
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        items={SIDEBAR_ITEMS}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="layout-content">
        <main className="layout-main">{children}</main>
        {showFooter ? <Footer /> : null}
      </div>
    </div>
  );
};

export default Layout;
