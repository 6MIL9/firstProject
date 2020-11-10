import React, { createContext, useState } from 'react';

type ContextProps = { 
  isMenuOpen: boolean
  toggleMenu: (isMenuOpen: boolean) => void
  toggleMenuMode: () => void
};

type PropsType = {
  children: React.ReactNode
}

export const MenuContext = createContext<Partial<ContextProps>>({
  isMenuOpen: true,
  toggleMenu: () => { },
});

const NavState: React.FC<PropsType> = ({ children }) => {
  const [isMenuOpen, toggleMenu] = useState(false);

  function toggleMenuMode() {
    toggleMenu(!isMenuOpen);
  }

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenuMode }}>{children}</MenuContext.Provider>
  );
};

export default NavState;