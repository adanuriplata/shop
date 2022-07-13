import { createContext } from 'react'

interface ContextProps {
  isMenuOpen: boolean;
  //methods
  toggleSidemenu: () => void;
}

export const  UiContext = createContext({} as ContextProps);