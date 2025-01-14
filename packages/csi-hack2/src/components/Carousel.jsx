import { Box, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import goodies from "../assets/prizes.png";
import main from "../assets/main.png";
import domain from "../assets/ps.png";
import timeline from "../assets/timeline.png";
import special from "../assets/special.png";
import goodiesMobile from "../assets/goodiesMobile.png";
import mainMobile from "../assets/mainMobile.png";
import domainMobile from "../assets/domainMobile.png";
import timelineMobile from "../assets/timelineMobile.png";
import specialMobile from "../assets/specialMobile.png"

const CarouselHomePage = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const items = isMobile
    ? [mainMobile, domainMobile, timelineMobile, goodiesMobile, specialMobile]
    : [main, domain, timeline, goodies, special];

  return (
    <Carousel
      activeIndicatorIconButtonProps={{
        style: {
          color: "#f16822",
        },
      }}
    >
      {items.map((item, index) => (
        <CarouselItem key={index} item={item} />
      ))}
    </Carousel>
  );
};

const CarouselItem = ({ item }) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        height: isMobile ? "max-content" : "100vh",
        maxHeight: isMobile ? null : "48rem",
        border: 0,
      }}
    >
      <img src={item} width="100%" alt="Carousel Item" />
    </Box>
  );
};

export default CarouselHomePage;
