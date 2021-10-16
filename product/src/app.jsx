import { makeStyles } from "@mui/styles"
import React from "react"
import Card from "./components/card"
import data from "./data"
const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "10% 0px 0px 5%",
    fontFamily: "brandon-grotesque",
  },
  container: {
    padding: "32px",
    margin: "48px auto 0",
    width: "90%",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08)",
    borderRadius: "5px"
  },
  card: {
    width: "80%"
  }
}))

function App() {
  const classes = useStyles()
  return (
    <div>
      <h1 className={classes.heading}>Your Policies</h1>
      {data.policies.map((item)=>{
        return (
      <div className={classes.container}>
        <Card 
         img={item.partner.logo}
         title={item.title}
         description={item.description}
         coverage_start_date={item.coverage_start_date}
        coverage_end_date={item.coverage_end_date}
        renewal={item.renewal}
        status={item.status}
        date={item.payment_date}
        premium={item.premium_formatted}
        className={classes.card} />
      </div>
        )
      })}
    </div>
  )
}

export default App;