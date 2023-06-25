import Header from './components/Header';
import './App.scss';
import './index.css';
import React, { useContext } from 'react';
import { AppContext } from './Context';
import Content from './components/Content';

function App() {
  //const ThemeContext = React.createContext('light');
  const theme = useContext(AppContext)
  const darkMode = theme.state.darkMode;

  const [drawerState, setDrawerState] = React.useState(false);
  const handleCollapse = () => {
    setDrawerState(!drawerState);
  };

  return (
    <div className={`appContainer ${darkMode? 'dark' : 'light'}`}>
      <Header handleCollapse={handleCollapse}/>
      
      <Content drawerState={drawerState}/>
    </div>
  );
}

export default App;
