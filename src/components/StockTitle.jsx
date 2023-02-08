import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


function StockTitle() {
  const [stockProfile, setStockProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();

  useEffect(() => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/profile',
      params: {symbol: `${param.stockSymbol}`},
      headers: {
        'X-RapidAPI-Key': '3739bf6e15msh3f361324e7ae496p1291a4jsneeac436b4fc4',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    axios
      .request(options)
      .then(response => {
        setStockProfile(response.data);
        setLoading(false);
        console.log("profile", response.data)
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [param.stockSymbol]);

  if (!stockProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-4">
      <p>{stockProfile['symbol']} - {stockProfile['name']}</p>
    </div>
  )
}

export default StockTitle