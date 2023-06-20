import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { DeleteOutline } from "@mui/icons-material";

const drawerWidth = 240;

export default function Navbar(props) {
  const {boards ={}, setBoards, activeBoard, setActiveBoard} = props

  const handleTabClick = (tab) => {
    setActiveBoard(tab.key)
  };

  const handleRemove = (tab) => {
    let cloneBoards = {...boards};
    let conf = window.confirm(`Are you sure, you want to remove ${tab.title}`);
    if (conf) {
      delete cloneBoards[tab.key];
      setBoards(cloneBoards);
      setActiveBoard(cloneBoards?.[Object?.keys(cloneBoards)[0]]?.key)
    }
    
  };
  const renderItem = ({ item, handleRemove }) => {
    return (
      <ListItem
        className="listNav"
        sx={{ position: "relative", bottom: 0, right: 0 }}
      >
        <ListItemIcon>
          <SpaceDashboardIcon className="navIcon" />
        </ListItemIcon>
        <ListItemText primary={item.title} />
        <IconButton
          aria-label="more"
          id="long-button"
          aria-haspopup="true"
          onClick={() => handleRemove(item)}
        >
          <DeleteOutline className="navIcon" />
        </IconButton>
      </ListItem>
    );
  };

  return (
    <div className="navBar">
    
      <Drawer
        variant="persistent"
        open={true}
        className="drawer"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box className="drawerBOx" sx={{ overflow: "auto" }}>
          <List>
            <TransitionGroup>
              {Object.values(boards).map((item, index) => (
                <Collapse 
                key={item.key} 
                onClick={() => handleTabClick(item)} 
                className={`navTab ${activeBoard===item?.key ? 'activeTab': 'tav'}`}>
                  {renderItem({ item, handleRemove })}
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
