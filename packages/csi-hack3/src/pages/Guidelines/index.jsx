import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const HackathonGuidelines = () => {
  const [expanded, setExpanded] = useState(false);
  const showReadMore = false;

  const sections = [
    {
      title: "Preparation Before the Hackathon",
      items: [
        "Understand the Theme: Read about the hackathon's theme or problem statement beforehand.",
        "Form a Team: Create a diverse team of 4 members ( Members must be from the same college ).",
        "Gather Tools: Install necessary software, SDKs, or development environments.",
        "Research: Familiarize yourself with APIs, datasets, or platforms allowed or provided.",
        "Prototype: Sketch out a rough idea or wireframe of your project to guide development.",
        "Build: Develop as much of your project as you can before the hackathon starts!!",
      ],
    },
    {
      title: "At the Start of the Hackathon",
      items: [
        "Bring Essentials: Ensure you have a laptop, chargers, and any other materials you'll need.",
        "Attend the Inauguration: Listen to the rules, judging criteria, and other announcements.",
        "Plan Your Time: Divide the time for ideation, development, testing, feedback and presentation.",
      ],
    },
    {
      title: "During the Hackathon",
      items: [
        "Get Feedback: Gain valuable insights about your project from leading industry mentors.",
        "Stick to the Plan: Focus on completing your Minimum Viable Product (MVP) rather than overcomplicating features.",
        "Communicate Regularly: Maintain clear communication among team members.",
        "Use Version Control: Use Git or similar tools to track changes and collaborate effectively.",
        "Leverage Resources: Use mentors, workshops, or documentation for guidance.",
        "Test Frequently: Regularly test your project to avoid last-minute bugs.",
      ],
    },
    {
      title: "Collaboration and Teamwork",
      items: [
        "Delegate Tasks: Assign roles based on each member's strengths.",
        "Support Each Other: Encourage a positive and collaborative atmosphere.",
        "Respect Deadlines: Ensure everyone is on track with their tasks.",
      ],
    },
    {
      title: "Presentation and Submission",
      items: [
        "Prepare a Demo: Showcase the functionality of your project.",
        "Tell a Story: Explain the problem, your solution, and its impact.",
        "Follow Submission Guidelines: Adhere to any formats or criteria specified.",
        "Practice Pitching: Rehearse your presentation to ensure it's clear and within the time limit.",
      ],
    },
    {
      title: "General Etiquette",
      items: [
        "Follow the Rules: Respect the hackathon's rules and code of conduct.",
        "Be Respectful: Treat fellow participants, organizers, and judges with courtesy.",
        "Stay Ethical: Submit only original work created during the hackathon.",
        "Manage Stress: Take breaks, stay hydrated, and rest if needed.",
      ],
    },
    {
      title: "Post-Hackathon",
      items: [
        "Network: Connect with other participants and mentors for future collaboration.",
        "Reflect: Analyze what went well and what could be improved for next time.",
        "Follow Up: Continue developing promising ideas or seek opportunities to implement them.",
      ],
    },
  ];

  return (
    <Card
      sx={{
        maxWidth: 1200,
        margin: "20px auto",
        padding: "15px",
        paddingBottom: "0px",
        borderRadius: "12px",
        boxShadow: 3,
        position: "relative",
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          component="h2"
          color="secondary"
          sx={{
            textAlign: "justify",
            fontWeight: "bold",
            marginBottom: 2,
            // color: "#D32F2F",
            letterSpacing: "0.5px",
          }}
        >
          Hackathon Guidelines
        </Typography>

        <Box
          sx={{
            maxHeight: showReadMore && !expanded ? 600 : "none",
            overflow: showReadMore && !expanded ? "hidden" : "auto",
          }}
        >
          {sections.map((section, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography
                variant="h6"
                component="h3"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  // color: "#2846AA",
                  marginBottom: 0.5,
                  textAlign: "justify",
                  letterSpacing: "0.5px",
                }}
              >
                {index + 1}. {section.title}
              </Typography>
              <List sx={{ paddingLeft: 4 }}>
                {section.items.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      paddingLeft: 0,
                      display: "flex",
                      alignItems: "start",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        marginRight: 1,
                        color: "#D32F2F",
                        fontSize: "1.3rem",
                      }}
                    >
                      •
                    </Typography>
                    <ListItemText
                      primary={item}
                      sx={{
                        "& .MuiListItemText-primary": {
                          marginBottom: 0.5,
                          textAlign: "justify",
                          letterSpacing: "0.5px",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>

        {showReadMore && !expanded && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
              background: "linear-gradient(to top, white, transparent)",
            }}
          />
        )}
      </CardContent>

      {showReadMore && (
        <Button
          onClick={() => setExpanded(!expanded)}
          sx={{
            width: "100%",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {expanded ? "Show Less" : "Read More"}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{
              transform: expanded ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
              marginLeft: "4px",
            }}
          >
            <path
              d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
              fill="currentColor"
            />
          </svg>
        </Button>
      )}
    </Card>
  );
};

export default HackathonGuidelines;
