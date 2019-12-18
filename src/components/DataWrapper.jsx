import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { run } from "../tensorflow/model";
import axios from "axios";
import CarList from "./CarList";
import ScatterPlot from "./ScatterPlot";
import { predictValue } from "../tensorflow/predict";
import { Spinner } from "react-bootstrap";

export default function DataWrapper(props) {
  const [predictions, setPredictions] = useState([]);
  const [cars, setCars] = useState([]);
  const [model, setModel] = useState(null);
  const [toPredict, setToPredict] = useState(0);
  const [predictionResponse, setpredictionResponse] = useState(null);
  const [tensorData, setTensorData] = useState(null);

  const handleChange = e => {
    const value = e.target.value;
    setToPredict(value);
  };

  const handleClick = e => {
    const prediction = predictValue(model, cars, tensorData, Number(toPredict));
    setPredictions([...predictions, prediction]);
  };

  useEffect(() => {
    axios
      .get("https://storage.googleapis.com/tfjs-tutorials/carsData.json")
      .then(res => {
        const cars_returned = res.data.filter(
          car => car.Miles_per_Gallon != null && car.Horsepower != null
        );
        setCars(cars_returned);
        run(cars_returned).then(({ trainedModel, tensorData }) => {
          setModel(trainedModel);
          setTensorData(tensorData);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (cars.length < 0) {
    return <div>fetching data</div>;
  } else {
    return (
      <div className="datawrapper">
        <div className="sub_wrapper">
          <h1 className="main_title">predict my ⛽ per 🐎🐎🐎</h1>
          {!tensorData && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          {tensorData && (
            <div>
              <input type="number" value={toPredict} onChange={handleChange} />
              <button onClick={handleClick}>make a prediction</button>
              {predictions.length > 0 && (
                <ul>
                  {predictions.map((prediction, i) => {
                    return <li key={i}>{Number(prediction).toFixed(2)} mpg</li>;
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="sub_wrapper">
          <h1 className="main_title">visualizing the model predictions</h1>
          <div id="predictions">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </div>
        <div className="sub_wrapper">
          <h1 className="main_title">visualizing the training</h1>
          <div id="loss-cont">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </div>
        <div className="sub_wrapper data_vis_wrapper">
          <h1 className="main_title">visualizing the data</h1>
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
            width={"100%"}
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
            width={"100%"}
            height={400}
          />
          <CarList cars={cars} />
        </div>
      </div>
    );
  }
}
