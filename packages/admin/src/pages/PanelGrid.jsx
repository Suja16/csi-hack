import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbar,
} from "@mui/x-data-grid";

import { PanelDataQueryEval1, PanelDataQueryEval2 } from "../queries";
import { useQuery } from "@apollo/client";
import * as XLSX from 'xlsx';

// Custom toolbar with export button
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{
          fileName: "evaluation-results",
          delimiter: ",",
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

export default function PanelGrid() {
  const [evaluationRound, setEvaluationRound] = useState("Round 1");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  // Fetch both rounds data in parallel
  const {
    data: round1Data,
    loading: loadingRound1,
    error: errorRound1,
  } = useQuery(PanelDataQueryEval1);
  const {
    data: round2Data,
    loading: loadingRound2,
    error: errorRound2,
  } = useQuery(PanelDataQueryEval2);

  // Consolidate queries into one state on data change
  useEffect(() => {
    // Return early if data is not yet loaded
    if (!round1Data || !round2Data) return;

    let currentColumns = [];
    let currentRows = [];

    if (evaluationRound === "Round 1") {
      // Define the columns for Round 1
      currentColumns = [
        { field: "panelName", headerName: "Panel", width: 120 },
        { field: "teamName", headerName: "Team", width: 120 },
        { field: "leaderName", headerName: "Leader", width: 150 },
        { field: "reqMatch", headerName: "Req", type: "number", width: 60 },
        { field: "clarity", headerName: "Clarity", type: "number", width: 60 },
        { field: "novelty", headerName: "Nove", type: "number", width: 60 },
        { field: "feasibility", headerName: "Feas", type: "number", width: 60 },
        { field: "techStack", headerName: "Stack", type: "number", width: 60 },
        {
          field: "sustainability",
          headerName: "sustain",
          type: "number",
          width: 60,
        },
        { field: "impact", headerName: "Impact", type: "number", width: 60 },
        { field: "impression", headerName: "Impr", type: "number", width: 60 },
        { field: "totalR1", headerName: "Total", type: "number", width: 70 },
        { field: "collegeName", headerName: "College", width: 150 },
        { field: "teamType", headerName: "Type", width: 120 },
      ];

      // Map Round 1 data to rows
      currentRows =
        round1Data?.feedbacks?.map((feedback, index) => ({
          id: index + 1,
          panelName: feedback.Idea_USER?.name || "Unknown Panel",
          teamName: feedback.team_info_from_eventio?.name || "Unknown Team",
          leaderName:
            feedback.team_info_from_eventio?.Leader?.name || "Unknown Leader",
          collegeName:
            feedback.team_info_from_eventio?.Leader?.college ||
            "Unknown College",
          reqMatch: feedback.metric_score[0].score || 0,
          clarity: feedback.metric_score[1].score || 0,
          novelty: feedback.metric_score[2].score || 0,
          feasibility: feedback.metric_score[3].score || 0,
          techStack: feedback.metric_score[4].score || 0,
          sustainability: feedback.metric_score[5].score || 0,
          impact: feedback.metric_score[6].score || 0,
          impression: feedback.metric_score[7].score || 0,
          totalR1: feedback.totalscore || 0,
          teamType: determineTeamType(feedback.team_info_from_eventio),
        })) || [];
    } else {
      // Define the columns for Round 2
      currentColumns = [
        { field: "panelName", headerName: "Panel", width: 120 },
        { field: "teamName", headerName: "Team", width: 120 },
        { field: "leaderName", headerName: "Leader", width: 150 },
        { field: "originality", headerName: "Orig", type: "number", width: 60 },
        { field: "completion", headerName: "Compl", type: "number", width: 60 },
        { field: "codeQuality", headerName: "Qual", type: "number", width: 60 },
        { field: "ux", headerName: "UX", type: "number", width: 60 },
        {
          field: "commercialization",
          headerName: "Commerc",
          type: "number",
          width: 60,
        },
        {
          field: "marketReady",
          headerName: "MReady",
          type: "number",
          width: 60,
        },
        { field: "scale", headerName: "Scale", type: "number", width: 50 },
        {
          field: "futureWork",
          headerName: "Future",
          type: "number",
          width: 60,
        },
        {
          field: "incorpSug",
          headerName: "Incorp. Sug.",
          type: "number",
          width: 60,
        },
        { field: "impression", headerName: "Impr", type: "number", width: 60 },
        { field: "totalR2", headerName: "Total", type: "number", width: 70 },
        { field: "collegeName", headerName: "College", width: 150 },
        { field: "teamType", headerName: "Type", width: 120 },
      ];

      // Map Round 2 data to rows
      currentRows =
        round2Data?.feedbacks?.map((feedback, index) => ({
          id: index + 1,
          panelName: feedback.Idea_USER?.name || "Unknown Panel",
          teamName: feedback.team_info_from_eventio?.name || "Unknown Team",
          leaderName:
            feedback.team_info_from_eventio?.Leader?.name || "Unknown Leader",
          collegeName:
            feedback.team_info_from_eventio?.Leader?.college ||
            "Unknown College",
          originality: feedback.metric_score[0].score || 0,
          completion: feedback.metric_score[1].score || 0,
          codeQuality: feedback.metric_score[2].score || 0,
          ux: feedback.metric_score[3].score || 0,
          commercialization: feedback.metric_score[4].score || 0,
          marketReady: feedback.metric_score[5].score || 0,
          scale: feedback.metric_score[6].score || 0,
          futureWork: feedback.metric_score[7].score || 0,
          incorpSug: feedback.metric_score[8].score || 0,
          impression: feedback.metric_score[9].score || 0,
          totalR2: feedback.totalscore || 0,
          teamType: determineTeamType(feedback.team_info_from_eventio),
        })) || [];
    }

    setColumns(currentColumns);
    setRows(currentRows);
  }, [round1Data, round2Data, evaluationRound]);

  const determineTeamType = (teamData) => {
    if (
      !teamData ||
      !teamData.Participants ||
      teamData.Participants.length === 0
    ) {
      return "Normal";
    }

    // Check if original team type exists and isn't "Normal"
    if (teamData.type && teamData.type !== "Normal") {
      return teamData.type;
    }

    // Check if all participants are female
    const allFemale = teamData.Participants.every(
      (participant) => participant.User && participant.User.gender === "FEMALE"
    );

    // Check if all participants are male
    const allMale = teamData.Participants.every(
      (participant) => participant.User && participant.User.gender === "MALE"
    );

    if (allFemale) {
      return "All Female";
    } else {
      return "Normal";
    }
  };

  const handlePush = () => {
    const DataToBePushed =
      evaluationRound === "Round 1"
        ? { "Round 1": round1Data, "Round 2": round2Data }
        : { "Round 2": round2Data, "Round 1": round1Data };

    console.log("Data to be pushed: ", DataToBePushed);
    
    // Generate and download Excel file
    generateExcel(DataToBePushed);
  };

  const generateExcel = (data) => {
    if (!data["Round 1"]?.feedbacks || !data["Round 2"]?.feedbacks) {
      console.error("Missing feedback data");
      return;
    }
    
    // Create a map of team IDs to make merging easier
    const teamMap = new Map();
    
    // Process Round 1 data
    data["Round 1"].feedbacks.forEach(feedback => {
      const teamId = feedback.team_id;
      teamMap.set(teamId, {
        teamName: feedback.team_info_from_eventio?.name || 'Unknown Team',
        leaderName: feedback.team_info_from_eventio?.Leader?.name || 'Unknown Leader',
        collegeName: feedback.team_info_from_eventio?.Leader?.college || 'Unknown College',
        teamType: determineTeamType(feedback.team_info_from_eventio),
        round1Panel: feedback.Idea_USER?.name || 'Unknown Panel',
        round1Scores: feedback.metric_score.reduce((obj, metric) => {
          obj[metric.name] = metric.score;
          return obj;
        }, {}),
        round1Total: feedback.totalscore || 0
      });
    });
    
    // Process Round 2 data and merge
    data["Round 2"].feedbacks.forEach(feedback => {
      const teamId = feedback.team_id;
      const existingData = teamMap.get(teamId) || {
        teamName: feedback.team_info_from_eventio?.name || 'Unknown Team',
        leaderName: feedback.team_info_from_eventio?.Leader?.name || 'Unknown Leader',
        collegeName: feedback.team_info_from_eventio?.Leader?.college || 'Unknown College',
        teamType: determineTeamType(feedback.team_info_from_eventio)
      };
      
      teamMap.set(teamId, {
        ...existingData,
        round2Panel: feedback.Idea_USER?.name || 'Unknown Panel',
        round2Scores: feedback.metric_score.reduce((obj, metric) => {
          obj[metric.name] = metric.score;
          return obj;
        }, {}),
        round2Total: feedback.totalscore || 0
      });
    });
    
    // Create the worksheet data
    const worksheetData = Array.from(teamMap.values()).map(team => {
      // Calculate final score (40% of Round 1 + 60% of Round 2)
      const finalScore = team.round1Total && team.round2Total 
        ? (team.round1Total * 0.4) + (team.round2Total * 0.6)
        : team.round1Total || team.round2Total || 0;
        
      return {
        'Team Name': team.teamName,
        'Leader Name': team.leaderName,
        'College': team.collegeName,
        'Team Type': team.teamType,
        'Round 1 Panel': team.round1Panel || 'N/A',
        // Round 1 metrics
        'R1 - Problem Definition': team.round1Scores?.['Problem Definition'] || 0,
        'R1 - Solution Clarity': team.round1Scores?.['Solution Clarity'] || 0,
        'R1 - Novelty': team.round1Scores?.['Novelty'] || 0,
        'R1 - Feasibility': team.round1Scores?.['Feasibility'] || 0,
        'R1 - Technology Stack': team.round1Scores?.['Technology Stack'] || 0,
        'R1 - Sustainability': team.round1Scores?.['Sustainability'] || 0,
        'R1 - Impact': team.round1Scores?.['Impact'] || 0,
        'R1 - Impression': team.round1Scores?.["Evaluator's Impression"] || 0,
        'Round 1 Total': team.round1Total || 0,
        'Round 2 Panel': team.round2Panel || 'N/A',
        // Round 2 metrics
        'R2 - Originality': team.round2Scores?.['originality'] || 0,
        'R2 - Completion': team.round2Scores?.['Completion'] || 0,
        'R2 - Code Quality': team.round2Scores?.['Quality '] || 0,
        'R2 - UX': team.round2Scores?.['ux'] || 0,
        'R2 - Commercialization': team.round2Scores?.['Commercialization'] || 0,
        'R2 - Market Ready': team.round2Scores?.['Market Ready '] || 0,
        'R2 - Scale': team.round2Scores?.['scale'] || 0,
        'R2 - Future Work': team.round2Scores?.['future Work'] || 0,
        'R2 - Incorporated Suggestions': team.round2Scores?.['incorpSuggestions'] || 0,
        'R2 - Impression': team.round2Scores?.["Evaluator's Impression"] || 0,
        'Round 2 Total': team.round2Total || 0,
        'Final Score (40% R1 + 60% R2)': parseFloat(finalScore.toFixed(2))
      };
    });
    
    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    
    // Create workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Evaluation Results');
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, 'PSB_Hackathon_Evaluation_Results.xlsx');
  };

  // Loading state
  if (loadingRound1 || loadingRound2) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
        PSB Hackathon series - Union Bank
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 0.5,
            borderBottom: 1,
            borderColor: "divider",
            mb: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Evaluation Results
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4caf50",
              fontSize: "1.2rem",
              p: 1.2,
              color: "white",
              "&:hover": { backgroundColor: "#388e3c" },
            }}
            onClick={handlePush}
          >
            Push
          </Button>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Evaluation Round</InputLabel>
            <Select
              value={evaluationRound}
              onChange={(e) => setEvaluationRound(e.target.value)}
              label="Evaluation Round"
            >
              <MenuItem value="Round 1">Round 1</MenuItem>
              <MenuItem value="Round 2">Round 2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                printOptions: { fileName: "PSB Hackathon Normalised Scores" },
                csvOptions: {
                  fileName: "PSB Hackathon Normalised Scores",
                  utf8WithBom: true,
                },
              },
            }}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>
    </Box>
  );
}
