import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Edit as EditIcon,
  Send as SendIcon,
  Notifications as NotificationsIcon,
  EmojiEvents as EmojiEventsIcon
} from '@mui/icons-material';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';

const TIMELINE_DATA = [
  {
    date: "9th Jan 2025",
    title: "Phase 1: Registrations & Idea Submission",
    content: "Registrations go live and idea submission begins. Get ready to showcase your innovative ideas!",
    icon: EditIcon
  },
  {
    date: "3rd Feb 2025",
    title: "Last Date for Idea Submission",
    content: "Final day to submit your groundbreaking ideas. Don't miss this deadline!",
    icon: SendIcon
  },
  {
    date: "7th Feb 2025",
    title: "Announcement of Phase 1 Results",
    content: "The moment of truth! Find out if your idea has been selected for the next phase.",
    icon: NotificationsIcon
  },
  {
    date: "To Be Announced",
    title: "Phase 2: Hackathon",
    content: "Get ready for the main event! Details of Phase 2 will be revealed soon. Stay tuned!",
    icon: EmojiEventsIcon
  }
];

const TimelineMarker = ({ Icon, inView }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        left: { xs: '12px', md: '50%' },
        transform: { xs: 'translateX(0)', md: 'translateX(-50%)' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: inView ? 1.2 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          border: `2px solid ${inView ? theme.palette.primary.light : theme.palette.grey[300]}`,
          backgroundColor: inView ? theme.palette.primary.main : theme.palette.grey[400]
        }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: -18,
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: `2px solid ${theme.palette.primary.main}`,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon />
      </motion.div>
    </Box>
  );
};

const TimelineCard = ({ data, isLeft, inView, isMobile }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: isMobile ? 0 : (isLeft ? -50 : 50),
      y: isMobile ? 50 : 0
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        position: 'absolute',
        width: isMobile ? 'calc(100% - 48px)' : '47%', // Increase width to 50% in desktop mode
        left: isMobile ? '48px' : isLeft ? '0' : 'auto',
        right: isMobile ? 'auto' : isLeft ? 'auto' : '0'
      }}
    >
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
        <motion.div variants={contentVariants}>
          <motion.div variants={contentVariants}>
            <Typography variant="subtitle2" color="secondary" gutterBottom>
              {data.date}
            </Typography>
          </motion.div>
          <motion.div variants={contentVariants}>
            <Typography variant="h6" gutterBottom>
              {data.title}
            </Typography>
          </motion.div>
          <motion.div variants={contentVariants}>
            <Typography variant="body2" color="text.secondary">
              {data.content}
            </Typography>
          </motion.div>
        </motion.div>
      </Paper>
    </motion.div>
  );
};

const TimelineItem = ({ data, index }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, {
    amount: 0.3,
    margin: "-100px"
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLeft = index % 2 === 0;

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        height: { xs: 200, md: 256 },
        mb: { xs: 6, md: 8 },
        '&:last-child': { mb: 0 }
      }}
    >
      <TimelineMarker Icon={data.icon} inView={inView} />
      <TimelineCard
        data={data}
        isLeft={isLeft}
        inView={inView}
        isMobile={isMobile}
      />
    </Box>
  );
};


const HackathonTimeline = () => {
  const containerRef = React.useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    delay: 0.5
  });

  return (
    <Container>
      <Box py={1}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 900,
              color: 'primary.main',
              marginBottom: (theme) => theme.spacing(6),
              textTransform: 'uppercase',
              position: 'relative',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: 'secondary.main',
                borderRadius: '2px',
              },
            }}
          >
            Hackathon Timeline
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}
          >
            Join us on this exciting journey of innovation and creativity.
            Mark these dates on your calendar and prepare to showcase your skills!
          </Typography>
        </motion.div>

        <Box
          ref={containerRef}
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: { xs: '16px', md: '50%' },
              transform: { xs: 'none', md: 'translateX(-50%)' },
              width: 5,
              height: '100%',
              backgroundColor: 'grey.300'
            }
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              left: isMobile ? '16px' : '50%',
              width: 3,
              height: '100%',
              backgroundColor: '#3f51b5',
              transformOrigin: 'top',
              scaleY,
              transform: isMobile ? 'none' : 'translateX(-50%)'
            }}
          />

          {TIMELINE_DATA.map((item, index) => (
            <TimelineItem
              key={item.title}
              data={item}
              index={index}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};


export default HackathonTimeline;
