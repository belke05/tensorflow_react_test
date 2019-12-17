import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import axios from "axios";
import CarList from "./CarList";

export default function ScatterPlot(props) {
  const car_data = props.cars.map(car => {
    return {
      x: car.Horsepower,
      y: car.Miles_per_Gallon
    };
  });
  const car_names = props.cars.map(car => {
    return car.Name;
  });

  const data = {
    labels: car_names,
    datasets: [
      {
        label: "⛽ vs 🐎",
        backgroundColor: "rgba(75,192,192,0.4)",
        pointBorderColor: "rgba(75,192,192,1)",
        data: car_data
      }
    ]
  };

  const options = {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var label = data.labels[tooltipItem.index];
          return (
            label + ": (" + tooltipItem.xLabel + ", " + tooltipItem.yLabel + ")"
          );
        }
      }
    }
  };

  return (
    <div>
      <Scatter data={data} options={options} />
    </div>
  );
}
