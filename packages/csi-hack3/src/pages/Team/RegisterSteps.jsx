import { Box, Typography, Button } from "@mui/material";
import FilePresentation from "@mui/icons-material/Description";
import VideoIcon from "@mui/icons-material/Videocam";
import EvaluationIcon from "@mui/icons-material/AssignmentTurnedIn";
import RsvpIcon from "@mui/icons-material/CheckCircle";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const RegisterSteps = () => {
  const steps = [
    {
      title: "Upload Presentation",
      description: "Submit your team's PPT (in PDF Format) showcasing your project idea. ",
      icon: FilePresentation,
    },
    {
      title: "Upload Video",
      description: "Share a 1-minute video pitch explaining your project.",
      icon: VideoIcon,
    },
    {
      title: "Evaluation Round",
      description:
        "Submissions of teams will be evaluated by working industry professionals.",
      icon: EvaluationIcon,
    },
    {
      title: "RSVP Confirmation",
      description:
        "The shortlisted teams will be invited to participate in the on-site round and will have to rsvp within the designated time to confirm their participation.",
      icon: RsvpIcon,
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: "24px",
        borderRadius: "12px",
      }}
    >
      {/* Download Boxes */}
      <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        justifyContent: 'space-evenly',
        display: 'flex',
      }}
      >
        <a
          href="/template.pptx"
          download="iDEA Hackathon PPT Submission Template.pptx"
          target="_blank"
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CloudDownloadIcon />}
            sx={{ mb: 1 }}
          >
            Download PPT Template
          </Button>
        </a>
        <a
          href="/consent.pdf"
          download="iDEA Hackathon Consent Letter Format.pdf"
          target="_blank"
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CloudDownloadIcon />}
          >
            Download Consent Letter Format
          </Button>
        </a>
      </Box>
      <Box
        marginTop="2rem"
        sx={{
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            left: "7px",
            top: "20px",
            bottom: "16px",
            width: "2px",
            backgroundColor: "grey.200",
          },
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 3,
              position: "relative",
              mb: index !== steps.length - 1 ? 6 : 0,
            }}
          >
            {/* Dot */}
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                border: 4,
                borderColor: "background.paper",
                position: "absolute",
                left: 0,
                top: 8,
              }}
            />

            {/* Content */}
            <Box sx={{ ml: 5, flex: 1 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                }}
              >
                {step.description}
              </Typography>
            </Box>

            {/* Icon */}
            <Box
              sx={{
                width: 64,
                height: 64,
                border: 2,
                borderColor: "grey.200",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <step.icon
                sx={{
                  fontSize: 32,
                  color: "primary.main",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RegisterSteps;
