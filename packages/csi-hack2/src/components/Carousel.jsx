import { Box, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import goodies from "../assets/prizes.png";
import main from "../assets/main.png";
import domain from "../assets/ps.png";
import timeline from "../assets/timeline.png";

function CarouselHomePage() {
  var items = [main, domain, timeline, goodies];

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
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        height: isMobile ? "max-content" : "100vh",
        maxHeight: isMobile ? null : "43rem",
        border: 0,
      }}
    >
      <img src={props.item} width="100%" alt="Idea" />
    </Box>
  );
}

export default CarouselHomePage;
