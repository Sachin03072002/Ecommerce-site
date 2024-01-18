import { Grid } from "@mui/material";
import React from "react";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";
import OrderTable from "../view/OrderTable";
import ProductTable from "../view/ProductTable";

const AdminDashboard = () => {
  return (
    <div className="p-10 overflow-x-hidden overflow-y-scroll h-[100vh]">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <div className="shadow-lg shadow-grey-600">
            <Achievement />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="shadow-lg shadow-grey-600">
            <MonthlyOverview />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="shadow-lg shadow-grey-600">
            <OrderTable />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="shadow-lg shadow-grey-600">
            <ProductTable />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
