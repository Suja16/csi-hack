import { Box, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import goodies from "../assets/prizes.png";
import main from "../assets/main.png";
import domain from "../assets/ps.png";
import timeline from "../assets/timeline.png";
import goodiesMobile from "../assets/goodiesMobile.png";
import mainMobile from "../assets/mainMobile.png";
import domainMobile from "../assets/domainMobile.png";
import timelineMobile from "../assets/timelineMobile.png";

function CarouselHomePage() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const items = isMobile
    ? [mainMobile, domainMobile, timelineMobile, goodiesMobile]
    : [main, domain, timeline, goodies];

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
  const isMobile = useMediaQuery("(max-width:900px)");
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
