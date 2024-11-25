import mongoose from "mongoose";

export const CarSchema = new mongoose.Schema(
  {
    Brand: { type: String, required: true },
    Model: { type: mongoose.Schema.Types.Mixed, required: true },
    AccelSec: { type: Number, required: true },
    TopSpeed_KmH: { type: Number, required: true },
    Range_Km: { type: Number, required: true },
    Efficiency_WhKm: { type: Number, required: true },
    FastCharge_KmH: { type: Number, required: true },
    RapidCharge: { type: String, enum: ["Yes", "No"], required: true },
    PowerTrain: { type: String, enum: ["AWD", "RWD", "FWD"], required: true },
    PlugType: { type: String, required: true },
    BodyStyle: { type: String, required: true },
    Segment: { type: String, required: true },
    Seats: { type: Number, required: true },
    PriceEuro: { type: Number, required: true },
    Date: { type: String, required: true },
  },
  {
    // timestamps: true,
    versionKey: false,
  }
);
