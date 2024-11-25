import express from "express";

import {
  createCar,
  deleteCar,
  getAllCars,
  getCar,
  searchCars,
  updateCar,
} from "../controller/cars";

export default (router: express.Router) => {
  router.post("/cars", createCar);
  router.get("/cars", getAllCars);
  router.get("/cars/search", searchCars);
  router.get("/cars/:id", getCar);
  router.put("/cars/:id", updateCar);
  router.delete("/cars/:id", deleteCar);
};
