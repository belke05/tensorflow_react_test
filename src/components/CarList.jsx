import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

export default function CarList(props) {
  const carItems = props.cars
    .filter(car => car.Miles_per_Gallon != null && car.Horsepower != null)
    .map((car, i) => {
      return (
        <tr key={i}>
          <td>{car.Name}</td>
          <td>{car.Miles_per_Gallon}</td>
          <td>{car.Horsepower}</td>
          <td>{car.Origin}</td>
          <td>{car.Weight_in_lbs}</td>
          <td>{car.Year}</td>
        </tr>
      );
    });

  return (
    <>
      <h1>cars data table</h1>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>name</th>
            <th>miles per ⛽</th>
            <th>🐎 power</th>
            <th>origin</th>
            <th>⚖️</th>
            <th>year</th>
          </tr>
        </thead>
        <tbody>{carItems}</tbody>
      </Table>
    </>
  );
}
