class CarModel {
  Brand: string;
  Model: string | number;
  AccelSec: number;
  TopSpeed_KmH: number;
  Range_Km: number;
  Efficiency_WhKm: number;
  FastCharge_KmH: number;
  RapidCharge: string;
  PowerTrain: string;
  PlugType: string;
  BodyStyle: string;
  Segment: string;
  Seats: number;
  PriceEuro: number;
  Date: string;

  constructor(
    Brand: string,
    Model: string | number,
    AccelSec: number,
    TopSpeed_KmH: number,
    Range_Km: number,
    Efficiency_WhKm: number,
    FastCharge_KmH: number,
    RapidCharge: string,
    PowerTrain: string,
    PlugType: string,
    BodyStyle: string,
    Segment: string,
    Seats: number,
    PriceEuro: number,
    Date: string
  ) {
    this.Brand = Brand;
    this.Model = Model;
    this.AccelSec = AccelSec;
    this.TopSpeed_KmH = TopSpeed_KmH;
    this.Range_Km = Range_Km;
    this.Efficiency_WhKm = Efficiency_WhKm;
    this.FastCharge_KmH = FastCharge_KmH;
    this.RapidCharge = RapidCharge;
    this.PowerTrain = PowerTrain;
    this.PlugType = PlugType;
    this.BodyStyle = BodyStyle;
    this.Segment = Segment;
    this.Seats = Seats;
    this.PriceEuro = PriceEuro;
    this.Date = Date;
  }
}

export default CarModel;
