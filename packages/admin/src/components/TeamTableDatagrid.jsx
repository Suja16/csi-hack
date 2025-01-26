import { useQuery } from "@apollo/client";
import { Check, Close } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Popup from "../../../ui/popup";
import { TEAM_QUERY } from "../queries";
import TeamDetailsPage from "./DataPopupContent";
import NewFilterDropdown from "./NewFilterButton";

export default function DataTable() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ approved: null, submitted: null }); // State for filters

  const { data, loading } = useQuery(TEAM_QUERY);

  const columns = [
    {
      field: "id",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem", paddingLeft: 20 }}>
          ID
        </div>
      ),
      renderCell: (params) => (
        <div style={{ display: "flex", paddingLeft: 20 }}>{params.value}</div>
      ),
    },
    {
      field: "name",
      width: 350,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Team Name</div>
      ),
    },
    {
      field: "approved",
      width: 220,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) =>
        params.value ? (
          <Check sx={{ color: "green" }} />
        ) : (
          <Close sx={{ color: "red" }} />
        ),
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Approved</div>
      ),
    },
    {
      field: "submissions",
      width: 220,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Submission</div>
      ),
      renderCell: (params) =>
        params.value ? (
          <Check sx={{ color: "green" }} />
        ) : (
          <Close sx={{ color: "red" }} />
        ),
    },
    {
      field: "leaderName",
      headerName: "Leader Name",
      width: 290,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Leader Name</div>
      ),
      renderCell: (params) => (
        <div style={{ display: "flex" }}>{params.row.Leader.name}</div>
      ),
    },
    {
      field: "score",
      headerName: "Score",
      width: 160,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Score</div>
      ),
      renderCell: (params) => {
        const feedbacks = params.row.feedbacks_from_idea || [];
        const evaluatorFeedbacks = feedbacks.filter(
          (feedback) => feedback.Idea_USER?.roles === "evaluator"
        );
        const totalScore = evaluatorFeedbacks.reduce(
          (sum, feedback) => sum + (feedback.totalscore || 0),
          0
        );
    
        // Print the scores in the console
        // if (evaluatorFeedbacks.length > 0) {
        //   console.log(`Team ID: ${params.row.id}, Scores:`, evaluatorFeedbacks, `Total Score: ${totalScore}`);
        // }
    
        return (
          <div style={{ display: "flex"}}>
            {evaluatorFeedbacks.length > 0 ? totalScore : "No Score"}
          </div>
        );
      },
    },        
    {
      field: "moreDetails",
      headerName: "More Details",
      width: 160,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <RemoveRedEyeIcon
          sx={{ cursor: "pointer", color: "#00579c", width: "100%" }}
          onClick={() => handlePopupOpen(params.row)}
        />
      ),
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>More Details</div>
      ),
    },
  ];

  const handlePopupOpen = (row) => {
    setSelectedRowDetails(row);
    setPopupOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = data?.Team.filter((team) => {
    const matchesSearchQuery = team.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesApprovedFilter = filters.approved === null || team.approved === filters.approved;
    const matchesSubmittedFilter = 
      filters.submitted === null || 
      (filters.submitted ? team.submissions !== null : team.submissions === null);
    
    return matchesSearchQuery && matchesApprovedFilter && matchesSubmittedFilter;
  });
  

  return (
    <Paper sx={{ width: "98%", overflow: "hidden", p: 2, mr: -1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <TextField
          label="Search Teams"
          variant="outlined"
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NewFilterDropdown filters={filters} setFilters={setFilters} />
        </Box>
      </Box>
      <Box sx={{ height: "70vh", width: "99%" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid rows={filteredRows || []} columns={columns} pageSize={5} />
        )}
      </Box>

      <Popup dialogProps={{ open: popupOpen }}>
        <IconButton
          onClick={() => setPopupOpen(false)}
          sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
        <TeamDetailsPage teamData={selectedRowDetails} />
      </Popup>
    </Paper>
  );
}