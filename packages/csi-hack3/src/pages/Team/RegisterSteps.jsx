import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import FilePresentation from '@mui/icons-material/Description';
import VideoIcon from '@mui/icons-material/Videocam';
import EvaluationIcon from '@mui/icons-material/AssignmentTurnedIn';
import RsvpIcon from '@mui/icons-material/CheckCircle';

const RegisterSteps = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      description: "Submissions of teams will be evaluated by working industry professionals.",
      icon: EvaluationIcon,
    },
    {
      title: "RSVP Confirmation",
      description: "The shortlisted teams will be invited to participate in the on-site round and will have to rsvp within the designated time to confirm their participation.",
      icon: RsvpIcon,
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: {
          xs: '10px',
          sm: '20px auto',
        },
        padding: {
          xs: '16px',
          sm: '24px',
        },
        borderRadius: '12px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: {
              xs: '7px',
              sm: '7px',
            },
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
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              alignItems: {
                xs: 'flex-start',
                sm: 'flex-start',
              },
              gap: {
                xs: 2,
                sm: 3,
              },
              position: 'relative',
              mb: index !== steps.length - 1 ? {
                xs: 4,
                sm: 6,
              } : 0,
              pl: {
                xs: 4,
                sm: 0,
              },
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
                left: {
                  xs: 0,
                  sm: 0,
                },
                top: {
                  xs: 2,
                  sm: 2,
                },
              }}
            />
            {/* Content */}
            <Box
              sx={{
                ml: {
                  xs: 0,
                  sm: 5,
                },
                flex: 1,
                order: {
                  xs: 2,
                  sm: 1,
                },
              }}
            >
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
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
                  fontSize: {
                    xs: '0.875rem',
                    sm: '1rem',
                  },
                }}
              >
                {step.description}
              </Typography>
            </Box>
            {/* Icon */}
            <Box
              sx={{
                width: {
                  xs: 48,
                  sm: 64,
                },
                height: {
                  xs: 48,
                  sm: 64,
                },
                border: 2,
                borderColor: 'grey.200',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                order: {
                  xs: 1,
                  sm: 2,
                },
                alignSelf: {
                  xs: 'flex-start',
                  sm: 'center',
                },
                ml: {
                  xs: 0,
                  sm: 2,
                },
              }}
            >
              <step.icon
                sx={{
                  fontSize: {
                    xs: 24,
                    sm: 32,
                  },
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
