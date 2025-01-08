import  { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FAQ = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const faqData = [
        {
            question: "What is a hackathon?",
            answer: "A hackathon is a social coding event where programmers, designers, and developers collaborate to solve problems and compete against other teams for prizes."
        },
        {
            question: "How long is the hackathon?",
            answer: "The duration of the hackathon will be for 24 hours."
        },
        {
            question: "How many members can be in a team?",
            answer: "Teams must consist of 4 members only, with at least one female member."
        },
        {
            question: "Is there a registration fee for the event?",
            answer: "The event is complimentary, including all amenities, catering services, and resources required for participation."
        },
        {
            question: "What do the participants need to bring?",
            answer: "Participants are expected to carry their laptop, chargers, and college identity cards. All other facilities will be provided by the organisers."
        },
        {
            question: "Is it only open to students, or can working professionals also join?",
            answer: "Participants must be Undergraduate Students attending a recognised university."
        }
    ];

    return (
        <Container maxWidth="md" sx={{ padding: { xs: 2, sm: 2 } }}>
            <Typography 
                variant="h4" 
                align="start" 
                gutterBottom
                sx={{ fontWeight: 'bold', marginBottom: 3, color: '#f15a24' }}
            >
                GENERAL FAQ
            </Typography>
            {faqData.map((item, index) => (
                <Accordion 
                    key={index} 
                    expanded={expanded === index} 
                    onChange={handleChange(index)}
                    disableGutters 
                    sx={{
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        '&:before': {
                            display: 'none',
                        },
                    }}
                >
                    <AccordionSummary
                        expandIcon={
                            <Box 
                                sx={{ 
                                    backgroundColor: '#5d73d1', 
                                    borderRadius: '50%', 
                                    width: 32, 
                                    height: 32, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                                }}
                            >
                                {expanded === index ? (
                                    <RemoveIcon sx={{ color: '#fff', fontSize: '1.7rem' }} />
                                ) : (
                                    <AddIcon sx={{ color: '#fff', fontSize: '1.7rem' }} />
                                )}
                            </Box>
                        }
                        sx={{
                            padding: { xs: 1, sm: 1 },
                            backgroundColor: '#fff',
                            borderRadius: 1,
                        }}
                    >
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'black', 
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                } 
                            }}
                        >
                            Q{index + 1}. {item.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body1" sx={{ color: 'black' }}>
                            {item.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default FAQ;
