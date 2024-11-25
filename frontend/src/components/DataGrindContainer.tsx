/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import AGGrid from "./AGGrid";
import CarModel from "../models/CarModel";
import { ColDef } from "ag-grid-community";
import { Button, debounce } from "@mui/material";
import { deleteCar } from "../services/carServices";
import { useNavigate } from "react-router-dom";

interface DataGridContainerProps {
  rowData: CarModel[];
  onRefresh: () => void;
  onEdit: (data: CarModel) => void;
}

const DataGridContainer = ({
  rowData,
  onRefresh,
  onEdit,
}: DataGridContainerProps) => {
  const navigate = useNavigate();
  const handleViewDetails = (id: string) => {
    navigate(`/${id}`);
  };
  const [gridApi, setGridApi] = useState<any | null>(null);
  const [colDefs] = useState<ColDef<CarModel>[]>([
    {
      headerName: "ID",
      valueGetter: (params) => (params.node as any).rowIndex + 1,
      sortable: true,
      minWidth: 80,
      filter: false,
    },
    // basic information
    {
      field: "Brand",
      filter: false,
      // filter: "agTextColumnFilter",
      // filterParams: {
      //   filterOptions: ["contains"],
      //   debounceMs: 200,
      //   maxNumConditions: 1,
      // },
    },
    {
      field: "Model",
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["contains"],
        debounceMs: 200,
        maxNumConditions: 1,
      },
    },
    // {
    //   field: "BodyStyle",
    //   filter: "agTextColumnFilter",
    //   filterParams: {
    //     filterOptions: ["contains"],
    //     debounceMs: 200,
    //     maxNumConditions: 1,
    //   },
    // },
    {
      field: "Segment",
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["equals"],
        debounceMs: 200,
        maxNumConditions: 1,
      },
    },
    // price and data
    {
      field: "PriceEuro",
      // filter: "agNumberColumnFilter",
      // filterParams: {
      //   filterOptions: ["Greater than", "Equals", "Less than"],
      //   debounceMs: 200,
      //   // maxNumConditions: 1,
      // },
    },
    // { field: "Date" },

    // Actions column
    {
      headerName: "Actions",
      cellRenderer: (params: any) => {
        // Render two buttons: "UPDATE" and "DELETE"
        return (
          <div className="flex gap-2 pt-1">
            <Button
              variant="outlined"
              color="success"
              onClick={() => handleViewDetails(params.node.data._id)}
              className="size-8"
              sx={{ fontSize: "12px" }}
            >
              VIEW
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onEdit(params.node.data)}
              className="size-8"
              sx={{ fontSize: "12px" }}
            >
              UPDATE
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(params.node.data._id)}
              className="size-8"
              sx={{ fontSize: "12px" }}
            >
              DELETE
            </Button>
          </div>
        );
      },
      minWidth: 250,
      filter: false,
    },

    // detailed information
    // performance
    // { field: "AccelSec" },
    // { field: "TopSpeed_KmH" },
    // { field: "Range_Km" },
    // efficiency
    // { field: "Efficiency_WhKm" },
    // { field: "FastCharge_KmH" },
    // { field: "RapidCharge" },
    // powertrain
    // { field: "PowerTrain" },
    // { field: "PlugType" },
    // capacity
    // { field: "Seats" },
  ]);
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
  const [formData, setFormData] = useState(initialFormData);

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    minWidth: 150,
    resizable: true,
  };
  const onGridReady = (params: any) => {
    setGridApi(params);
    params.columnApi.autoSizeAllColumns();
  };

  const handleDelete = async (id: any) => {
    try {
      const confirm = window.confirm(
        "Are you sure, you want to delete this row"
      );
      if (confirm) {
        const deletedData = await deleteCar(id);
        if (deletedData) {
          console.log("Delete successful:", deletedData);
          // await fetchCarData();
          onRefresh();
        } else {
          console.error("Failed to delete the item.");
        }
      }
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  return (
    <AGGrid
      rowData={rowData}
      columnDefs={colDefs}
      defaultColDef={defaultColDef}
      onGridReady={onGridReady}
    />
  );
};

export default DataGridContainer;
