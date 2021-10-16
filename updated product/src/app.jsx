import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import Card from "./components/card";
const baseURL =
  "https://7946a218-d225-4d0e-80ac-450bbc9713a0.mock.pstmn.io/booking";
const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "1% 0px 0px 5%",
    fontFamily: "brandon-grotesque"
  },
  container: {
    padding: "32px",
    margin: "15px auto 0",
    width: "90%",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08)",
    borderRadius: "5px"
  },
  card: {
    width: "80%"
  }
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
    async function getData() {
      const response = await fetch(baseURL);
      const data = await response.json();
      setData(data);
    }
  }, []);
  return (
    <div>
      <h1 className={classes.heading}> Your Policies </h1>
      {data && (
        <div>
          {data.policies.map((item, index) => (
            <div className={classes.container}>
              <Card
                img={item.partner.logo}
                title={item.title}
                description={item.description}
                coverage_start={item.coverage_start_date}
                coverage_end={item.coverage_end_date}
                renewal={item.renewal}
                status={item.status}
                date={item.payment_date}
                premium={item.premium_formatted}
                key={index}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
