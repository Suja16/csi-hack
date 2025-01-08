import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, useMediaQuery, Button, Box, colors } from "@mui/material";
import main from "../assets/nodatebanner.png";
import domain from "../assets/ps.png";
import timeline from "../assets/timeline.png";

function CarouselHomePage(props) {
  var items = [main, domain, timeline];

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
  const isMobile = useMediaQuery("(max-width:500px)");
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: isMobile ? "0.5rem" : null,
        height: isMobile ? "230px" : "100vh",
        maxHeight: isMobile ? null : "780px",
        border: 0,
      }}
    >
      <img src={props.item} width="100%" alt="Idea" />
    </Box>
  );
}

export default CarouselHomePage;
