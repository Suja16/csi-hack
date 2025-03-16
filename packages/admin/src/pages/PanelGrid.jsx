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
          reqMatch: feedback.metric_score[0]?.score || 0,
          clarity: feedback.metric_score[1]?.score || 0,
          novelty: feedback.metric_score[2]?.score || 0,
          feasibility: feedback.metric_score[3]?.score || 0,
          techStack: feedback.metric_score[4]?.score || 0,
          sustainability: feedback.metric_score[5]?.score || 0,
          impact: feedback.metric_score[6]?.score || 0,
          impression: feedback.metric_score[7]?.score || 0,
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
          originality: feedback.metric_score[0]?.score || 0,
          completion: feedback.metric_score[1]?.score || 0,
          codeQuality: feedback.metric_score[2]?.score || 0,
          ux: feedback.metric_score[3]?.score || 0,
          commercialization: feedback.metric_score[4]?.score || 0,
          marketReady: feedback.metric_score[5]?.score || 0,
          scale: feedback.metric_score[6]?.score || 0,
          futureWork: feedback.metric_score[7]?.score || 0,
          incorpSug: feedback.metric_score[8]?.score || 0,
          impression: feedback.metric_score[9]?.score || 0,
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
                  printOptions: {
                    fileName: "PSB Hackathon Round Scores",
                    pageStyle: `
                      .MuiDataGrid-main::before {
                        content: 'The Union Bank - PSB Hackathon Round ${evaluationRound=='Round 1'?1 : 2} Scores';
                        display: block;
                        font-size: 24px;
                        font-weight: bold;
                      margin-bottom: 10px;
                      margin-top: 15px;
                        text-align: center;
                      }
                        @media print {
                  .MuiDataGrid-footerContainer {
                    display: none !important; 
                  }
                }
                    `,
                  },
                  csvOptions: {
                    fileName: "PSB Hackathon Round Scores",
                    utf8WithBom: true,
                    allColumns: true,
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
