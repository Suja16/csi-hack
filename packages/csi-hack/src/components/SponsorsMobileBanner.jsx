import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import somaiyaLogo from "../assets/somaiya_logo.png";
import euclidLogo from "../assets/Euclid_logo.png";

function SponsorsMobileBanner(props) {
  const items = [somaiyaLogo, euclidLogo];
  return (
    <Box position={"relative"} zIndex={10}>
      <Typography variant="h4" align="center" color="white" marginBottom={3}>
        In Association with
      </Typography>
      <Carousel
        next={(next, active) =>
          console.log(`we left ${active}, and are now at ${next}`)
        }
        prev={(prev, active) =>
          console.log(`we left ${active}, and are now at ${prev}`)
        }
        indicatorIconButtonProps={{
          style: {
            padding: "10px", // 1
            color: "white", // 3
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "red", // 2
          },
        }}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Box>
  );
}

function Item(props) {
  return (
    <Box>
      <Box
        width={"70%"}
        marginX={"auto"}
        display={"flex"}
        justifyContent={"center"}
        height={"100px"}
        alignItems={"center"}
      >
        <Paper>
          <img
            src={props.item}
            alt="Somaiya University"
            style={{
              marginLeft: "0",
              marginRight: "10px",
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default SponsorsMobileBanner;
