/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCarById } from "../services/carServices";
import CarModel from "../models/CarModel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions, List, ListItem } from "@mui/material";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState<CarModel | null>(null);

  const fetchData = async () => {
    try {
      if (id) {
        const data = await fetchCarById(id);
        setCarData(data);
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!carData) {
    return <div>Loading...</div>;
  }

  console.log(carData);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto p-8 max-w-[50rem]">
        <h1 className="text-2xl font-bold mb-5 text-slate-700">Car Details</h1>
        <Card>
          <CardContent className="flex flex-col justify-between items-center">
            <div className="grid grid-cols-2 gap-5">
              <List>
                <div className="text-gray-700 font-semibold">
                  Basic Information
                </div>
                <div className="text-slate-700">
                  <ListItem>
                    Brand : <span>{carData.Brand}</span>
                  </ListItem>
                  <ListItem>
                    Model :<span className="break-words">{carData.Model}</span>
                  </ListItem>
                  <ListItem>
                    Segment : <span>{carData.Segment}</span>
                  </ListItem>
                  <ListItem>
                    PriceEuro : <span>{carData.PriceEuro}</span>
                  </ListItem>
                </div>
              </List>

              <List>
                <div className="text-gray-700 font-semibold">Performance</div>
                <div className="text-slate-700">
                  <ListItem>AccelSec : {carData.AccelSec}</ListItem>
                  <ListItem>TopSpeed_KmH : {carData.TopSpeed_KmH}</ListItem>
                  <ListItem>Range_Km : {carData.Range_Km}</ListItem>
                </div>
              </List>

              <List>
                <div className="text-gray-700 font-semibold">Efficiency</div>
                <div className="text-slate-700">
                  <ListItem>
                    Efficiency_WhKm : {carData.Efficiency_WhKm}
                  </ListItem>
                  <ListItem>FastCharge_KmH : {carData.FastCharge_KmH}</ListItem>
                  <ListItem>RapidCharge : {carData.RapidCharge}</ListItem>
                </div>
              </List>

              <List>
                <div className="text-gray-700 font-semibold">Others</div>
                <div className="text-slate-700">
                  <ListItem>PowerTrain : {carData.PowerTrain}</ListItem>
                  <ListItem>PlugType : {carData.PlugType}</ListItem>
                  <ListItem>Seats : {carData.Seats}</ListItem>
                </div>
              </List>
            </div>
          </CardContent>
          <CardActions className="flex justify-between ">
            <Button size="large" onClick={() => navigate("/")}>
              Back
            </Button>
            <span className="pr-5 text-gray-500 font-semibold">
              {carData.Date}
            </span>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Details;
