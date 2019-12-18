import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

export function testModel(model, inputData, normalizationData) {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

  // Generate predictions for a uniform range of numbers between 0 and 1;
  // We un-normalize the data by doing the inverse of the min-max scaling
  // that we did earlier.
  const [xs, preds] = tf.tidy(() => {
    const xs = tf.linspace(0, 1, 100);
    // 100 steps from 0 to 1

    const preds = model.predict(xs.reshape([100, 1]));
    // for each xs
    // xs * (maxI-minI) + minI
    const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);
    const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);
    // Un-normalize the data
    return [unNormXs.dataSync(), unNormPreds.dataSync()];
    // returns the data stored in the tensor
  });

  const predictedPoints = Array.from(xs).map((val, i) => {
    return { x: val, y: preds[i] };
  });

  const originalPoints = inputData.map(car => ({
    x: car.Horsepower,
    y: car.Miles_per_Gallon
  }));

  const predictionContainer = document.getElementById("predictions");
  predictionContainer.innerHTML = "";
  tfvis.render.scatterplot(
    predictionContainer,
    {
      values: [originalPoints, predictedPoints],
      series: ["original", "predicted"]
    },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300
    }
  );
}

export function predictValue(model, inputData, normalizationData, value) {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

  // Generate predictions for a uniform range of numbers between 0 and 1;
  // We un-normalize the data by doing the inverse of the min-max scaling
  // that we did earlier.
  const [xs, preds] = tf.tidy(() => {
    const inputTensor = tf.tensor([value]);
    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));

    // samples and features per sample
    const preds = model.predict(normalizedInputs.reshape([1, 1]));
    console.log("preds", preds);
    const unNormXs = normalizedInputs.mul(inputMax.sub(inputMin)).add(inputMin);

    const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);

    // Un-normalize the data
    console.log("preds", unNormPreds.dataSync());
    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });
  return preds;
}
