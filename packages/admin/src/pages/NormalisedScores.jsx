import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Eval1Scores, Eval2Scores } from "../queries";

export default function NormalisedScores() {
  const { data: eval1Data, loading: eval1loading } = useQuery(Eval1Scores);
  const { data: eval2Data, loading: eval2loading } = useQuery(Eval2Scores);
  const [rows, setRows] = useState([]);
  const [eval1Stats, setEval1Stats] = useState({ mean: 0, stdDev: 0 });
  const [eval2Stats, setEval2Stats] = useState({ mean: 0, stdDev: 0 });
  const [AllData, setAllData] = useState({ mean: 0, stdDev: 0 });

  const NormalisationFunc = (data) => {
    const allscores = [];
    for (let i = 0; i < data.length; i++) {
      allscores.push(data[i].totalScore);
    }
    const mean =
      allscores.reduce((sum, score) => sum + score, 0) / allscores.length;
    const stdDev = Math.sqrt(
      allscores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) /
        allscores.length
    );
    for (let i = 0; i < allscores.length; i++) {
      allscores[i] = (allscores[i] - mean) / stdDev;
    }
    const min = Math.min(...allscores);
    const max = Math.max(...allscores);
    const range = max - min;

    for (let i = 0; i < data.length; i++) {
      data[i].totalScore = (data[i].totalScore - mean) / stdDev;
    }
    for (let i = 0; i < data.length; i++) {
      data[i].totalScore = (data[i].totalScore - min) / range;
    }
    setAllData({ mean, stdDev });
  };

  useEffect(() => {
    if (eval1Data && eval2Data) {
      // Calculate mean and stdDev for eval1Scores
      const eval1Scores = eval1Data.feedbacks.map(
        (feedback) => feedback.totalscore
      );
      const eval1Mean =
        eval1Scores.reduce((sum, score) => sum + score, 0) / eval1Scores.length;
      const eval1StdDev = Math.sqrt(
        eval1Scores.reduce(
          (sum, score) => sum + Math.pow(score - eval1Mean, 2),
          0
        ) / eval1Scores.length
      );
      setEval1Stats({ mean: eval1Mean, stdDev: eval1StdDev });

      // Calculate mean and stdDev for eval2Scores
      const eval2Scores = eval2Data.feedbacks.map(
        (feedback) => feedback.totalscore
      );
      const eval2Mean =
        eval2Scores.reduce((sum, score) => sum + score, 0) / eval2Scores.length;
      const eval2StdDev = Math.sqrt(
        eval2Scores.reduce(
          (sum, score) => sum + Math.pow(score - eval2Mean, 2),
          0
        ) / eval2Scores.length
      );
      setEval2Stats({ mean: eval2Mean, stdDev: eval2StdDev });

      const all_data = [];
      eval1Data.feedbacks.forEach((feedback, index) => {
        all_data.push({
          id: feedback.id,
          team_id: feedback.team_id,
          team_name: feedback.team_info_from_eventio?.name || "Unknown",
          leader_name:
            feedback.team_info_from_eventio?.Leader?.name || "Unknown",
          average:
            (feedback.totalscore +
              eval2Data.feedbacks[index].totalscore * (100 / 150)) /
            2,
          totalScore:
            (feedback.totalscore +
              eval2Data.feedbacks[index].totalscore * (100 / 150)) /
            2,
          eval1Score: feedback.totalscore,
          eval2Score: eval2Data.feedbacks[index].totalscore,
          college_name:
            feedback.team_info_from_eventio?.Leader?.college || "Unknown",
        });
      });

      NormalisationFunc(all_data);
      setRows(all_data);
    }
  }, [eval1Data, eval2Data]);

  const columns = [
    {
      field: "team_id",
      headerName: "Team ID",
      width: 120,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "team_name",
      headerName: "Team Name",
      width: 150,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "leader_name",
      headerName: "Leader Name",
      width: 150,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "college_name",
      headerName: "College",
      width: 250,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "eval1Score",
      headerName: "Eval 1 Score",
      width: 150,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "eval2Score",
      headerName: "Eval 2 Score",
      width: 150,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "average",
      headerName: "Average score",
      width: 150,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "totalScore",
      headerName: "Total Score(Normalised)",
      width: 150,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
  ];

  if (eval1loading || eval2loading) {
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
    <Box
      sx={{
        height: 600,
        width: "100%",
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "1px solid #f0f0f0",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        },
        "& .MuiDataGrid-toolbarContainer": {
          padding: "8px 16px",
        },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 3,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Union Bank - PSB Hackathon Normalised Scores
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            printOptions: {
              fileName: "PSB Hackathon Normalised Scores",
              pageStyle: `
                .MuiDataGrid-main::before {
                  content: 'PSB Hackathon Normalised Scores';
                  display: block;
                  font-size: 24px;
                  font-weight: bold;
                margin-bottom: 10px;
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
              fileName: "PSB Hackathon Normalised Scores",
              utf8WithBom: true,
              allColumns: true,
            },
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 100 },
          },
          sorting: {
            sortModel: [{ field: "totalScore", sort: "desc" }],
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        disableRowSelectionOnClick
        getRowClassName={() => "cursor-pointer hover:bg-gray-50"}
      />
    </Box>
  );
}
