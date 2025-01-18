import * as React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  IconButton,
  useMediaQuery,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Popup from "../../../ui/popup";

export default function CustomizedDialogs({
  title,
  majorArea,
  subArea,
  description,
  fullContent,
  imgValue,
}) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:500px)");

  return (
    <React.Fragment>
      <Card
        sx={{
          width: "100%",
          maxWidth: { xs: 340, sm: 400 },
          height: "100%",
          borderRadius: "60px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 16px rgba(0, 0, 0, 0.1)",
          },
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => setOpen(true)}
      >
        <CardActionArea
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <CardMedia
            component="img"
            height="200" // Adjust as needed
            image={imgValue}
            alt={title}
            sx={{ objectFit: "", flexShrink: 0, objectPosition: "top" }}
          />

          <Box
            sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 160,
                left: 0,
                right: 0,
                height: "3rem",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 200%)",
              }}
            />
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mb: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                flexGrow: 1, // Allow description to take up available space
                mb: 2,
              }}
            >
              {description}
            </Typography>

            <Typography
              variant="caption"
              sx={{ color: "primary.main", fontWeight: 600, mt: "auto" }}
            >
              Click to learn more
            </Typography>
          </Box>
        </CardActionArea>
      </Card>

      <Popup
        dialogProps={{
          open,
          onClose: () => setOpen(false),
          maxWidth: "lg",
          fullWidth: true,
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant={isMobile ? "h5" : "h4"}
          color="primary"
          sx={{ fontWeight: 700, mb: 3 }}
        >
          {majorArea}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Sub Area: {subArea}
          </Typography>

          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{ color: "error.main", fontWeight: 600, mb: 2 }}
          >
            Problem Statement:
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontWeight: 500, mb: 3, color: "text.primary" }}
          >
            {title}
          </Typography>

          <Typography
            variant="h6"
            color="primary"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Expected Outcome:
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {description}
          </Typography>

          <Box
            sx={{
              "& h2, & h3": {
                color: "primary.main",
                mt: 4,
                mb: 2,
                fontWeight: 600,
              },
              "& p": {
                mb: 2,
                lineHeight: 1.7,
              },
              "& ul": {
                pl: 3,
                mb: 3,
              },
              "& li": {
                mb: 1,
              },
              "& strong": {
                color: "text.primary",
                fontWeight: 600,
              },
            }}
            dangerouslySetInnerHTML={{ __html: fullContent }}
          />
        </Box>
      </Popup>
    </React.Fragment>
  );
}
