import HomePage from "./customer/Pages/HomePage/HomePage";
import Navigation from "./customer/Components/Navigation/Navigation";
import Footer from "./customer/Components/Footer/Footer";
import Product from "./customer/Components/Product/Product";
function App() {
  return (
    <div className="App">
      <Navigation />
      <div>
        {/* <HomePage /> */}
        <Product />
      </div>
      <Footer />
    </div>
  );
}

export default App;

