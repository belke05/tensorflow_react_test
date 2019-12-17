import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import axios from "axios";
import CarList from "./CarList";
import ScatterPlot from "./ScatterPlot";

export default function Tftest(props) {
  const [prediction, setPrediction] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("https://storage.googleapis.com/tfjs-tutorials/carsData.json")
      .then(res => {
        const cars_returned = res.data;
        setCars(cars_returned);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (cars.length < 0) {
    return <div>fetching data</div>;
  } else {
    return (
      <div>
        <ScatterPlot cars={cars} />
        <CarList cars={cars} />
      </div>
    );
  }
}
