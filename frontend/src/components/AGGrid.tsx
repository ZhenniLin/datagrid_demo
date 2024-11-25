/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import CarModel from "../models/CarModel";

interface AGGridProps {
  rowData: CarModel[];
  columnDefs: ColDef<CarModel>[];
  defaultColDef: ColDef;
  onGridReady: (params: any) => void;
  // cars: CarModel[];
}

const AGGrid: React.FC<AGGridProps> = ({
  rowData,
  columnDefs,
  defaultColDef,
  onGridReady,
}) => {
  const pagination = true;
  const paginationPageSize = 15;
  const paginationPageSizeSelector = [10, 15, 50, 100];
  return (
    <div className="ag-theme-quartz" style={{ height: "42rem", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        suppressCellFocus={true}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
};

export default AGGrid;
