import React, { useEffect, useState } from 'react'
import "./leftbar.css"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StyledEngineProvider } from '@mui/material/styles';
export default function Leftbar(props) {
    const [products, setProducts] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [groupedProductData, setGroupedProductData] = useState([])
    const [groupedStateData, setGroupedStateData] = useState([])
    const [groupedCityData, setGroupedCityData] = useState([])
    const handleChange1 = (event) => {
        setProducts(event.target.value);
        props.setFilterBy((prevState) => {
            return {
                product: event.target.value,
                state: prevState.state,
                city: prevState.city
            }
        })
    };
    const handleChange2 = (event) => {
        setState(event.target.value);
        props.setFilterBy((prevState) => {
            return {
                product: prevState.product,
                state: event.target.value,
                city: prevState.city
            }
        })
    };
    const handleChange3 = (event) => {
        setCity(event.target.value);
        props.setFilterBy((prevState) => {
            return {
                product: prevState.product,
                state: prevState.state,
                city: event.target.value
            }
        })
    };

    let p_arr = []
    let p_data_arr = []
    let s_arr = []
    let s_data_arr = []
    let c_arr = []
    let c_data_arr = []
    useEffect(() => {
        async function groupBy(list, keyGetter) {
            try {
                const map = new Map();
                list && list.forEach((item) => {
                    const key = keyGetter(item);
                    const collection = map.get(key);
                    if (!collection) {
                        map.set(key, [item]);
                    } else {
                        collection.push(item);
                    }
                });
                return map;
            } catch (e) {
                console.log(e);
            }

        }

        async function GroupProductData() {
            let grouped = await groupBy(props.Data, data => data.product_name);
            setGroupedProductData(grouped);
        }


        async function GroupStateData() {
            let grouped = await groupBy(props.Data, data => data.address.state);
            setGroupedStateData(grouped);
        }


        async function GroupCityData() {
            let grouped = await groupBy(props.Data, data => data.address.city);
            setGroupedCityData(grouped);
        }
        GroupProductData();
        GroupStateData();
        GroupCityData();


    }, [setGroupedProductData, props.Data, setGroupedStateData, setGroupedCityData])
    if (groupedProductData) {
        let it = groupedProductData.entries();
        let arr = []

        while ((arr = it.next().value)) {
            p_arr.push(arr[0]);
            p_data_arr.push(arr[1])
        }

    }
    if (groupedStateData) {
        let it = groupedStateData.entries();
        let arr = []

        while ((arr = it.next().value)) {
            s_arr.push(arr[0]);
            s_data_arr.push(arr[1])
        }

    }
    if (groupedCityData) {
        let it = groupedCityData.entries();
        let arr = []

        while ((arr = it.next().value)) {
            c_arr.push(arr[0]);
            c_data_arr.push(arr[1])
        }

    }


    return (
        <StyledEngineProvider injectFirst>
            <div className="left-box">
                <div className="left-bar-box">
                    <div className="head">
                        <p>Filters</p>
                        <hr className="style-one"></hr></div>
                </div>

                <div className="left-bar-box">
                    <FormControl sx={{ m: 1, minWidth: 150, backgroundColor: "#292929", borderRadius: "4px" }}>
                        <Select
                            sx={{ color: "white", fontSize: "15px", width: "200px" }}
                            value={products}
                            onChange={handleChange1}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            
                        >
                            <MenuItem value="">
                                <em>Products</em>
                            </MenuItem>
                            {
                                p_arr && p_arr.filter(v => props.Data.some(p => p.address.state.includes(props.filterObj.state) && p.product_name === v && p.address.city.includes(props.filterObj.city))).map((data, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={data}>
                                            {data}
                                        </MenuItem>
                                    )
                                })
                            }


                        </Select>
                    </FormControl>
                </div>
                <div className="left-bar-box">
                    <FormControl sx={{ m: 1, minWidth: 150, backgroundColor: "#292929", borderRadius: "4px", overflow: "hidden" }}>
                        <Select
                            sx={{ color: "white", fontSize: "15px", width: "200px" }}
                            value={state}
                            onChange={handleChange2}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            
                        >
                            <MenuItem value="">
                                <em>State</em>
                            </MenuItem>
                            {
                                s_arr && s_arr.filter(v => props.Data.some(p => p.address.state===v && p.product_name.includes(props.filterObj.product) && p.address.city.includes(props.filterObj.city))).map((data, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={data}>
                                            {data}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="left-bar-box">
                    <FormControl sx={{ m: 1, minWidth: 150, backgroundColor: "#292929", borderRadius: "4px" }}>
                        <Select
                            sx={{ color: "white", fontSize: "15px", width: "200px" }}
                            value={city}
                            onChange={handleChange3}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>City</em>
                            </MenuItem>
                            {
                                c_arr && c_arr.filter(v=>props.Data.some(p =>p.address.city===v && p.address.state.includes(props.filterObj.state) && p.product_name.includes(props.filterObj.product) )).map((data, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={data}>
                                            {data}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
            </div>
        </StyledEngineProvider>
    )
}
