/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions } from "@mui/material";
import axios from "axios";
import FormField from "./FormField";
import { CAR_FORM_FIELDS } from "../utils/constants";
import CarModel from "../models/CarModel";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
  editData?: any | null;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, onRefresh, editData } = props;
  const [isEditable, setIsEditable] = React.useState(false);

  const handleClose = () => {
    onClose();
  };

  const initialFormData = {
    Brand: "",
    Model: "",
    AccelSec: "",
    TopSpeed_KmH: "",
    Range_Km: "",
    Efficiency_WhKm: "",
    FastCharge_KmH: "",
    RapidCharge: "",
    PowerTrain: "",
    PlugType: "",
    BodyStyle: "",
    Segment: "",
    Seats: "",
    PriceEuro: "",
    Date: "",
  };
  const [formData, setFormData] = React.useState(initialFormData);

  React.useEffect(() => {
    if (editData) {
      setFormData(editData);
      setIsEditable(false);
    } else {
      setFormData(initialFormData);
      setIsEditable(true);
    }
  }, [editData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 防止页面刷新
    const payload = {
      Brand: formData.Brand,
      Model: formData.Model,
      AccelSec: parseFloat(formData.AccelSec),
      TopSpeed_KmH: parseInt(formData.TopSpeed_KmH, 10),
      Range_Km: parseInt(formData.Range_Km, 10),
      Efficiency_WhKm: parseInt(formData.Efficiency_WhKm, 10),
      FastCharge_KmH: parseInt(formData.FastCharge_KmH, 10),
      RapidCharge: formData.RapidCharge,
      PowerTrain: formData.PowerTrain,
      PlugType: formData.PlugType,
      BodyStyle: formData.BodyStyle,
      Segment: formData.Segment,
      Seats: parseInt(formData.Seats, 10),
      PriceEuro: parseFloat(formData.PriceEuro),
      Date: formData.Date,
    };
    console.log(payload);

    try {
      if (editData) {
        const response = await axios.put(
          `http://localhost:7123/api/cars/${editData._id}`,
          formData
        );
        console.log("Data updated successfully:", response.data);
      } else {
        const response = await axios.post(
          "http://localhost:7123/api/cars",
          payload
        );
        console.log("Data submitted successfully:", response.data);
        setFormData(initialFormData);
      }
      onClose();
      onRefresh();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="container mx-auto p-8 flex flex-col items-center gap-3">
        <DialogTitle>
          {editData ? "Edit Car Data" : "Add New Car Data"}
        </DialogTitle>

        <form className="grid grid-cols-3 gap-5 w-full ">
          {Object.keys(CAR_FORM_FIELDS).map((key) => (
            <FormField
              key={key}
              id={key}
              label={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleInputChange}
              disabled={!isEditable}
            />
          ))}
        </form>

        <DialogActions className="flex gap-2 mt-5">
          {!isEditable && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsEditable(true)}
            >
              Update
            </Button>
          )}
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {isEditable && (
            <Button color="primary" onClick={handleSubmit} type="submit">
              Submit
            </Button>
          )}
        </DialogActions>
      </div>
    </Dialog>
  );
}

interface SimpleDialogDemoProps {
  onRefresh: () => void;
  open: boolean;
  onClose: () => void;
  editData: CarModel | null;
  onAdd: () => void;
}

export default function SimpleDialogDemo({
  onRefresh,
  open,
  onClose,
  editData,
  onAdd,
}: SimpleDialogDemoProps) {
  // const [isSubmitting, setIsSubmitting] = React.useState(false);

  // const handleStartSubmitting = () => setIsSubmitting(true);
  // const handleStopSubmitting = () => setIsSubmitting(false);
  return (
    <div>
      <Button
        variant="outlined"
        onClick={onAdd}
        // disabled={isSubmitting}
      >
        Add Car
      </Button>
      <SimpleDialog
        open={open}
        onClose={onClose}
        onRefresh={onRefresh}
        editData={editData}
        // onStartSubmitting={handleStartSubmitting}
        // onStopSubmitting={handleStopSubmitting}
      />
    </div>
  );
}
