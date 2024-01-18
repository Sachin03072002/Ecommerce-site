import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../State/Auth/Action";
import { Avatar, Button, Grid } from "@mui/material";
import GradingIcon from "@mui/icons-material/Grading";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]);
  const handleGoToCart = () => {
    navigate("/cart");
  };
  const handleGoToOrder = () => {
    navigate(`/account/order/user/${auth.user._id}`);
  };
  return (
    <div>
      <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-700 shadow-xl rounnded-md">
        <div className="ml-3 h-[15rem] flex justify-center items-center">
          {auth.user?.firstName ? (
            <>
              <div className="flex">
                <div className="mr-6">
                  <Avatar
                    className="text-white"
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      cursor: "pointer",
                      height: "10rem",
                      width: "10rem",
                      fontSize: "5rem",
                    }}
                  >
                    {auth.user?.firstName[0].toUpperCase()}
                  </Avatar>
                </div>
                <div className="flex flex-col justify-center ">
                  <Grid
                    className="text-white font-semibold text-xl "
                    xs={12}
                    lg={6}
                  >
                    Name: {auth.user.firstName + " " + auth.user.lastName}
                  </Grid>
                  <Grid
                    className="text-white font-semibold text-xl "
                    xs={12}
                    lg={6}
                  >
                    Email: {auth.user.email}
                  </Grid>
                  <Grid
                    className="text-white font-semibold text-xl "
                    xs={12}
                    lg={6}
                  >
                    Phone: {auth.user.mobile ? auth.user.mobile : "--"}
                  </Grid>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="grid rounded-2xl divide-y divide-dashed hover:divide-solid  justify-evenly bg-gray-50 dark:bg-gray-300 m-3 mt-10 grid-cols-3">
        <div className="col-span-1  p-3">
          <div className="flex flex-col items-center ">
            <a href="">
              <Button
                className="tr-300 flex felx-col"
                onClick={() => handleGoToOrder()}
              >
                <GradingIcon sx={{ height: "3rem", width: "3rem" }} />
                <span className="text-lg font-medium">My Orders</span>
              </Button>
            </a>
          </div>
        </div>
        <div className="col-span-1  p-3">
          <div className="flex flex-col items-center ">
            <a href="">
              <Button
                className="tr-300 flex felx-col"
                onClick={() => handleGoToCart()}
              >
                <ShoppingCartIcon sx={{ height: "3rem", width: "3rem" }} />
                <span className="text-lg font-medium">My Cart</span>
              </Button>
            </a>
          </div>
        </div>
        <div className="col-span-1  p-3">
          <div className="flex flex-col items-center ">
            <a href="">
              <Button className="tr-300 flex felx-col">
                <FavoriteIcon sx={{ height: "3rem", width: "3rem" }} />
                <span className="text-lg font-medium">WishList</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
