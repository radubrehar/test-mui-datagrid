import { useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";

import { StyledEngineProvider } from "@mui/material/styles";

const genColumns = [
  ...Array.from({ length: 100 }, (_, i) => ({
    field: `col-${i}`,
    width: 200,
  })),
];

const columns = [
  { field: "id", width: 200 },
  { field: "make", width: 200 },
  { field: "model", width: 200 },
  { field: "price", width: 200 },

  // generate 100 more columns
  ...genColumns,
];

function addColPropsToObject(obj) {
  return genColumns.reduce((acc, col, i) => {
    acc[`col-${i}`] = `${col.field} - ${obj.id}`;
    return acc;
  }, obj);
}

const rowData = [
  addColPropsToObject({
    make: "Tesla",
    model: "Model Y",
    price: 64950,
    electric: true,
    id: "x",
  }),
  addColPropsToObject({
    make: "Ford",
    model: "F-Series",
    price: 33850,
    electric: false,
    id: "y",
  }),
  addColPropsToObject({
    make: "Toyota",
    model: "Corolla",
    price: 29600,
    electric: false,
    id: "z",
  }),
  // generate another 1000 rows
  ...Array.from({ length: 1000 }, (_, i) =>
    addColPropsToObject({
      make: `Make ${i}`,
      model: `Model ${i}`,
      id: `id-${i}`,
      price: Math.floor(Math.random() * 100000),
      electric: Math.random() > 0.5,
    })
  ),
];

const getRowId = (data) => data.id;

function getColumns() {
  const cols = [...columns];
  const count = localStorage.getItem("columnCount") * 1 || 4;
  cols.length = count;
  return cols;
}

const GridExample = () => {
  const [colDefs, setColDefs] = useState(getColumns);

  const setColumnCount = (value) => {
    localStorage.setItem("columnCount", value);
    setColDefs(getColumns());
  };

  return (
    <StyledEngineProvider injectFirst>
      <div>
        Grid height: <b>500px</b>. Row height: <b>18px</b>. Row count{" "}
        <b>{rowData.length}</b>. Column count{" "}
        <select
          value={localStorage.getItem("columnCount") || 4}
          onChange={(event) => {
            setColumnCount(event.target.value);
          }}
        >
          <option value="4">4</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div
          style={{ height: "500px", width: "100vw", background: "white" }} // the grid will fill the size of the parent container
        >
          <DataGridPro
            getRowId={getRowId}
            rows={rowData}
            columns={colDefs}
            rowHeight={18}
            rowBufferPx={0}
            columnBufferPx={0}
          />
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default GridExample;
