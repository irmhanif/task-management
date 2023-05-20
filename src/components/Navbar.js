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
import React, { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { DeleteOutline } from "@mui/icons-material";

const drawerWidth = 240;

export default function Navbar() {
  const [selectedTab, setSelectedTab] = useState("");

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
    console.log('selectedTab',selectedTab);
  };

  const [boards, setBoards] = useState([
    "Inbox",
    "Starred",
    "Send email",
    "Drafts",
  ]);
  const handleRemove = (tabName) => {
    let cloneBoards = [...boards];
    const index = cloneBoards.indexOf(tabName);
    if (index > -1) {
      // only splice array when item is found
      cloneBoards.splice(index, 1); // 2nd parameter means remove one item only
    }

    setBoards(cloneBoards);
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
        <ListItemText primary={item} />
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
              {boards.map((item, index) => (
                <Collapse key={item} onClick={() => handleTabClick(item)}>
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
