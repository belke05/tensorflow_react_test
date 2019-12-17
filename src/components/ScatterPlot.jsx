import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import axios from "axios";
import CarList from "./CarList";

export default function ScatterPlot(props) {
  const chartTitle = props.chartTitle;
  const y_label = props.y_label;
  const x_label = props.x_label;
  const x_y = props.data;
  const labels = props.labels;
  const colorpoint = props.colorpoint || "rgba(75, 192, 192, 0.4)";
  const colorpointborder = props.colorpointborder || "rgba(75,192,192,1)";
  const width = props.width || 400;
  const height = props.height || 400;
  const data = {
    labels: labels,
    datasets: [
      {
        label: chartTitle,
        backgroundColor: colorpoint,
        pointBorderColor: colorpointborder,
        data: x_y
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var label = data.labels[tooltipItem.index];
          return (
            label + ": (" + tooltipItem.xLabel + ", " + tooltipItem.yLabel + ")"
          );
        }
      }
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: y_label
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: x_label
          }
        }
      ]
    }
  };

  return (
    <div style={{ width: width, height: height }}>
      <Scatter data={data} options={options} />
    </div>
  );
}
