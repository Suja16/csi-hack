import "react";
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from '@mui/material/Grid2';

const FAQSection = () => {
return (
    <Box sx={{ backgroundColor: "white", py: 10, px: 5 , mx: 5 , borderRadius: "40px"}}>
        <Grid container spacing={2} justifyContent="center">
            {/* Left Side: Heading and Button */}
            <Grid item xs={12} md={5}>
                <Typography variant="h4" sx={{ color: "#000", fontWeight: "bold", mb: 2 }}>
                    Frequently Asked Questions
                </Typography>
                <Typography variant="body1" sx={{ color: "#6b6b6b", mb: 3 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
                </Typography>
                <Button variant="contained" size="large" sx={{ backgroundColor: "#FF0505", color: "#fff", textTransform: "none", fontWeight: "bold", borderRadius: "20px", "&:hover": { backgroundColor: "#d50000" },}} >
                    Ask A Question &gt;
                </Button>
            </Grid>

            {/* Right Side: FAQs */}
            <Grid item xs={12} md={6}>
                {/* Question 1 */}
                <Accordion sx={{ mb: 2, border: "1px solid black", bgcolor: "white", borderRadius: "10px", boxShadow: "none", "&:before": { display: "none" }, overflow: "hidden", "&:first-of-type": { borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#fff",  }}>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* Question 2 */}
                <Accordion sx={{ mb: 2, border: "1px solid black", bgcolor: "white", borderRadius: "10px", boxShadow: "none", "&:before": { display: "none" }, overflow: "hidden", }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#fff",  }}>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* Question 3 */}
                <Accordion sx={{ mb: 2, border: "1px solid black", bgcolor: "white", borderRadius: "10px", boxShadow: "none", "&:before": { display: "none" }, overflow: "hidden", }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#fff",  }}>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* Question 4 */}
                <Accordion sx={{ mb: 2, border: "1px solid black", bgcolor: "white", borderRadius: "10px", boxShadow: "none", "&:before": { display: "none" }, overflow: "hidden", "&:first-of-type": { borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#fff",  }}>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <div></div>
            </Grid>
        </Grid>
    </Box>
);
};

export default FAQSection;
