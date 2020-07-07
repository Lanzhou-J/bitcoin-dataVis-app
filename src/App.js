// App.js
import React, { useState, useEffect } from "react";
import currencies from "./supported-currencies.json";
 import { Line } from 'react-chartjs-2'

const App = () => {
  const defaultCurrency = "AUD";
  const [currency, setCurrency] = useState(defaultCurrency);
  const [bitcoinData, setBitcoinData] = useState({});
  //similar to componentDidMount()
  useEffect(() => {
    // console.log("here2")
    console.log(currency);
    // setCurrency("USD")
  }, [currency]);

  const onOptionChange = (event) => {
    setCurrency(event.target.value);
  };
  //  console.log("here1")

  //  console.log(currency)

  // useEffect(()=>{
  //   // console.log("inside the useEffect");
  //   // hard code data to represent data that we fetch from an API
  //   const data = {"2020-01-10":11866.0075,"2020-01-11":11619.6983,"2020-01-12":11858.2603}
  //   setBitcoinData(data)
  // },[currency])

  const bitcoinApi = "https://api.coindesk.com/v1/bpi/historical/close.json";
  useEffect(() => {
    console.log("inside of useEffect");
    function getData() {
      fetch(`${bitcoinApi}?currency=${currency}`)
        .then((response) => response.json())
        .then((data) => setBitcoinData(data.bpi))
        .catch((e) => e);
    }
    getData();
  }, [currency]);

   const lineGraphData = {
     labels: Object.keys(bitcoinData),
     datasets: [
       {
         label: "BCI",
         data: Object.values(bitcoinData),
         backgroundColor: "#ffcccb"
       }
     ]
   }

  // console.log(bitcoinData)
  return (
    <div>
      <span>Select your currency:</span>
      <select value={currency} onChange={onOptionChange}>
        {currencies.map((obj, index) => (
          <option key={`${index}-${obj.country}`} value={obj.currency}>
            {obj.country}
          </option>
        ))}
      </select>

      <h1>Bitcoin Data for {currency}</h1>
      <Line data={lineGraphData} />
      <hr/>
      {Object.keys(bitcoinData).map((date) => (
        <div key={date}>
          Date: {date} Value: {bitcoinData[date]}
        </div>
      ))}
    </div>
  );
};

export default App;
