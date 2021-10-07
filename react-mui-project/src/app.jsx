import React from "react"
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { styled } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
   
    
}));

const ColorButton = styled(Button)(({ theme }) => ({
   
  }));



function App() {
    const classes = useStyles();
    return (
        <div>
            <h1 className={classes.heading}>
                Hello World
            </h1>
            <ColorButton variant="contained">Hello</ColorButton>
        </div>
    )
}

export default App;