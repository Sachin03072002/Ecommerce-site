import React, { useEffect } from "react";
import MainCarosel from "../../Components/HomeCarosel/MainCarosel";
import HomeSectionCarosel from "../../Components/HomeSectionCarosel/HomeSectionCarosel";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../State/Product/Action";

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products);

  // Array of category names
  const categories = [
    "kurtas",
    "mens_shoes",
    "mens_shirts",
    "womens_saree",
    "womens_dress",
  ];

  useEffect(() => {
    // Fetch products for each category
    categories.forEach((category) => {
      const data = {
        category,
        colors: [],
        size: [],
        minPrice: 0,
        maxPrice: 1000000,
        minDiscount: 0,
        sort: "price_low",
        pageNumber: 1,
        pageSize: 10,
        stock: "",
      };

      dispatch(findProducts(data));
    });
  }, [dispatch, findProducts]);

  return (
    <>
      <MainCarosel />
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        {categories.map((category) => {
          const categoryProducts = products?.products?.content?.filter(
            (product) => product.category.name === category
          );

          return (
            categoryProducts && (
              <HomeSectionCarosel
                key={category}
                data={categoryProducts}
                sectionName={category.toUpperCase()}
              />
            )
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
