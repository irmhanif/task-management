import Header from './components/Header';
import './App.scss';
import React, { useContext } from 'react';
import { AppContext } from './Context';
import Content from './components/Content';

function App() {
  //const ThemeContext = React.createContext('light');
  const theme = useContext(AppContext)
  const darkMode = theme.state.darkMode;

  console.log('darkMode dsd',darkMode)
  return (
    <div className={`appContainer ${darkMode? 'dark' : 'light'}`}>
      <Header />
      
      <Content />
    </div>
  );
}

export default App;
