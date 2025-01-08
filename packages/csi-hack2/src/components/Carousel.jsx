import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, colors } from "@mui/material";

function CarouselHomePage(props) {
  var items = [
    "https://www.sih.gov.in/img1/slider/PM-Banner-Website-Hindi.png",
    "https://www.sih.gov.in/img1/slider/sih2024-winner-slider-banner.png",
    "https://www.sih.gov.in/img1/slider/sih-warning-slider.png",
    "https://www.sih.gov.in/img1/slider/banner-4.png",
    "https://www.sih.gov.in/img1/slider/banner-3.png",
  ];

  return (
    <Carousel
      activeIndicatorIconButtonProps={{
        style: {
          color: "#f16822",
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <Box width="100%" height="max-content">
        <img src={props.item} width="100%" alt="Idea" />
      </Box>
    </Paper>
  );
}

export default CarouselHomePage;
