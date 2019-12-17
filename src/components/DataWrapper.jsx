import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { run } from "../tensorflow/model";
import axios from "axios";
import CarList from "./CarList";
import ScatterPlot from "./ScatterPlot";

export default function DataWrapper(props) {
  const [prediction, setPrediction] = useState([]);
  const [cars, setCars] = useState([]);
  const [model, setModel] = = useState(null);

  useEffect(() => {
    axios
      .get("https://storage.googleapis.com/tfjs-tutorials/carsData.json")
      .then(res => {
        const cars_returned = res.data;
        console.log(res.data);
        setCars(cars_returned);
        run(cars_returned).then(trainedModel=>{setModel(trainedModel)}).catch(err=>console.log(err))
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (cars.length < 0) {
    return <div>fetching data</div>;
  } else {
    return (
      <div className="datawrapper">
        <div>
          <h1>visualizing the training</h1>
          <div id="loss-cont"></div>
        </div>
        <h1>visualizing the data</h1>
        <ScatterPlot
          data={cars.map(car => {
            return {
              x: car.Horsepower,
              y: car.Miles_per_Gallon
            };
          })}
          chartTitle="MPG VS HP"
          labels={cars.map(car => {
            return car.Name;
          })}
          y_label="MPG ⛽"
          x_label="HP 🐎"
          colorpoint="rgba(75,100,12,0.4)"
          colorpointborder="rgba(75,102,12,1)"
          width={"70%"}
          height={400}
        />
        <ScatterPlot
          data={cars.map(car => {
            return {
              x: car.Weight_in_lbs,
              y: car.Miles_per_Gallon
            };
          })}
          chartTitle="MPG VS Weight in pound"
          labels={cars.map(car => {
            return car.Name;
          })}
          y_label="MPG ⛽"
          x_label="weight ⚖️"
          colorpoint="rgba(75,0,192,0.4)"
          colorpointborder="rgba(75,12,192,1)"
          width={"70%"}
          height={400}
        />
        <CarList cars={cars} />
      </div>
    );
  }
}
