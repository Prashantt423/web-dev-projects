import { ThemeProvider } from "@mui/material"
import React from "react"
import ReactDom from "react-dom"
import App from "./app.jsx"
import { theme } from "./theme"

ReactDom.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
    , document.getElementById("root"))