import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

// ----- create the model

function createModel() {
  const model = tf.sequential();

  // single hidden layer see is as logistical
  // predictor
  model.add(
    tf.layers.dense({
      units: 1,
      inputShape: [1],
      useBias: true
    })
  );
  // units sets how big the weight matrix will be in the layer.
  // By setting it to 1 here we are saying there will be
  // 1 weight for each of the input features of the data.

  // Add an output layer
  // units 1  = output 1 number
  model.add(tf.layers.dense({ units: 1, useBias: true }));
  return model;
}

// convert to tensors

function convertToTensor(data) {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    // data will be cars
    tf.util.shuffle(data);
    const inputs = data.map(car => car.Horsepower);
    const labels = data.map(car => car.Miles_per_Gallon);

    // make the tensors
    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    // normalize the tensors
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));
    // this will do x-min(x)/max(x)-min(x)
    const normalizedLabels = labelTensor
      .sub(labelMin)
      .div(labelMax.sub(labelMin));
    console.log("tensorsssss");
    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
      labelMax,
      labelMin
    };
  });
}

async function modelTraining(model, inputs, labels) {
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ["mse"]
  });
  console.log("traininggg", inputs, labels);
  const batchSize = 32;
  const epochs = 50;
  const lossContainer = document.getElementById("loss-cont");
  lossContainer.innerText = "";
  console.log("traininggg", lossContainer);
  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(lossContainer, ["loss", "mse"], {
      height: 200,
      width: 400,
      callbacks: ["onEpochEnd"]
    })
  });
}

export async function run(data) {
  console.log(data, "dtatatatat");
  const model = createModel();
  const tensorData = convertToTensor(data);
  const { inputs, labels } = tensorData;
  await modelTraining(model, inputs, labels);
}
