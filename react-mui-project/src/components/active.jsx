import React from "react"
import { makeStyles } from "@mui/styles"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const useStyles = makeStyles((theme) => ({
    active:{
        display:"flex",
        alignItems:"center",
        color:"#5fdba7",
        fontFamily:"brandon-grotesque",
        fontWeight:"bolder",
        fontSize:"12px"
    }
}));
function Active() {
    const classes= useStyles();
    return (
        <span className={classes.active}>
            ACTIVE <FiberManualRecordIcon style={{ fontSize: 15 }}/>
        </span>

    )
}

export default Active;