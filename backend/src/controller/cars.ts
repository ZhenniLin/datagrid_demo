import express from "express";
import { CarSchema } from "../db/cars";
import mongoose from "mongoose";

const DATABASE_NAME = "car";
const COLLECTION_NAME = "electric_car_data";

const getCarModel = (): mongoose.Model<any> => {
  const db = mongoose.connection.useDb(DATABASE_NAME);
  return db.model("Car", CarSchema, COLLECTION_NAME);
};

const createCar = async (req: express.Request, res: express.Response) => {
  try {
    const CarModel = getCarModel();
    const car = await CarModel.create(req.body);
    res.status(200).json(car);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllCars = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const CarModel = getCarModel();
    const cars = await CarModel.find();
    res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const getCar = async (req: express.Request, res: express.Response) => {
  try {
    const CarModel = getCarModel();
    const { id } = req.params;
    console.log(id);
    const car = await CarModel.findById(id, req.body);
    res.status(200).json({ car });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const updateCar = async (req: express.Request, res: express.Response) => {
  try {
    const CarModel = getCarModel();
    const { id } = req.params;
    console.log(id);
    const car = await CarModel.findByIdAndUpdate(id, req.body);
    if (!car) {
      res.status(404).json({ message: "Product not found" });
    }
    const updateCar = await CarModel.findById(id);
    res.status(200).json(updateCar);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// not working
const deleteCar = async (req: express.Request, res: express.Response) => {
  console.log("DELETE /cars/:id called");
  try {
    const CarModel = getCarModel();
    // const id = req.params.id;
    // const deletedCar = await CarModel.findByIdAndRemove(id);
    // res.status(200).json(deletedCar);
    const deletedCar = await CarModel.findByIdAndRemove(req.params.id).exec();
    if (!deletedCar) {
      res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(deletedCar);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const searchCars = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { brand } = req.query;
    if (!brand) {
      res.status(400).json({ message: "Brand query parameter is required" });
      return;
    }

    const CarModel = getCarModel();

    const cars = await CarModel.find({
      Brand: { $regex: brand, $options: "i" },
    });

    res.status(200).json(cars);
  } catch (error) {
    console.error("Error searching cars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllCars, deleteCar, updateCar, getCar, createCar, searchCars };
