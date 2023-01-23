import React from 'react';
import "./CSS/App.css";
import "./CSS/index.css";

import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Kanban from "./Components/Kanban";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./Components/Users";

function App() {
  return (
    <div>
      <Provider store={store}>
        <AppBar>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                Kanban
              </Typography>
              <Link to={"/"} style={{ color: "white" }}>
                Home
              </Link>
              <Link to={"/users"} style={{ color: "white", marginLeft: 10 }}>
                Users
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />

        <Routes>
          <Route path="/" element={<Kanban />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
