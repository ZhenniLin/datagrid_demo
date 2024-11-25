/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import CarModel from "../models/CarModel";

const BASE_URL = "http://localhost:7123/api/cars";

const fetchCars = async (): Promise<CarModel[]> => {
  const response = await axios.get<CarModel[]>(BASE_URL);
  return response.data;
};

const fetchCarById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data.car;
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    throw error;
  }
};

const createCar = async (carData: CarModel): Promise<CarModel> => {
  const response = await axios.post<CarModel>(BASE_URL, carData);
  return response.data;
};

const deleteCar = async (id: string): Promise<CarModel> => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

const searchCarsByBrand = async (brand: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { brand }, // 将查询参数传递到 URL 中
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
  }
};

export { fetchCars, createCar, deleteCar, fetchCarById, searchCarsByBrand };
