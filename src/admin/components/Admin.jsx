import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import AddCardIcon from "@mui/icons-material/AddCard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CreateProductForm from "./CreateProductForm";
import ProductsTable from "./ProductsTable";
import OrdersTable from "./OrdersTable";
import CustomerTable from "./CustomerTable";
import AdminDashboard from "./Dashboard";
const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <Inventory2Icon /> },
  { name: "Customers", path: "/admin/customers", icon: <SupportAgentIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <LowPriorityIcon /> },
  { name: "AddProduct", path: "/admin/product/create", icon: <AddCardIcon /> },
];
const Admin = () => {
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* {isLargeScreen && <Toolbar />} */}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <div className="flex h-[100vh]">
        <CssBaseline />
        <div className="w-[15%] border border-r-gray-300 h-full sticky">
          {drawer}
        </div>
        <div className="w-[85%]">
          <Routes>
            <Route path="/" element={<AdminDashboard />}></Route>
            <Route
              path="/product/create"
              element={<CreateProductForm />}
            ></Route>
            <Route path="/products" element={<ProductsTable />}></Route>
            <Route path="/orders" element={<OrdersTable />}></Route>
            <Route path="/customers" element={<CustomerTable />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
