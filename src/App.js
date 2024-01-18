import { Routes, Route } from "react-router-dom";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminRouters from "./Routers/AdminRouters";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminRouters />} />
      </Routes>
    </div>
  );
}

export default App;
