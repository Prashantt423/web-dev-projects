import React, { useEffect, useState } from 'react'
import Leftbar from "../../components/leftbar/leftbar"
import Main from "../../components/main/main"
import axios from "axios"
import "./homepage.css"
export default function Homepage() {
const [data,setData]=useState()
const [filterBy,setFilterBy] = useState({
  product:"",
  state:"",
  city:""
})
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://assessment-edvora.herokuapp.com/")
        setData(res.data)

    };
    fetchData();
   
  },[setData])

  return (
    <>
      <div className="homepage">
        <Leftbar 
        setFilterBy={setFilterBy}
        filterObj={filterBy}
        Data={data} />
        <Main 
        Data={data}
        FilterParams={filterBy}
        
        />
      </div>
    </>
  )
}
