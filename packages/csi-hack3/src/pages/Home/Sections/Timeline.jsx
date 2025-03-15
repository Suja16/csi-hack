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
  Schedule as ScheduleIcon,
  Code as CodeIcon,
  Restaurant as RestaurantIcon,
  EmojiEvents as EmojiEventsIcon,
  Groups as GroupsIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';

const TIMELINE_DATA = [
  {
    time: "8:00 AM - 9:00 AM",
    title: "Registration + Breakfast",
    content: "Arrive early to register, have breakfast, and prepare for the exciting day ahead!",
    day: "Day 1",
    icon: ScheduleIcon
  },
  {
    time: "9:00 AM - 9:30 AM",
    title: "Dispersal towards allocated rooms & Orientation",
    content: "Get familiar with your allocated room and receive important orientation information.",
    day: "Day 1",
    icon: GroupsIcon
  },
  {
    time: "9:30 AM - 1:00 PM",
    title: "Coding Round 1",
    content: "First coding session of the hackathon. Get started on your innovative ideas!",
    day: "Day 1",
    icon: CodeIcon
  },
  {
    time: "1:00 PM - 2:00 PM",
    title: "Lunch",
    content: "Refuel with lunch to keep your energy up for the next coding round.",
    day: "Day 1",
    icon: RestaurantIcon
  },
  {
    time: "2:00 PM - 5:00 PM",
    title: "Coding Round 2",
    content: "Continue developing your projects in this extended coding session.",
    day: "Day 1",
    icon: CodeIcon
  },
  {
    time: "5:00 PM - 6:00 PM",
    title: "Snacks",
    content: "Take a short break and enjoy some snacks before diving back into coding.",
    day: "Day 1",
    icon: RestaurantIcon
  },
  {
    time: "6:00 PM - 9:00 PM",
    title: "Coding Round 3 + Evaluation Round 1",
    content: "Third coding session along with the first evaluation of your progress.",
    day: "Day 1",
    icon: AssessmentIcon
  },
  {
    time: "9:00 PM - 10:00 PM",
    title: "Dinner",
    content: "Dinner time! Recharge for the night coding session ahead.",
    day: "Day 1",
    icon: RestaurantIcon
  },
  {
    time: "10:00 PM - 1:00 AM",
    title: "Coding Round 4",
    content: "Keep the momentum going in this night coding session.",
    day: "Day 1",
    icon: CodeIcon
  },
  {
    time: "1:00 AM - 2:00 AM",
    title: "Midnight Snacks",
    content: "Grab some midnight snacks to fuel your late-night coding efforts.",
    day: "Day 2",
    icon: RestaurantIcon
  },
  {
    time: "2:00 AM - 8:00 AM",
    title: "Coding Round 5",
    content: "The overnight coding marathon continues! Push through to make significant progress.",
    day: "Day 2",
    icon: CodeIcon
  },
  {
    time: "8:00 AM - 9:00 AM",
    title: "Breakfast",
    content: "Start your second day with a nutritious breakfast.",
    day: "Day 2",
    icon: RestaurantIcon
  },
  {
    time: "9:00 AM - 9:30 AM",
    title: "Coding Round 6",
    content: "Final sprint to polish your projects before evaluations.",
    day: "Day 2",
    icon: CodeIcon
  },
  {
    time: "10:00 AM - 11:30 AM",
    title: "Evaluation Round 2",
    content: "Present your work for the second round of evaluations.",
    day: "Day 2",
    icon: AssessmentIcon
  },
  {
    time: "12:00 PM - 2:00 PM",
    title: "Power Judging + Lunch",
    content: "Final judging of projects alongside lunch on day 2.",
    day: "Day 2",
    icon: EmojiEventsIcon
  },
  {
    time: "3:00 PM - 6:00 PM",
    title: "Conclusion",
    content: "Awards ceremony, closing remarks, and celebration of your achievements!",
    day: "Day 2",
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

  const getBadgeColor = (day) => {
    return day === "Day 1" ? "primary.main" : "secondary.main";
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        position: 'absolute',
        width: isMobile ? 'calc(100% - 48px)' : '47%',
        left: isMobile ? '48px' : isLeft ? '0' : 'auto',
        right: isMobile ? 'auto' : isLeft ? 'auto' : '0'
      }}
    >
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
        <motion.div variants={contentVariants}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <motion.div variants={contentVariants}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {data.time}
              </Typography>
            </motion.div>
            <motion.div variants={contentVariants}>
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: getBadgeColor(data.day),
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                {data.day}
              </Typography>
            </motion.div>
          </Box>
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
        height: { xs: 180, md: 200 },
        mb: { xs: 4, md: 5 },
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
            sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}
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
              key={`${item.day}-${item.time}`}
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
