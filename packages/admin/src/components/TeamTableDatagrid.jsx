import { useQuery } from "@apollo/client";
import { Check, Close } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Popup from "../../../ui/popup";
import { TEAM_QUERY } from "../queries";
import TeamDetailsPage from "./DataPopupContent";
import NewFilterDropdown from "./NewFilterButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SubmissionsAdminPopupContent from "./SubmissionsAdminPopupContent";
import { filter } from "motion/react-client";

export default function DataTable() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    approved: [],
    submitted: [],
    domain: [],
    pwd: [],
    all_women: [],
    team_completion: [],
    submission_validity: [],
  });

  const { data, loading } = useQuery(TEAM_QUERY);

  const [submissionPopup, setSubmissionPopup] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

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
        // console.log(params),
        <div style={{ display: "flex", paddingLeft: 20 }}>{params.id}</div>
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
    // {
    //   field: "submissions",
    //   width: 220,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   renderHeader: () => (
    //     <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Submission</div>
    //   ),
    //   renderCell: (params) =>
    //     params.value ? (
    //       <Button
    //         onClick={() => {
    //           console.log("My params : ",params.value);
    //           setSubmissionPopup(true);
    //           setSubmissionData(params.value);
    //         }}
    //       >
    //         <VisibilityIcon sx={{ color: "green" }} />
    //       </Button>
    //     ) : (
    //       <Close sx={{ color: "red" }} />
    //     ),
    // },
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
          <Button
            onClick={() => {
              // Pass the team ID and submission data together
              const teamWithSubmission = {
                id: params.row.id,
                submission: params.value,
              };
              // console.log("Team with Submission: ", teamWithSubmission);
              setSubmissionPopup(true);
              setSubmissionData(teamWithSubmission); // Set both team ID and submission data
            }}
          >
            <VisibilityIcon sx={{ color: "green" }} />
          </Button>
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
          <div style={{ display: "flex" }}>
            <Tooltip
              title={
                <>
                  Evaluator 1: {evaluatorFeedbacks[0]?.totalscore || "-"}
                  <br />
                  Evaluator 2: {evaluatorFeedbacks[1]?.totalscore || "-"}
                </>
              }
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -25],
                      },
                    },
                  ],
                },
              }}
            >
              {evaluatorFeedbacks.length > 0 ? totalScore : "-"}
            </Tooltip>
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
    const matchesSearchQuery = team.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesApprovedFilter =
      filters.approved.length === 0 || filters.approved.includes(team.approved);

    const matchesSubmittedFilter =
      filters.submitted.length === 0 ||
      filters.submitted.includes(Boolean(team.submissions));

    const matchesDomainFilter =
      filters.domain.length === 0 ||
      filters.domain.includes(team.submissions?.domain);

    const matchesPwdFilter = filters.pwd.length === 0 || team.pwd;

    const matchesAllWomenFilter =
      filters.all_women.length === 0 ||
      team.Participants.every(
        (participant) => participant.User.gender === "FEMALE"
      );

    const matchesTeamCompleteFilter =
      filters.team_completion.length === 0 ||
      !filters.team_completion.includes(true) ||
      team.Participants.length === 4;

    const matchesTeamIncompleteFilter =
      filters.team_completion.length === 0 ||
      !filters.team_completion.includes(false) ||
      team.Participants.length < 4;

    const matchesValidSubmissionFilter =
      filters.submission_validity.length === 0 ||
      filters.submission_validity.includes(team.submissions?.valid);

    return (
      matchesSearchQuery &&
      matchesApprovedFilter &&
      matchesSubmittedFilter &&
      matchesDomainFilter &&
      matchesPwdFilter &&
      matchesAllWomenFilter &&
      matchesTeamCompleteFilter &&
      matchesTeamIncompleteFilter &&
      matchesValidSubmissionFilter
    );
  });

  let newFilteredRowsWithUpdatedId = filteredRows?.map((row, index) => {
    return { ...row, id: index + 1 };
  });

  return (
    <Paper sx={{ width: "98%", overflow: "hidden", p: 2, mr: -1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
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

      <Popup dialogProps={{ open: submissionPopup }}>
        <IconButton
          onClick={() => setSubmissionPopup(false)}
          sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
        <SubmissionsAdminPopupContent
          setSubmissionPopup={setSubmissionPopup}
          data={submissionData}
        />
      </Popup>
    </Paper>
  );
}
