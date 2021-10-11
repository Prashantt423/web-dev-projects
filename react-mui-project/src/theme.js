
import { createTheme } from '@mui/material/styles'
export const theme = createTheme({
    palette: {
        primary: {
            main: "#0066ff",
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            contrastText: '#ffcc00',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    mybutton:{
        backgroundColor:'#0066ff' ,
        color: "white",
    }
});
