import express from "express";
import cars from "./cars";

const router = express.Router();

export default (): express.Router => {
  cars(router);
  return router;
};
