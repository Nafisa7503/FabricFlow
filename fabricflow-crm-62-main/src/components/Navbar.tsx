
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell, Moon, Sun, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm dark:bg-tailoring-950/90' : 'bg-white dark:bg-tailoring-950'
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <NavLink 
            to="/" 
            className="text-2xl font-semibold text-tailoring-950 dark:text-white transition-opacity duration-200 hover:opacity-80"
          >
            FabricFlow
          </NavLink>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('dashboard')}
          </NavLink>
          <NavLink to="/inventory" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('inventory')}
          </NavLink>
          <NavLink to="/customers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('customers')}
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('orders')}
          </NavLink>
          <NavLink to="/finance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('finance')}
          </NavLink>
        </nav>
        
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleLanguage}
                  className="text-tailoring-600 hover:text-tailoring-900 dark:text-tailoring-400 dark:hover:text-white"
                >
                  <Languages className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{language === 'en' ? 'Switch to Bengali' : 'Switch to English'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleTheme}
                  className="text-tailoring-600 hover:text-tailoring-900 dark:text-tailoring-400 dark:hover:text-white"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="ghost" size="icon" className="text-tailoring-600 hover:text-tailoring-900 dark:text-tailoring-400 dark:hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-tailoring-600 hover:text-tailoring-900 dark:text-tailoring-400 dark:hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-tailoring-600 hover:text-tailoring-900 dark:text-tailoring-400 dark:hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in-down">
          <div className="bg-white dark:bg-tailoring-900 border-t border-border dark:border-tailoring-800 space-y-1 p-4">
            <NavLink 
              to="/" 
              className="block w-full p-3 text-center rounded-md text-tailoring-800 dark:text-tailoring-200 hover:bg-tailoring-50 dark:hover:bg-tailoring-800/50 transition-colors"
            >
              {t('dashboard')}
            </NavLink>
            <NavLink 
              to="/inventory" 
              className="block w-full p-3 text-center rounded-md text-tailoring-800 dark:text-tailoring-200 hover:bg-tailoring-50 dark:hover:bg-tailoring-800/50 transition-colors"
            >
              {t('inventory')}
            </NavLink>
            <NavLink 
              to="/customers" 
              className="block w-full p-3 text-center rounded-md text-tailoring-800 dark:text-tailoring-200 hover:bg-tailoring-50 dark:hover:bg-tailoring-800/50 transition-colors"
            >
              {t('customers')}
            </NavLink>
            <NavLink 
              to="/orders" 
              className="block w-full p-3 text-center rounded-md text-tailoring-800 dark:text-tailoring-200 hover:bg-tailoring-50 dark:hover:bg-tailoring-800/50 transition-colors"
            >
              {t('orders')}
            </NavLink>
            <NavLink 
              to="/finance" 
              className="block w-full p-3 text-center rounded-md text-tailoring-800 dark:text-tailoring-200 hover:bg-tailoring-50 dark:hover:bg-tailoring-800/50 transition-colors"
            >
              {t('finance')}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
