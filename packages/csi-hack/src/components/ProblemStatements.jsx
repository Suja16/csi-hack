import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// eslint-disable-next-line react/prop-types
const ProblemStatement = ({ title, description }) => (
  <Paper
    elevation={3}
    sx={{
      width: 350,
      padding: 3,
      backgroundColor: "#e41d22",
      borderRadius: 3,
      backdropFilter: "blur(80px) brightness(100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Typography
      variant="h4"
      component="div"
      sx={{
        fontFamily: "'Bai Jamjuree', Helvetica",
        fontWeight: 500,
        color: "white",
        textAlign: "center",
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      component="p"
      sx={{
        fontFamily: "'Bai Jamjuree', Helvetica",
        fontWeight: 400,
        color: "white",
        textAlign: "center",
      }}
    >
      {description}
    </Typography>
  </Paper>
);

const ProblemStatements = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 1309,
        height: 722,
        backgroundImage: "url(/Vector.svg)",
        backgroundSize: "100% 100%",
        position: "relative",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: 22,
          left: 559,
          fontFamily: theme.typography.h1,
          fontWeight: "normal",
          color: "#e41d22",
          fontSize: 64,
        }}
      >
        PROBLEM STATEMENTS
      </Typography>
      <Grid
        container
        spacing={5}
        sx={{
          position: "absolute",
          top: 266,
          left: 12,
          justifyContent: "center",
        }}
      >
        <Grid item>
          <ProblemStatement
            title="Problem statement "
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
          />
        </Grid>
        <Grid item>
          <ProblemStatement
            title="Problem statement"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
          />
        </Grid>
        <Grid item>
          <ProblemStatement
            title="problem statement"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProblemStatements;