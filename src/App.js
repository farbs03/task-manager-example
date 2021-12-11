import React, {useState} from "react"
import './App.css';
import Tasks from "./Tasks"
import {createTheme, ThemeProvider, Typography, CssBaseline, AppBar, Toolbar} from "@mui/material"

function App() {

  //dark mode switcher
  const [darkMode, setDarkMode] = useState(true)

  //global theme creator
  const theme = createTheme({
    palette: {
      primary: {
        main: "#6366f1",
      },
      mode: darkMode === true ? "dark" : "light",
      background: {
        default: darkMode === true ? "#1a1a24" : "rgb(245, 245, 245)",
        paper: darkMode === true ? "#252531" : "#fff"
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* icon import from font awesome */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
        />
        <CssBaseline />

        {/* top section of app */}
        <AppBar color="inherit" elevation={1} style={{alignItems: "center", textAlign: "center", display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
          <Toolbar>
            <Typography variant="h6" style={{textAlign: "center", fontWeight: "bold"}}>Task Manager <span class="ml-2 text-indigo-500"><i class="fas fa-tasks" /></span></Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        
        {/* renders Tasks component, which displays all tasks and allows user to create new ones */}
        <div style={{padding: "20px"}}>
          <Tasks />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;