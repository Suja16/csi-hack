import { useState, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Autocomplete,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useQuery, useMutation } from "@apollo/client";
import { EVALUATOR_QUERY, ASSIGN_TEAM, EDIT_TEAM } from "../queries";
import AddEvaluator from "./AddEvaluator";
import { success, failure } from "../utils/snackbar";
import NewFilterDropdown from "./NewFilterButton";
import CsvUploader from "./csvUploader";

const EvaluatorsTable = () => {
  const [editMode, setEditMode] = useState(null);
  const [originalValues, setOriginalValues] = useState({
    mentor: null,
    evaluator1: null,
    evaluator2: null,
  });
  const [pendingChanges, setPendingChanges] = useState({
    mentor: null,
    evaluator1: null,
    evaluator2: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    approved: [],
    submitted: [],
    domain: [],
    pwd: [],
    all_women: [],
    team_completion: [],
    submission_validity: [],
  });
  const [openCsvUploader, setOpenCsvUploader] = useState(false);

  const { data, loading, refetch } = useQuery(EVALUATOR_QUERY, {
    onError: (error) => {
      console.error("Error fetching data:", error);
      failure("An error occurred while fetching data");
    },
  });

  const [assignTeam] = useMutation(ASSIGN_TEAM, {
    onCompleted: () => {
      refetch();
      success("Assigned successfully");
      setEditMode(null);
      setPendingChanges({
        mentor: null,
        evaluator1: null,
        evaluator2: null,
      });
      setOriginalValues({
        mentor: null,
        evaluator1: null,
        evaluator2: null,
      });
    },
    onError: (error) => {
      failure(error.message);
    },
  });

  const [editTeam] = useMutation(EDIT_TEAM, {
    onCompleted: () => {
      refetch();
      success("Edited successfully");
      setEditMode(null);
      setPendingChanges({
        mentor: null,
        evaluator1: null,
        evaluator2: null,
      });
      setOriginalValues({
        mentor: null,
        evaluator1: null,
        evaluator2: null,
      });
    },
    onError: (error) => {
      failure(error.message);
    },
  });

  const handleSaveChanges = useCallback(
    async (teamId) => {
      const assignmentObjects = [];
      const updateObjects = [];

      if (pendingChanges.mentor) {
        if (!originalValues.mentor) {
          assignmentObjects.push({
            Idea_user_Id: pendingChanges.mentor.id,
            team_id: teamId,
          });
        } else if (originalValues.mentor.id !== pendingChanges.mentor.id) {
          updateObjects.push({
            Idea_user_Id: pendingChanges.mentor.id,
            team_id: teamId,
            old_user_Id: originalValues.mentor.id,
          });
        }
      }

      if (pendingChanges.evaluator1) {
        if (!originalValues.evaluator1) {
          assignmentObjects.push({
            Idea_user_Id: pendingChanges.evaluator1.id,
            team_id: teamId,
          });
        } else if (
          originalValues.evaluator1.id !== pendingChanges.evaluator1.id
        ) {
          updateObjects.push({
            Idea_user_Id: pendingChanges.evaluator1.id,
            team_id: teamId,
            old_user_Id: originalValues.evaluator1.id,
          });
        }
      }

      if (pendingChanges.evaluator2) {
        if (!originalValues.evaluator2) {
          assignmentObjects.push({
            Idea_user_Id: pendingChanges.evaluator2.id,
            team_id: teamId,
          });
        } else if (
          originalValues.evaluator2.id !== pendingChanges.evaluator2.id
        ) {
          updateObjects.push({
            Idea_user_Id: pendingChanges.evaluator2.id,
            team_id: teamId,
            old_user_Id: originalValues.evaluator2.id,
          });
        }
      }

      if (assignmentObjects.length > 0) {
        try {
          await assignTeam({
            variables: {
              objects: assignmentObjects,
            },
          });
        } catch (error) {
          console.error("Error saving assignments:", error);
          failure("Failed to save assignments");
        }
      }

      updateObjects.map((object) =>
        editTeam({
          variables: {
            team_id: object.team_id,
            Idea_user_Id: object.Idea_user_Id,
            old_user_Id: object.old_user_Id,
          },
        }).catch((error) => {
          console.error("Error updating assignment:", error);
          failure("Failed to update assignment");
        }),
      );
    },
    [originalValues, pendingChanges, assignTeam, editTeam],
  );

  const handleCancelChanges = useCallback(() => {
    setPendingChanges(originalValues);
    setEditMode(null);
  }, [originalValues]);

  const handleEditModeToggle = useCallback(
    (teamId) => {
      if (editMode === teamId) {
        setEditMode(null);
        setPendingChanges({
          mentor: null,
          evaluator1: null,
          evaluator2: null,
        });
      } else {
        const team = data.Team.find((t) => t.id === teamId);
        const currentMentor = team.feedbacks_from_idea.find(
          (f) => f.Idea_USER.roles === "mentor",
        )?.Idea_USER;
        const internalEvaluator = team.feedbacks_from_idea.find(
          (f) =>
            f.Idea_USER.roles === "evaluator" && f.Idea_USER.type == "internal",
        );
        const bankEvaluator = team.feedbacks_from_idea.find(
          (f) =>
            f.Idea_USER.roles === "evaluator" && f.Idea_USER.type == "bank",
        );

        const initialValues = {
          mentor: currentMentor || null,
          evaluator1: internalEvaluator?.Idea_USER || null,
          evaluator2: bankEvaluator?.Idea_USER || null,
        };

        setOriginalValues(initialValues);
        setPendingChanges(initialValues);
        setEditMode(teamId);
      }
    },
    [data?.Team, editMode],
  );

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Team ID",
        width: 90,
        renderCell: (params) => params.value,
      },
      {
        field: "name",
        headerName: "Team Name",
        flex: 1,
        renderCell: (params) => params.value,
      },
      {
        field: "domain",
        headerName: "Domain",
        flex: 1,
        renderCell: (params) => params.row.submissions?.domain || "-",
      },
      {
        field: "mentorAssigned",
        headerName: "Mentor Assigned",
        flex: 1,
        renderCell: (params) => {
          const mentors =
            data?.Idea_USERS?.filter((user) => user.roles === "mentor") || [];

          if (editMode === params.row.id) {
            return (
              <Autocomplete
                options={mentors}
                getOptionLabel={(option) => option.name}
                value={pendingChanges.mentor}
                onChange={(_, newValue) =>
                  setPendingChanges((prev) => ({ ...prev, mentor: newValue }))
                }
                renderInput={(props) => (
                  <TextField {...props} variant="standard" />
                )}
                size="small"
                fullWidth
              />
            );
          }

          return (
            params.row?.feedbacks_from_idea.find(
              (user) => user.Idea_USER.roles === "mentor",
            )?.Idea_USER.name || "-"
          );
        },
      },
      {
        field: "evaluator1Assigned",
        headerName: "Evaluator 1",
        flex: 1,
        renderCell: (params) => {
          const evaluators =
            data?.Idea_USERS?.filter(
              (user) =>
                user.roles === "evaluator" &&
                user.type === "internal" &&
                user.domain === params.row.submissions?.domain,
            ) || [];

          if (editMode === params.row.id) {
            return (
              <Autocomplete
                options={evaluators}
                getOptionLabel={(option) => option.name}
                value={pendingChanges.evaluator1}
                onChange={(_, newValue) =>
                  setPendingChanges((prev) => ({
                    ...prev,
                    evaluator1: newValue,
                  }))
                }
                renderInput={(props) => (
                  <TextField {...props} variant="standard" />
                )}
                size="small"
                fullWidth
              />
            );
          }

          return (
            params.row?.feedbacks_from_idea.filter(
              (user) =>
                user.Idea_USER.roles === "evaluator" &&
                user.Idea_USER.type === "internal",
            )[0]?.Idea_USER.name || "-"
          );
        },
      },
      {
        field: "evaluator2Assigned",
        headerName: "Evaluator 2",
        flex: 1,
        renderCell: (params) => {
          const evaluators =
            data?.Idea_USERS?.filter(
              (user) =>
                user.roles === "evaluator" &&
                user.type === "bank" &&
                user.domain === params.row.submissions?.domain,
            ) || [];

          if (editMode === params.row.id) {
            return (
              <Autocomplete
                options={evaluators}
                getOptionLabel={(option) => option.name}
                value={pendingChanges.evaluator2}
                onChange={(_, newValue) =>
                  setPendingChanges((prev) => ({
                    ...prev,
                    evaluator2: newValue,
                  }))
                }
                renderInput={(props) => (
                  <TextField {...props} variant="standard" />
                )}
                size="small"
                fullWidth
              />
            );
          }

          return (
            params.row?.feedbacks_from_idea.filter(
              (user) =>
                user.Idea_USER.roles === "evaluator" &&
                user.Idea_USER.type === "bank",
            )[0]?.Idea_USER.name || "-"
          );
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        renderCell: (params) => {
          if (editMode === params.row.id) {
            return (
              <Stack direction="row" spacing={1}>
                <Button
                  startIcon={<SaveIcon />}
                  onClick={() => handleSaveChanges(params.row.id)}
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: "bold", textTransform: "none" }}
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancelChanges}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  sx={{ fontWeight: "bold", textTransform: "none" }}
                >
                  Cancel
                </Button>
              </Stack>
            );
          }
          return (
            <Button
              startIcon={<EditIcon />}
              onClick={() => handleEditModeToggle(params.row.id)}
              size="small"
              sx={{ fontWeight: "bold", textTransform: "none" }}
            >
              Edit
            </Button>
          );
        },
      },
    ],
    [
      editMode,
      pendingChanges,
      data,
      handleEditModeToggle,
      handleSaveChanges,
      handleCancelChanges,
    ],
  );

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
        (participant) => participant.User.gender === "FEMALE",
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

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ p: 2 }} elevation={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <TextField
            label="Search Teams"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenCsvUploader(true)}
            >
              Upload File
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Add Evaluator
            </Button>
            <CsvUploader
              open={openCsvUploader}
              onClose={() => setOpenCsvUploader(false)}
            />
            <NewFilterDropdown filters={filters} setFilters={setFilters} />
          </Box>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" maxHeight="70vh">
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            disableSelectionOnClick
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{
              "& .MuiDataGrid-virtualScroller": { minHeight: "300px" },
              maxHeight: "70vh",
            }}
          />
        )}
        <AddEvaluator open={open} setOpen={setOpen} refetch={refetch} />
      </Paper>
    </Box>
  );
};

export default EvaluatorsTable;
