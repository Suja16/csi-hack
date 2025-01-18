import { Box, useMediaQuery, useTheme } from "@mui/material";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Carousel from "react-material-ui-carousel";

import main from "@assets/carousel/desktop/main.png";
import prizes from "@assets/carousel/desktop/prizes.png";
import domain from "@assets/carousel/desktop/domain.png";
import special from "@assets/carousel/desktop/special.png";
import timeline from "@assets/carousel/desktop/timeline.png";

import mainMobile from "@assets/carousel/mobile/main.png";
import prizesMobile from "@assets/carousel/mobile/prizes.png";
import domainMobile from "@assets/carousel/mobile/domain.png";
import specialMobile from "@assets/carousel/mobile/special.png";
import timelineMobile from "@assets/carousel/mobile/timeline.png";

const CarouselHomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:900px)");
  const items = isMobile
    ? [mainMobile, prizesMobile, domainMobile, specialMobile, timelineMobile]
    : [main, prizes, domain, special, timeline];

  const carouselRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      carouselRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
    );
  }, []);

  return (
    <div ref={carouselRef}>
      <Carousel
        activeIndicatorIconButtonProps={{
          style: {
            color: theme.palette.secondary.main,
          },
        }}
      >
        {items.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

const CarouselItem = ({ item }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        border: 0,
      }}
    >
      <img src={item} width="100%" alt="Carousel Item" />
    </Box>
  );
};

export default CarouselHomePage;
