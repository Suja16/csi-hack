import { Box, Typography } from '@mui/material';
import FilePresentation from '@mui/icons-material/Description';
import VideoIcon from '@mui/icons-material/Videocam';
import EvaluationIcon from '@mui/icons-material/AssignmentTurnedIn';
import RsvpIcon from '@mui/icons-material/CheckCircle';

const RegisterSteps = () => {
  const steps = [
    {
      title: "Upload Presentation",
      description: "Submit your team's PPT showcasing your project idea.",
      icon: FilePresentation,
    },
    {
      title: "Upload Video",
      description: "Share a 1-minute video pitch explaining your project.",
      icon: VideoIcon,
    },
    {
      title: "Evaluation Round",
      description: "Await feedback as judges review your submissions.",
      icon: EvaluationIcon,
    },
    {
      title: "RSVP Confirmation",
      description: "Confirm your participation by ticking the RSVP option.",
      icon: RsvpIcon,
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: '20px auto',
        padding: '24px',
        borderRadius: '12px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: '7px',
            top: '16px',
            bottom: '16px',
            width: '2px',
            backgroundColor: 'grey.200',
          },
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 3,
              position: 'relative',
              mb: index !== steps.length - 1 ? 6 : 0,
            }}
          >
            {/* Dot */}
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                border: 4,
                borderColor: 'background.paper',
                position: 'absolute',
                left: 0,
              }}
            />

            {/* Content */}
            <Box sx={{ ml: 5, flex: 1 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  mb: 0.5,
                }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
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
                borderColor: 'grey.200',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <step.icon
                sx={{
                  fontSize: 32,
                  color: 'primary.main',
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
