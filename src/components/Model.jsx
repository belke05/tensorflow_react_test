import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import axios from "axios";
import CarList from "./CarList";

export default function Tftest(props) {
  const [prediction, setPrediction] = useState([]);
  const [cars, setCars] = useState([]);
  const [xshape, setXshape] = useState([]);
  const [yshape, setYshape] = useState([]);
  const x_in = [1, 2, 3, 4];
  const y_in = [1, 3, 5, 7];
  // Define a model for linear regression.

  useEffect(() => {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 1,
        inputShape: [1]
      })
    );

    model.compile({
      loss: "meanSquaredError",
      optimizer: "sgd"
    });

    // Generate some synthetic data for training.
    const xs = tf.tensor2d(x_in, [4, 1]);
    const ys = tf.tensor2d(y_in, [4, 1]);
    setXshape(xs.shape);
    setYshape(ys.shape);
    // Train the model using the data.
    model.fit(xs, ys, { epochs: 10 }).then(() => {
      // Use the model to do inference on a data point the model hasn't seen before:
      model
        .predict(tf.tensor2d([5], [1, 1]))
        .array()
        .then(data => {
          setPrediction(data);
        });
    });
  }, []);

  return <div>{cars.length > 0 && <CarList cars={cars} />}</div>;
}
