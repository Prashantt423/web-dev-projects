import React, { useEffect, useState } from 'react'
import Item from "../../components/cards/items/items"
import "./main.css"
import Carousel from "react-elastic-carousel";
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
    { width: 1800, itemsToShow: 5 }
];
export default function Main(props) {
    const [groupedData, setGroupedData] = useState([])

    let d_arr = []
    let data_arr = []
    useEffect(() => {
        async function groupBy(list, keyGetter) {
            try {
                const map = new Map();
                list &&list.forEach((item) => {
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

        async function GroupData() {
            const grouped = await groupBy(props.Data, data => data.product_name);
            setGroupedData(grouped);
        }

        GroupData();


    }, [setGroupedData, props.Data])
    if (groupedData) {
        let it = groupedData.entries();
        let arr = []

        while ((arr = it.next().value)) {

            d_arr.push(arr[0]);
            data_arr.push(arr[1])
        }

    }


    return (
        <div className="main">
            <h2>Edvora</h2>
            <h3 className="dim-color marginTop">Products</h3>
            {
                d_arr && d_arr.map((d, i) => {
                    return (
                        <div className="item-box"
                        key={i}
                        >
                            <div className="content-box">
                                <div className="spec">
                                    <div className="p-name">
                                        <p>{d}</p>
                                        <hr className="full-line"></hr></div>
                                </div>
                                <Carousel
                                    pagination={false}
                                    className="carouselBox"
                                    breakPoints={breakPoints}>
                                    {
                                        data_arr[i] && data_arr[i].filter((val) => {
                                            let res;
                                            if (props.FilterParams.product === "" && props.FilterParams.state === "" && props.FilterParams.city === "")
                                                res= val;
                                            else if (val.product_name.includes(props.FilterParams.product) &&
                                                val.address.state.includes(props.FilterParams.state) &&
                                                val.address.city.includes(props.FilterParams.city))
                                                res= val;

                                                return res;
                                        }).map((data, index) => {
                                            return (
                                                <Item
                                                    d={data}
                                                    key={index}
                                                />
                                            )
                                        })
                                    }
                                </Carousel>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
