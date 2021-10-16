import React from "react"
import ReactDom from "react-dom"
import App from "./app.jsx"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();


ReactDom.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
        
    
    , document.getElementById("root"))