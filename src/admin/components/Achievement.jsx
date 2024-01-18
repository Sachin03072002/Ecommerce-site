import { Button, Card, CardContent, Typography, styled } from "@mui/material";
import React from "react";

const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 117,
  position: "absolute",
});
const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});
const Achievement = () => {
  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Shop With Me 😀
        </Typography>
        <Typography variant="body2">Congratulations</Typography>
        <Typography variant="h5" sx={{ my: 3.1 }}>
          420.8k
        </Typography>
        <Button size="small" variant="contained">
          View Sales
        </Button>
        <TriangleImg src="https://th.bing.com/th/id/R.e4ff4360872f5d471123f93ca01b3a4d?rik=4HcsG3ru8pJrzg&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2ftrophy-clipart-transparent%2ftrophy-clipart-transparent-15.png&ehk=LYh855tVtmYr1mcppjiiJS6aG5tHsA3RJ6frI%2fX7f44%3d&risl=&pid=ImgRaw&r=0"></TriangleImg>
        <TrophyImg src=""></TrophyImg>
      </CardContent>
    </Card>
  );
};

export default Achievement;
