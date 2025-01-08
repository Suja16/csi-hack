import "react";
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from '@mui/material/Grid2';
import data from "../assets/faqs.json"

const FAQSection = () => {
return (
    <Box sx={{ backgroundColor: "white", py: 5, px: 3, mx: { xs: 1, md: 5 }, borderRadius: "40px" }}>
        <Grid container spacing={4} justifyContent="start">
            {/* Left Side: Heading and Button */}
            <Grid item xs={12} md={5} >
                <Typography variant="h4" sx={{ color: "#000", fontWeight: "bold", mb: 2, fontSize: { xs: "1.5rem", md: "2.125rem" } }}>
                    Frequently Asked Questions
                </Typography>
                <Button variant="contained" size="large" sx={{ backgroundColor: "#FF0505", color: "#fff", textTransform: "none", fontWeight: "bold", borderRadius: "20px", "&:hover": { backgroundColor: "#d50000" }, fontSize: { xs: "0.75rem", md: "0.875rem" }, padding: { xs: "6px 12px", md: "8px 16px" } }}>
                    Ask A Question &gt;
                </Button>
            </Grid>

            {/* Right Side: FAQs */}
            <Grid item xs={8} md={6}>
              {data.map((d, index) => (
                  <Accordion
                      key={index} // Use a unique key for each item
                      sx={{
                          mb: 2,
                          border: "1px solid black",
                          bgcolor: "white",
                          borderRadius: "10px",
                          boxShadow: "none",
                          "&:before": { display: "none" },
                          overflow: "hidden",
                          "&:first-of-type": {
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px"
                          }
                      }}
                  >
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{ backgroundColor: "#fff" }}
                      >
                          <Typography sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}>
                              {d.question}
                          </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                          <Typography sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}>
                              {d.answer}
                          </Typography>
                      </AccordionDetails>
                  </Accordion>
              ))}

                <div></div>
            </Grid>
        </Grid>
    </Box>
);
};

export default FAQSection;
