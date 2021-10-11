import * as React from "react"
import { alpha } from "@mui/material/styles"
import { makeStyles, styled } from "@mui/styles"
import { AppBar, Badge, InputBase, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
const useStyles = makeStyles((theme) => ({
    ToolBox: {
        display: "flex",
        justifyContent: "space-between"
    },
    logoLg: {
        display: "none",
        [theme.breakpoints.up('sm')]: {
            display: "block",
        },
    },
    logoSm: {
        display: "none",
        [theme.breakpoints.down('sm')]: {
            display: "block",
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        width: '60%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    SearchIcon: {
        marginRight: 10,
        marginLeft: 5,
    },
    searchIconWrapper: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));


function Navbar() {
    const classes = useStyles();
    return (
        <AppBar>
            <Toolbar className={classes.ToolBox}>
                <Typography className={classes.logoLg} variant="h6">
                    DSC co.
                </Typography>
                <Typography className={classes.logoSm} variant="h6">
                    DSC
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIconWrapper}>
                        <SearchIcon className={classes.SearchIcon} />
                    </div>
                    <StyledInputBase placeholder="Search..." />
                </div>
                <div className={classes.icons}>
                    <Badge badgeContent={4} sx={{ color: 'warning.main' }}>
                        <MailIcon color="action" />
                    </Badge>
                </div>
            </Toolbar>
        </AppBar>

    )
}

export default Navbar;
