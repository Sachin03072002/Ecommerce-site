import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { mens_kurta } from "../../../Data/mens_kurta";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts, findProductsById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";
import { getAllRatingsReviews } from "../../../State/Rating/Action";
import ProductSectionCard from "../Product/ProductSectionCard";

const product = {
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const calculateRatingDistribution = (ratings) => {
  if (!Array.isArray(ratings)) {
    console.error("Invalid ratings data:", ratings);
    return {
      averageRating: 0,
      ratingDistribution: {
        excellent: 0,
        veryGood: 0,
        good: 0,
        average: 0,
        poor: 0,
      },
      percentageDistribution: {
        excellent: 0,
        veryGood: 0,
        good: 0,
        average: 0,
        poor: 0,
      },
    };
  }

  const totalRatings = ratings.length;

  if (totalRatings === 0) {
    return {
      averageRating: 0,
      ratingDistribution: {
        excellent: 0,
        veryGood: 0,
        good: 0,
        average: 0,
        poor: 0,
      },
      percentageDistribution: {
        excellent: 0,
        veryGood: 0,
        good: 0,
        average: 0,
        poor: 0,
      },
    };
  }

  const averageRating =
    ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings;

  const ratingDistribution = {
    excellent: 0,
    veryGood: 0,
    good: 0,
    average: 0,
    poor: 0,
  };

  ratings.forEach((rating) => {
    if (rating.rating >= 4.5) {
      ratingDistribution.excellent += 1;
    } else if (rating.rating >= 4.0) {
      ratingDistribution.veryGood += 1;
    } else if (rating.rating >= 3.5) {
      ratingDistribution.good += 1;
    } else if (rating.rating >= 3.0) {
      ratingDistribution.average += 1;
    } else {
      ratingDistribution.poor += 1;
    }
  });

  const percentageDistribution = {
    excellent: (ratingDistribution.excellent / totalRatings) * 100,
    veryGood: (ratingDistribution.veryGood / totalRatings) * 100,
    good: (ratingDistribution.good / totalRatings) * 100,
    average: (ratingDistribution.average / totalRatings) * 100,
    poor: (ratingDistribution.poor / totalRatings) * 100,
  };
  return { averageRating, ratingDistribution, percentageDistribution };
};

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { products, rating } = useSelector((store) => store);

  const handleAddToCart = () => {
    const data = { productId: params.productId, size: selectedSize.name };
    console.log("Add item to cart", data);
    dispatch(addItemToCart(data));
    navigate("/cart");
  };
  useEffect(() => {
    const productId = params.productId?.toString();
    const data = { productId };
    dispatch(findProductsById(data));
    dispatch(getAllRatingsReviews(productId));
  }, [params.productId, dispatch]);
  const ratings = rating.ratingsReviews.ratings;
  const { averageRating, ratingDistribution, percentageDistribution } =
    calculateRatingDistribution(ratings);
  console.log("average", ratings);
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
  }, []);
  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          {/* <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol> */}
        </nav>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={products.product?.imageUrl}
                alt="ima"
                className="h-full w-full object-cover object-center"
              />
            </div>
            {/* <div className="flex flex-wrap space-x-5 justify-center">
              {product.images.map((image) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4 ">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div> */}
          </div>
          {/* Product info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {products.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                {products.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold">
                  ₹{products.product?.discountedPrice}
                </p>
                <p className="opactiy-50 line-through">
                  ₹{products.product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {products.product?.discountedPercent + "% OFF"}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={3.5} readOnly />
                  <p className="opacity-50 text-sm text-indigo-600 hover:text-indigo-500 font-semibold">
                    {products.product?.ratings?.length} Ratings & Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  sx={{
                    px: "2rem",
                    py: "1rem",
                    bgColor: "#9155fd",
                    marginTop: "2rem",
                  }}
                >
                  Add to Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {products?.product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* rating and reviews  */}
        <section className="pt-10">
          <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
          <div className="border p-5 space-y-5 md:flex md:space-y-0">
            <div className="md:w-7/12">
              <div className="space-y-5">
                {rating.ratingsReviews.ratings?.map((item) => (
                  <ProductReviewCard key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="md:w-5/12">
              <h1 className="text-xl font-semibold pb-2">Product Ratings</h1>
              <div className="flex flex-col md:flex-row items-center md:space-x-3">
                <Rating value={averageRating} precision={0.5} readOnly />
                <p className="opacity-60 mt-2 md:mt-0">
                  {rating.length} Ratings
                </p>
              </div>
              <Box className="mt-5 space-y-3">
                {Object.keys(percentageDistribution).map((ratingLevel) => (
                  <Grid container alignItems="center" gap={3} key={ratingLevel}>
                    <Grid item xs={2}>
                      <p>
                        {ratingLevel.charAt(0).toUpperCase() +
                          ratingLevel.slice(1)}
                      </p>
                    </Grid>
                    <Grid item xs={10} md={7}>
                      <LinearProgress
                        sx={{
                          bgColor: "#d0d0d0",
                          borderRadius: 4,
                          height: 7,
                        }}
                        variant="determinate"
                        value={percentageDistribution[ratingLevel]}
                        color={
                          ratingLevel === "excellent"
                            ? "success"
                            : ratingLevel === "poor"
                            ? "error"
                            : "warning"
                        }
                      />
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </div>
          </div>
        </section>

        {/* similar products  */}
        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Similar Products</h1>
          <div className="flex flex-wrap space-y-5">
            {products?.products?.content?.slice(0, 20).map((item) => (
              <ProductSectionCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
