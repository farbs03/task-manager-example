import React from "react"
import './App.css';
import Tasks from "./Tasks"
import {createTheme, ThemeProvider, Typography} from "@mui/material"
import {deepOrange} from "@mui/material/colors"

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: deepOrange[400]
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{padding: "20px"}}>
        <Typography variant="h5" style={{textAlign: "center", fontWeight: "bold", marginBottom: "20px"}}>Task Manager</Typography>
        <Tasks />
      </div>
    </ThemeProvider>
  );
}

export default App;