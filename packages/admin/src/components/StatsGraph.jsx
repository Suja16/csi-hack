import { Typography, Box, useTheme } from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const Stats = () => {
  const theme = useTheme()

  // 1. Submissions by Domain (General vs. All-Women)
  const submissionsByDomainAllWomen = [
    { name: "Fintech", value: 20 },
    { name: "Cybersecurity", value: 9 },
    { name: "GenAI", value: 6 },
  ]

  const submissionsByDomainGeneral = [
    { name: "Fintech", value: 149 },
    { name: "Cybersecurity", value: 44 },
    { name: "GenAI", value: 66 },
  ]

  // 2. Validity Breakdown (General vs. All-Women)
  const validityBreakdownAllWomen = [
    { name: "Fintech", valid: 19, invalid: 1 },
    { name: "Cybersecurity", valid: 9, invalid: 0 },
    { name: "GenAI", valid: 6, invalid: 0 },
  ]

  const validityBreakdownGeneral = [
    { name: "Fintech", valid: 137, invalid: 11 },
    { name: "Cybersecurity", valid: 38, invalid: 5 },
    { name: "GenAI", valid: 60, invalid: 6 },
  ]

  // 3. Submission Status
  const submissionStatus = [
    { name: "Submitted", value: 294 },
    { name: "Non-Submitted", value: 369 },
  ]

  // 4. Women's Team Distribution
  const womenTeamDistribution = [
    { name: "Complete", value: 10 },
    { name: "Incomplete", value: 48 },
  ]

  // 5. General Team Distribution
  const generalTeamDistribution = [
    { name: "Complete", value: 77 },
    { name: "Incomplete", value: 234 },
  ]

  // 6. PWD Teams Distribution
  const pwdTeamsDistribution = [
    { name: "Fintech", value: 1 },
    { name: "Cybersecurity", value: 1 },
    { name: "GenAI", value: 0 },
  ]

  // 7. Trend of Valid vs. Invalid Teams
  const validVsInvalidTrendAllWomen = [
    { name: "Fintech", valid: 19, invalid: 1 },
    { name: "Cybersecurity", valid: 9, invalid: 0 },
    { name: "GenAI", valid: 6, invalid: 0 },
  ]

  const validVsInvalidTrendGeneral = [
    { name: "Fintech", valid: 137, invalid: 11 },
    { name: "Cybersecurity", valid: 38, invalid: 5 },
    { name: "GenAI", valid: 60, invalid: 6 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.background.default, color: theme.palette.text.primary }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Statistics Graph
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        <Box width={{ xs: "100%", md: "32%" }} mb={2}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Submissions by Domain (All-Women)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={submissionsByDomainAllWomen} barSize={15}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box width={{ xs: "100%", md: "32%" }} mb={2}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Submissions by Domain (General)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={submissionsByDomainGeneral} barSize={15}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={COLORS[1]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box width={{ xs: "100%", md: "32%" }} mb={2}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Submission Status
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={submissionStatus}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {submissionStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box width={{ xs: "100%", md: "32%" }} mb={2}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Validity Breakdown (All-Women)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={validityBreakdownAllWomen} barSize={15}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="valid" stackId="a" fill={COLORS[2]} />
              <Bar dataKey="invalid" stackId="a" fill={COLORS[3]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box width={{ xs: "100%", md: "32%" }} mb={2}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Validity Breakdown (General)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={validityBreakdownGeneral} barSize={15}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="valid" stackId="a" fill={COLORS[4]} />
              <Bar dataKey="invalid" stackId="a" fill={COLORS[1]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box width={{ xs: "100%", md: "32%" }} mb={2}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            PWD Teams Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pwdTeamsDistribution} barSize={15}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={COLORS[4]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box width={{ xs: "100%", md: "32%" }} mb={2}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Women&apos;s Team Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={womenTeamDistribution} barSize={15}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box width={{ xs: "100%", md: "32%" }} mb={2}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            General Team Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={generalTeamDistribution} barSize={15}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={COLORS[1]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box width={{ xs: "100%", md: "32%" }} mb={2}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Trend of Valid vs. Invalid Teams (All-Women)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={validVsInvalidTrendAllWomen}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="valid" stroke={COLORS[0]} />
              <Line type="monotone" dataKey="invalid" stroke={COLORS[1]} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box width={{ xs: "100%", md: "32%" }} mb={2}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Trend of Valid vs. Invalid Teams (General)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={validVsInvalidTrendGeneral}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="valid" stroke={COLORS[2]} />
              <Line type="monotone" dataKey="invalid" stroke={COLORS[3]} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  )
}

export default Stats
