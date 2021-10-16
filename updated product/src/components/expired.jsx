import React from "react"
import { makeStyles } from "@mui/styles"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const useStyles = makeStyles((theme) => ({
    active:{
        display:"flex",
        alignItems:"center",
        color:"red",
        fontFamily:"brandon-grotesque",
        fontWeight:"bolder",
        fontSize:"12px",
        textAlign:"center",
        
    }
}));
function Expired() {
    const classes= useStyles();
    return (
        <span className={classes.active}>
            EXPIRED <FiberManualRecordIcon style={{ fontSize: 15 }}/>
        </span>

    )
}

export default Expired;