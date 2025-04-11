import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodExplorer from "../Components/FoodExplorer";
import ProductDetail from "../Components/Product";
import Categories from "../Components/Categories";
// import OtherComponent from './pages/OtherComponent'; // Add more pages here

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodExplorer />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:category" element={<Categories />} />

      </Routes>
    </Router>
  );
};

export default App;
