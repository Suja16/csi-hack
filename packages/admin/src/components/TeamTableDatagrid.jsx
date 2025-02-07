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
import { useEffect, useState } from "react";
import Popup from "../../../ui/popup";
import { TEAM_QUERY } from "../queries";
import TeamDetailsPage from "./DataPopupContent";
import NewFilterDropdown from "./NewFilterButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SubmissionsAdminPopupContent from "./SubmissionsAdminPopupContent";

export default function DataTable() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    approved: [],
    submitted: [true],
    domain: [],
    pwd: [],
    all_women: [],
    team_completion: [],
    submission_validity: [true],
    consent: [],
    evaluated: [],
  });

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const { data, loading } = useQuery(TEAM_QUERY);

  const [submissionPopup, setSubmissionPopup] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

  const columns = [
    {
      field: "id",
      width: 80,
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
      width: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Team Name</div>
      ),
    },
    {
      field: "domain",
      width: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Domain</div>
      ),
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          {params.row.submissions?.domain ?? "-"}
        </div>
      ),
    },
    {
      field: "college",
      width: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>College</div>
      ),
      renderCell: (params) => (
        <div style={{ display: "flex" }}>{params.row.Leader.college}</div>
      ),
    },
    {
      field: "leaderName",
      headerName: "Leader Name",
      width: 200,
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
      field: "approved",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) =>
        params.value ? (
          <Check
            sx={{
              color: "green",
              display: "flex",
              height: "100%",
              width: "100%",
              padding: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : (
          <Close
            color="secondary"
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              padding: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ),
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Approved</div>
      ),
    },
    {
      field: "submissions",
      width: 120,
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
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <VisibilityIcon color="primary" />
          </Button>
        ) : (
          <Close
            color="secondary"
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              padding: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ),
    },
    {
      field: "valid",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) =>
        params.row.submissions?.valid ? (
          <Check
            sx={{
              color: "green",
              display: "flex",
              height: "100%",
              width: "100%",
              padding: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : params.row.submissions?.valid === false ? (
          <Close
            color="secondary"
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              padding: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              padding: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            -
          </div>
        ),
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Valid</div>
      ),
    },
    {
      field: "consent",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) =>
        params.row.submissions?.consent ? (
          <Check
            sx={{
              color: "green",
              display: "flex",
              height: "100%",
              width: "100%",
              padding: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : (
          <Close
            color="secondary"
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              padding: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ),
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Consent</div>
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
          (feedback) => feedback.Idea_USER?.roles === "evaluator",
        );
        const evaluator1Score = evaluatorFeedbacks.find(
          (feedback) =>
            feedback.Idea_USER?.type === "internal" &&
            feedback.totalscore !== null,
        )?.totalscore;
        const evaluator2Score = evaluatorFeedbacks.find(
          (feedback) =>
            feedback.Idea_USER?.type === "bank" && feedback.totalscore !== null,
        )?.totalscore;
        const totalScore = evaluator1Score
          ? evaluator1Score
          : 0 + evaluator2Score
            ? evaluator2Score
            : 0;
        const avgScore =
          totalScore /
            evaluatorFeedbacks.filter((e) => e.totalscore !== null).length ||
          null;

        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <Tooltip
              title={
                <>
                  Evaluator 1: {evaluator1Score || "-"}
                  <br />
                  Evaluator 2: {evaluator2Score || "-"}
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
              {avgScore || "-"}
            </Tooltip>
          </Box>
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
        <Button
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => handlePopupOpen(params.row)}
        >
          <RemoveRedEyeIcon color="primary" />
        </Button>
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

    const matchesPwdFilter = filters.pwd.length === 0 || team.submissions?.pwd;

    const matchesAllWomenFilter =
      filters.all_women.length === 0 ||
      team.Participants.every(
        (participant) => participant.User.gender === "FEMALE",
      );

    const matchesTeamCompleteFilter =
      filters.team_completion.length === 0 ||
      filters.team_completion.includes(Boolean(team.Participants.length === 4));

    const matchesValidSubmissionFilter =
      filters.submission_validity.length === 0 ||
      filters.submission_validity.includes(team.submissions?.valid);

    const matchesConsentFilter =
      filters.consent.length === 0 ||
      filters.consent.includes(Boolean(team.submissions?.consent));

    const matchesEvaluator1Filter =
      !filters.evaluated.includes("evaluator1") ||
      team.feedbacks_from_idea.some(
        (feedback) =>
          feedback.Idea_USER?.roles === "evaluator" &&
          feedback.Idea_USER?.type === "internal" &&
          feedback.totalscore !== null,
      );

    const matchesEvaluator2Filter =
      !filters.evaluated.includes("evaluator2") ||
      team.feedbacks_from_idea.some(
        (feedback) =>
          feedback.Idea_USER?.roles === "evaluator" &&
          feedback.Idea_USER?.type === "bank" &&
          feedback.totalscore !== null,
      );

    const matchesBothEvaluatorsFilter =
      !filters.evaluated.includes("both") ||
      (team.feedbacks_from_idea.some(
        (feedback) =>
          feedback.Idea_USER?.roles === "evaluator" &&
          feedback.Idea_USER?.type === "internal" &&
          feedback.totalscore !== null,
      ) &&
        team.feedbacks_from_idea.some(
          (feedback) =>
            feedback.Idea_USER?.roles === "evaluator" &&
            feedback.Idea_USER?.type === "bank" &&
            feedback.totalscore !== null,
        ));

    const matchesNoneEvaluatorsFilter =
      !filters.evaluated.includes("none") ||
      (!team.feedbacks_from_idea.some(
        (feedback) =>
          feedback.Idea_USER?.roles === "evaluator" &&
          feedback.Idea_USER?.type === "internal" &&
          feedback.totalscore !== null,
      ) &&
        !team.feedbacks_from_idea.some(
          (feedback) =>
            feedback.Idea_USER?.roles === "evaluator" &&
            feedback.Idea_USER?.type === "bank" &&
            feedback.totalscore !== null,
        ));

    return (
      matchesSearchQuery &&
      matchesApprovedFilter &&
      matchesSubmittedFilter &&
      matchesDomainFilter &&
      matchesPwdFilter &&
      matchesAllWomenFilter &&
      matchesTeamCompleteFilter &&
      matchesValidSubmissionFilter &&
      matchesConsentFilter &&
      matchesEvaluator1Filter &&
      matchesEvaluator2Filter &&
      matchesBothEvaluatorsFilter &&
      matchesNoneEvaluatorsFilter
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
