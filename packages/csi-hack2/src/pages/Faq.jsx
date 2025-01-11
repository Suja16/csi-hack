import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Faq = ({ isExpanded }) => {
  const [expanded, setExpanded] = useState(false);
  const [showFullContent, setShowFullContent] = useState(isExpanded);

  useEffect(() => {
    setShowFullContent(isExpanded);
  }, [isExpanded]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleReadMore = () => {
    setShowFullContent(true);
  };

  const faqCategories = [
    {
      title: "General FAQ's",
      questions: [
        {
          question: "What is a hackathon?",
          answer:
            "A hackathon is a social coding event where programmers, designers, and developers collaborate to solve problems and compete against other teams for prizes.",
        },
        {
          question: "How long is the hackathon?",
          answer: "The duration of the hackathon will be for 24 hours.",
        },
        {
          question: "Is there WiFi at the venue?",
          answer: "Yes. High-speed WiFi is provided for all participants.",
        },
        {
          question: "Will there be breaks during the event?",
          answer:
            "We promote a healthy experience with designated meal times and rest periods (according to the discretion of participants).",
        },
        {
          question: "Which programming languages are allowed?",
          answer: "Teams can use any programming language or technology stack.",
        },
        {
          question: "Will participants get a certificate?",
          answer:
            "Professional certificates and merchandise will be awarded to all participants.",
        },
      ],
    },
    {
      title: "Registration FAQ's",
      questions: [
        {
          question: "Is there a registration fee for the event?",
          answer: "No, the event is completely free for all the participants.",
        },
        {
          question:
            "Is it only open to students, or can working professionals also join?",
          answer:
            "All full-time Undergraduate and Postgraduate students are eligible.",
        },
        {
          question: "Can I attend virtually?",
          answer:
            "No. This is a fully in-person event and participants must be present at the venue throughout the hackathon.",
        },
      ],
    },
    {
      title: "Team FAQ's",
      questions: [
        {
          question: "How many members can be in a team?",
          answer:
            "Teams must consist of 4 members only, with at least one female member.",
        },
        {
          question: "Does a team need to qualify first?",
          answer:
            "Yes. The teams will first have to submit an idea submission presentation based on the problem statement chosen. Once evaluated, the final shortlisted teams will be announced in due course of time.",
        },
        {
          question: "Can I work on multiple problem statements?",
          answer:
            "No, each team can only work on only one problem statement during the hackathon.",
        },
        {
          question: "Can I change teams?",
          answer: "Once finalized, team changes will not be permitted.",
        },
        {
          question: "Will there be mentors?",
          answer:
            "Yes, mentors will be available during the event to provide guidance and support.",
        },
        {
          question:
            "Are persons with disabilities (PwD) allowed to participate in the iDEA Hackathon?",
          answer:
            "Yes, persons with disabilities (PwD) are warmly welcomed to participate in the iDEA Hackathon. To ensure eligibility, PwD participants must provide the following documents:\n- A valid disability certificate.\n- An official document from their college affirming their status as a PwD student.",
        },
        {
          question:
            "Are there any prizes for students with PwD proof and all women teams?",
          answer:
            "Yes, there are special category prizes exclusively for teams with PwD participants and all women teams.\n\nFor PwD:\n- To qualify for this category prize, at least 50% of the team members must be PwD.\n- The team must submit the necessary proof as outlined in the previous question.\n\nFor all women teams:\n- The team should consist of only female participants.",
        },
      ],
    },
    {
      title: "Logistics FAQ's",
      questions: [
        {
          question: "What do the participants need to bring?",
          answer:
            "Participants are expected to carry their laptop, chargers, and college identity cards. All other facilities will be provided by the organisers.",
        },
        {
          question: "Will food and rest spaces be provided?",
          answer:
            "Yes. All meals, drinks, and snacks will be provided throughout the event along with designated resting spaces and leisure activities.",
        },
        {
          question: "Is Jain food and vegetarian food being provided?",
          answer:
            "Yes. Vegetarian and Jain food will be served in all meals and snacks during the course of the hackathon.",
        },
      ],
    },
    {
      title: "Additional FAQ's",
      questions: [
        {
          question: "Can teams start coding before the hackathon commences?",
          answer:
            "For shortlisted teams after the idea submission round, they are expected to start working on their prototypes once RSVP’d for the event.",
        },
        {
          question: "Can we leave early?",
          answer:
            "No, Full attendance is mandatory to maintain eligibility for awards and certification.",
        },
        {
          question: "Can I use existing libraries?",
          answer:
            "Yes, open-source libraries and frameworks can be utilized, but the core project must be original work.",
        },
        {
          question: "Does the project need to be complete?",
          answer:
            "The submission should be functional enough for the judges to review and score.",
        },
        {
          question:
            "Who will own the IP (Intellectual Property) Rights to the product built by the teams?",
          answer:
            "The ownership of Intellectual Property (IP) for individual prototypes will lie with Union Bank of India.",
        },
      ],
    },
  ];

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: { xs: 2, sm: 2 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: showFullContent ? "auto" : "530px",
        overflow: "hidden",
        position: "relative",
        marginTop: 1,
      }}
    >
      {faqCategories.map((category, catIndex) => (
        <Box key={catIndex}>
          <Typography
            variant="h4"
            align="start"
            gutterBottom
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
              color: "#f15a24",
              marginTop: 3,
              zIndex: showFullContent ? 1 : 0,
              textAlign: "justify",
            }}
          >
            {category.title}
          </Typography>
          {category.questions.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === `${catIndex}-${index}`}
              onChange={handleChange(`${catIndex}-${index}`)}
              disableGutters
              sx={{
                boxShadow: "none",
                backgroundColor: "transparent",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Box
                    sx={{
                      backgroundColor: "#5d73d1",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {expanded === `${catIndex}-${index}` ? (
                      <RemoveIcon sx={{ color: "#fff", fontSize: "1.7rem"}} />
                    ) : (
                      <AddIcon sx={{ color: "#fff", fontSize: "1.7rem" }} />
                    )}
                  </Box>
                }
                sx={{
                  padding: { xs: 1, sm: 1 },
                  backgroundColor: "#fff",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "black",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    textAlign: "start",
                    marginRight: 2,
                  }}
                >
                  Q{index + 1}. {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  sx={{ color: "black", textAlign: "start" }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ))}
      {!showFullContent && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 1)",
            py: 2,
            zIndex: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={handleReadMore}>
            Read More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Faq;
