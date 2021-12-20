import React from 'react'
import "./leftbar.css"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StyledEngineProvider } from '@mui/material/styles';
export default function Leftbar() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    return (
        <StyledEngineProvider injectFirst>
        <div className="left-box">
            <div className="left-bar-box"> 
                <div className="head">
                <p>Filters</p>
                <hr className="style-one"></hr></div>
            </div>
             
            <div className="left-bar-box">
                <FormControl sx={{ m: 1, minWidth: 150 ,backgroundColor:"#292929", borderRadius:"4px"}}>
                <Select
                    sx={{color: "white"}}
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>Products</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            </div>
            <div className="left-bar-box">
            <FormControl sx={{  m: 1, minWidth: 150 ,backgroundColor:"#292929", borderRadius:"4px"}}>
                <Select
                     sx={{color: "white"}}
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>State</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            </div>
            <div className="left-bar-box">
            <FormControl sx={{ m: 1, minWidth: 150 ,backgroundColor:"#292929", borderRadius:"4px" }}>
                <Select
                sx={{color: "white"}}
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>City</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            </div>
        </div>
    </StyledEngineProvider>
    )
}
