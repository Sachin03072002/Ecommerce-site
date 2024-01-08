import HomePage from "./customer/Pages/HomePage/HomePage";
import Navigation from "./customer/Components/Navigation/Navigation";
import Footer from "./customer/Components/Footer/Footer";
import Product from "./customer/Components/Product/Product";
import ProductDetails from "./customer/Components/ProductDetails/ProductDetails";
import Cart from "./customer/Components/Cart/Cart";
import Checkout from "./customer/Checkout/Checkout";
function App() {
  return (
    <div className="App">
      <Navigation />
      <div>
        {/* <HomePage /> */}
        {/* <Product /> */}
        {/* <ProductDetails /> */}
        {/* <Cart /> */}
        <Checkout />
      </div>
      <Footer />
    </div>
  );
}


export default App;


