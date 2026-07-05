import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AppContext = createContext();

export function AppProvider({ children }) {
  const { i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'student', 'parent', 'admin'
  const [language, setLanguage] = useState('en');
  const [syllabus, setSyllabus] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const loginAs = (role, userData = {}) => {
    setUserRole(role);
    setUser({ name: userData.name || 'User', phone: userData.phone || '+91 98765 43210', ...userData });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setSyllabus(null);
    setSelectedClass(null);
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      userRole, setUserRole,
      language, changeLanguage,
      syllabus, setSyllabus,
      selectedClass, setSelectedClass,
      isAuthenticated, setIsAuthenticated,
      loginAs, logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
