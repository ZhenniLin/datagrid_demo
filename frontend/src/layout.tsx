/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import DataGridContainer from "./components/DataGrindContainer";
import SimpleDialogDemo from "./components/dialog";
import Header from "./components/Header";
import CarModel from "./models/CarModel";
import { fetchCars, searchCarsByBrand } from "./services/carServices";
import { Button } from "@mui/material";

const Layout = () => {
  const [rowData, setRowData] = useState<CarModel[]>([]);
  const [editData, setEditData] = useState<CarModel | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchBrand, setSearchBrand] = useState<string>("");

  const fetchCarData = async () => {
    try {
      const data = await fetchCars();
      setRowData(data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const searchCar = async () => {
    try {
      if (!searchBrand.trim()) {
        // 如果搜索框为空，获取所有数据
        fetchCarData();
        return;
      }

      const newData = await searchCarsByBrand(searchBrand);
      setRowData(newData);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  const handleOpenDialog = (data?: CarModel) => {
    setEditData(data || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditData(null); // 清除编辑数据
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto flex gap-[4rem] p-[2rem]">
        <div className="border-b-2 flex flex-col gap-5">
          <Header title="DataGrid App ." />
          <div className="flex gap-2  flex-col items-start border-b-2 pb-8">
            <input
              type="text"
              placeholder="Search by Brand"
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full text-sm"
            />
            <Button
              variant="outlined"
              sx={{ fontSize: "12px" }}
              onClick={searchCar}
            >
              Search
            </Button>
          </div>
          <SimpleDialogDemo
            open={dialogOpen}
            onClose={handleCloseDialog}
            onRefresh={fetchCarData}
            editData={editData}
            onAdd={() => handleOpenDialog()}
          />
        </div>
        <DataGridContainer
          rowData={rowData}
          onRefresh={fetchCarData}
          onEdit={handleOpenDialog}
        />
      </div>
    </div>
  );
};

export default Layout;
