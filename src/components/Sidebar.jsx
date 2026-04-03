import useFriendContext from '../hooks/useFriendContext.js';
import { TABS } from '../config/tabs.js';
import useTheme from '../hooks/useTheme.js';

import Header from './Header';
import Button from './Button';
import Footer from './Footer';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { theme, toggleTheme } = useTheme();
  const { resetView, updateLiveRegion } = useFriendContext();

  function handleTabChange(tab) {
    setActiveTab(tab);
    resetView();
  }

  function handleThemeChange() {
    toggleTheme();

    updateLiveRegion(
      theme === 'light' ? 'Dark mode selected' : 'Light mode selected'
    );
  }

  return (
    <aside
      className='sidebar'
      aria-label='Sidebar'>
      <Header />

      <nav
        role='tablist'
        className='sidebar-tabs'>
        {TABS.map(tab => (
          <Button
            key={tab.id}
            type='button'
            role='tab'
            aria-controls={tab.id}
            aria-selected={activeTab === tab.id}
            className={`sidebar-btn ${activeTab === tab.id ? 'active-tab' : ''}`}
            onClick={() => handleTabChange(tab.id)}>
            {tab.label}
          </Button>
        ))}
      </nav>

      <Button
        type='button'
        className='theme-toggle'
        aria-label='Toggle theme'
        onClick={handleThemeChange}>
        Theme{' '}
        {theme === 'light' ? (
          <i
            className='bi bi-sun-fill light-icon'
            aria-hidden='true'></i>
        ) : (
          <i
            className='bi bi-moon-stars-fill dark-icon'
            aria-hidden='true'></i>
        )}
      </Button>

      <div className='sidebar-footer'>
        <Footer />
      </div>
    </aside>
  );
}
