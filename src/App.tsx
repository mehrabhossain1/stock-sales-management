import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard";
// import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<DashboardPage />} />
          {/* <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/add" element={<AddInventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/add" element={<AddSale />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
