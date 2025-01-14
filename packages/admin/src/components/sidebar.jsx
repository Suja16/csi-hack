import 'react';
import '@mui/material/Box';
import '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllTeams from '../pages/AllTeams.jsx';
import AddEvaluators from '../pages/Evaluators.jsx';
import Statistics from '../pages/Statistics.jsx';
import IDEALogo from '../assets/idea.png';

const NAVIGATION = [
    {
        segment: 'allteams',
        title: 'All Teams',
        icon: <GroupsIcon />,
    },
    {
        segment: 'evaluators',
        title: 'Add Evaluators',
        icon: <HowToRegIcon />,
    },
    {
        segment: 'statistics',
        title: 'Statistics',
        icon: <LeaderboardIcon />,
    },
];

const demoTheme = createTheme({
    colorSchemes: { light: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DashboardLayoutBasic() {

    return (
        <AppProvider
            navigation={NAVIGATION}
            theme={demoTheme}
            branding={{
                logo: <img src={IDEALogo} alt="IDEA Logo" />,
                title: '',
                // homeUrl: '/toolpad/core/introduction',
              }}            
        >
            <Router>
                <DashboardLayout>
                    <Routes>
                        <Route path="/allteams" element={<AllTeams />} />
                        <Route path="/evaluators" element={<AddEvaluators />} />
                        <Route path="/statistics" element={<Statistics />} />
                    </Routes>
                </DashboardLayout>
            </Router>
        </AppProvider>
    );
}

export default DashboardLayoutBasic;