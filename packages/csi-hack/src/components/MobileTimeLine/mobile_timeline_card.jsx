import "react";
import PropTypes from "prop-types";
import { MdRocket } from "react-icons/md";
import { Box, Typography } from "@mui/material";

const MobileTimelineCard = ({ number, text }) => {
    return (
        <Box
            sx={{
                position: "relative",
                backgroundColor: "#2846AA",
                color: "white",
                padding: 2,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                border: "1px solid white",
                width: 300,
                height: 130,
                marginBottom: 3,
                
            }}
        >
            {/* Number on left border in middle */}
            <Box
                sx={{
                    position: "absolute",
                    left: -3,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                    height: 56,
                    width: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "6rem",
                }}
            >
                <span>{number}</span>
            </Box>

            {/* Icon and Text */}
            <MdRocket style={{ color: "white", fontSize: "5rem", transform: "rotate(45deg)", marginLeft: 20 }} />
            <Typography variant="h6" component="p">
                {text}
            </Typography>
        </Box>
    );
};

MobileTimelineCard.propTypes = {
    number: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
};

export default MobileTimelineCard;