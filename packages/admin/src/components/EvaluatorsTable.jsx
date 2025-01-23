import { useState, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Autocomplete,
  Stack
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useQuery, useMutation } from "@apollo/client";
import { EVALUATOR_QUERY, ASSIGN_TEAM } from "../queries";
import AddEvaluator from "./AddEvaluator";
import { success, failure } from "../utils/snackbar";

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

  const handleSaveChanges = useCallback(async (teamId) => {
    const assignmentObjects = [];

    if (pendingChanges.mentor) {
      assignmentObjects.push({
        Idea_user_Id: pendingChanges.mentor.id,
        team_id: teamId,
      });
    }

    if (pendingChanges.evaluator1) {
      assignmentObjects.push({
        Idea_user_Id: pendingChanges.evaluator1.id,
        team_id: teamId,
      });
    }

    if (pendingChanges.evaluator2) {
      assignmentObjects.push({
        Idea_user_Id: pendingChanges.evaluator2.id,
        team_id: teamId,
      });
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
  }, [pendingChanges, assignTeam]);

  const handleCancelChanges = useCallback(() => {
    setPendingChanges(originalValues);
    setEditMode(null);
  }, [originalValues]);

  const handleEditModeToggle = useCallback((teamId) => {
    if (editMode === teamId) {
      setEditMode(null);
      setPendingChanges({
        mentor: null,
        evaluator1: null,
        evaluator2: null,
      });
    } else {
      const team = data.Team.find(t => t.id === teamId);
      const currentMentor = team.feedbacks_from_idea.find(f => f.Idea_USER.roles === "mentor")?.Idea_USER;
      const currentEvaluators = team.feedbacks_from_idea.filter(f => f.Idea_USER.roles === "evaluator").map(f => f.Idea_USER);

      const initialValues = {
        mentor: currentMentor || null,
        evaluator1: currentEvaluators[0] || null,
        evaluator2: currentEvaluators[1] || null,
      };

      setOriginalValues(initialValues);
      setPendingChanges(initialValues);
      setEditMode(teamId);
    }
  }, [data?.Team, editMode]);

  const columns = useMemo(() => [
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
      field: "mentorAssigned",
      headerName: "Mentor Assigned",
      flex: 1,
      renderCell: (params) => {
        const mentors = data?.Idea_USERS?.filter(user => user.roles === "mentor") || [];

        if (editMode === params.row.id) {
          return (
            <Autocomplete
              options={mentors}
              getOptionLabel={(option) => option.name}
              value={pendingChanges.mentor}
              onChange={(_, newValue) =>
                setPendingChanges(prev => ({ ...prev, mentor: newValue }))
              }
              renderInput={(props) => <TextField {...props} variant="standard" />}
              size="small"
              fullWidth
            />
          );
        }

        return params.row?.feedbacks_from_idea.find(
          (user) => user.Idea_USER.roles === "mentor"
        )?.Idea_USER.name || "Not Assigned";
      },
    },
    {
      field: "evaluator1Assigned",
      headerName: "Evaluator 1",
      flex: 1,
      renderCell: (params) => {
        const evaluators = (data?.Idea_USERS?.filter(
          user => user.roles === "evaluator" &&
            user.id !== pendingChanges.evaluator2?.id
        )) || [];

        if (editMode === params.row.id) {
          return (
            <Autocomplete
              options={evaluators}
              getOptionLabel={(option) => option.name}
              value={pendingChanges.evaluator1}
              onChange={(_, newValue) =>
                setPendingChanges(prev => ({ ...prev, evaluator1: newValue }))
              }
              renderInput={(props) => <TextField {...props} variant="standard" />}
              size="small"
              fullWidth
            />
          );
        }

        return params.row?.feedbacks_from_idea.filter(
          (user) => user.Idea_USER.roles === "evaluator"
        )[0]?.Idea_USER.name || "Not Assigned";
      },
    },
    {
      field: "evaluator2Assigned",
      headerName: "Evaluator 2",
      flex: 1,
      renderCell: (params) => {
        const evaluators = (data?.Idea_USERS?.filter(
          user => user.roles === "evaluator" &&
            user.id !== pendingChanges.evaluator1?.id
        )) || [];

        if (editMode === params.row.id) {
          return (
            <Autocomplete
              options={evaluators}
              getOptionLabel={(option) => option.name}
              value={pendingChanges.evaluator2}
              onChange={(_, newValue) =>
                setPendingChanges(prev => ({ ...prev, evaluator2: newValue }))
              }
              renderInput={(props) => <TextField {...props} variant="standard" />}
              size="small"
              fullWidth
            />
          );
        }

        return params.row?.feedbacks_from_idea.filter(
          (user) => user.Idea_USER.roles === "evaluator"
        )[1]?.Idea_USER.name || "Not Assigned";
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
  ], [
    editMode,
    pendingChanges,
    data,
    handleEditModeToggle,
    handleSaveChanges,
    handleCancelChanges
  ]);

  const filteredRows = data?.Team.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <Paper sx={{ p: 2, height: "100%" }} elevation={3}>
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add Evaluator
          </Button>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center">
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
            sx={{ "& .MuiDataGrid-virtualScroller": { minHeight: "300px" } }}
          />
        )}
        <AddEvaluator open={open} setOpen={setOpen} refetch={refetch} />
      </Paper>
    </Box>
  );
};

export default EvaluatorsTable;
