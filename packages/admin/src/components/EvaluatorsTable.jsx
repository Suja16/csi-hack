import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { EVALUATOR_QUERY, ASSIGN_TEAM } from "../queries";
import AddEvaluator from "./AddEvaluator";

const styles = {
  root: {
    height: 600,
    width: "100%",
    "& .MuiDataGrid-root": { border: "none" },
    "& .MuiDataGrid-cell": { borderBottom: "1px solid #f0f0f0" },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#f5f5f5",
      borderBottom: "none",
    },
    "& .MuiDataGrid-virtualScroller": { backgroundColor: "#fff" },
  },
  paper: { p: 2, display: "flex", flexDirection: "column", height: "100%" },
  dialog: {
    "& .MuiDialog-paper": {
      width: "600px",
      maxWidth: "95vw",
      borderRadius: "12px",
      overflow: "hidden",
    },
  },
  dialogTitle: {
    bgcolor: "primary.main",
    color: "white",
    py: 2,
    "& .MuiTypography-root": {
      display: "flex",
      alignItems: "center",
      gap: 1,
      fontSize: "1.5rem",
    },
  },
  dialogContent: { py: 3, px: 3 },
  dialogActions: { px: 3, py: 2, bgcolor: "grey.50" },
  formControl: { mt: 2, minWidth: "100%" },
  reviewSection: { mt: 3, mb: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 2,
    color: "primary.main",
    fontWeight: "medium",
  },
};

const EvaluatorsTable = () => {
  const [editDialog, setEditDialog] = useState({
    open: false,
    data: {
      teamName: "",
      mentor: null,
      evaluator1: null,
      evaluator2: null,
    },
  });
  const { data, loading, error, refetch } = useQuery(EVALUATOR_QUERY);
  const [assignTeam, { loading: assignLoading }] = useMutation(ASSIGN_TEAM);
  const [open, setOpen] = useState(false);

  const handleEditClick = useCallback(
    (id) => {
      const teamToEdit = data.Team.find((team) => team.id === id);
      const mentor = teamToEdit.feedbacks_from_idea.filter(
        (user) => user.Idea_USER.roles == "mentor",
      )[0]?.Idea_USER.id;
      const evaluator1 = teamToEdit.feedbacks_from_idea.filter(
        (user) => user.Idea_USER.roles == "evaluator",
      )[0]?.Idea_USER.id;
      const evaluator2 = teamToEdit.feedbacks_from_idea.filter(
        (user) => user.Idea_USER.roles == "evaluator",
      )[1]?.Idea_USER.id;
      const d = {
        id: teamToEdit.id,
        name: teamToEdit.name,
        mentor,
        evaluator1,
        evaluator2,
      };
      setEditDialog({ open: true, data: d });
    },
    [data?.Team],
  );

  const handleDialogClose = useCallback(
    () => setEditDialog((prev) => ({ ...prev, open: false })),
    [],
  );

  const handleSave = useCallback(async () => {
    const promises = [];
    if (editDialog.data.mentor) {
      promises.push(
        assignTeam({
          variables: {
            Idea_user_Id: editDialog.data.mentor,
            team_id: editDialog.data.id,
          },
        }),
      );
    }
    if (editDialog.data.evaluator1) {
      promises.push(
        assignTeam({
          variables: {
            Idea_user_Id: editDialog.data.evaluator1,
            team_id: editDialog.data.id,
          },
        }),
      );
    }

    if (editDialog.data.evaluator2) {
      promises.push(
        assignTeam({
          variables: {
            Idea_user_Id: editDialog.data.evaluator2,
            team_id: editDialog.data.id,
          },
        }),
      );
    }

    await Promise.all(promises);
    await refetch();
    handleDialogClose();
  }, [editDialog.data, handleDialogClose]);

  // useEffect(() => {
  //   if (editDialog.open) {
  //     const teamToEdit = data.Team.find(
  //       (team) => team.id === editDialog.data.id,
  //     );
  //     if (teamToEdit) {
  //       setEditDialog((prev) => ({ ...prev, data: teamToEdit }));
  //     }
  //   }
  // }, [editDialog.open, data?.Team]);

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Team ID",
        width: 90,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Team ID</div>
        ),
        renderCell: (params) => (
          <div style={{ display: "flex", paddingLeft: 20 }}>{params.value}</div>
        ),
      },
      {
        field: "name",
        headerName: "Team Name",
        width: 150,
        flex: 1,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Team Name</div>
        ),
      },
      {
        field: "mentorAssigned",
        headerName: "Mentor Assigned",
        width: 180,
        flex: 1,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
            Mentor Assigned
          </div>
        ),
        renderCell: (params) => (
          <div style={{ display: "flex" }}>
            {params.row?.feedbacks_from_idea.filter(
              (user) => user.Idea_USER.roles == "mentor",
            )[0]?.Idea_USER.name || "Not Assigned"}
          </div>
        ),
      },
      {
        field: "evaluator1Assigned",
        headerName: "Evaluator 1",
        width: 180,
        flex: 1,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
            Evaluator 1
          </div>
        ),
        renderCell: (params) => (
          <div style={{ display: "flex" }}>
            {params.row?.feedbacks_from_idea.filter(
              (user) => user.Idea_USER.roles == "evaluator",
            )[0]?.Idea_USER.name || "Not Assigned"}
          </div>
        ),
      },
      {
        field: "evaluator2Assigned",
        headerName: "Evaluator 2",
        width: 180,
        flex: 1,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
            Evaluator 2
          </div>
        ),
        renderCell: (params) => (
          <div style={{ display: "flex" }}>
            {params.row?.feedbacks_from_idea.filter(
              (user) => user.Idea_USER.roles == "evaluator",
            )[1]?.Idea_USER.name || "Not Assigned"}
          </div>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Status</div>
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: (params) => (
          <Button
            startIcon={<EditIcon />}
            onClick={() => handleEditClick(params.row.id)}
            size="small"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
            }}
          >
            Edit
          </Button>
        ),
        renderHeader: () => (
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Actions</div>
        ),
      },
    ],
    [handleEditClick],
  );

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={styles.root}>
      <Paper sx={styles.paper} elevation={3}>
        <Box display="flex" justifyContent="flex-start">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            sx={{ mb: 2 }}
          >
            Add Evaluator
          </Button>
        </Box>
        <DataGrid
          rows={data.Team}
          columns={columns}
          loading={loading}
          disableSelectionOnClick
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{ "& .MuiDataGrid-virtualScroller": { minHeight: "300px" } }}
        />
        <Dialog
          open={editDialog.open}
          onClose={handleDialogClose}
          sx={styles.dialog}
          maxWidth="md"
        >
          <DialogTitle sx={styles.dialogTitle}>
            <Typography variant="h6">
              <EditIcon sx={{ mr: 1 }} /> {editDialog.data.name}
            </Typography>
          </DialogTitle>

          <DialogContent sx={styles.dialogContent} dividers>
            <Box mb={3}>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Assignments
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Mentor</InputLabel>
                <Select
                  name="mentor"
                  label="MENTOR"
                  value={editDialog.data.mentor || 0}
                  onChange={(e) =>
                    setEditDialog({
                      open: editDialog.open,
                      data: {
                        ...editDialog.data,
                        mentor: e.target.value,
                      },
                    })
                  }
                >
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>
                  {data?.Idea_USERS?.filter(
                    (user) => user.roles == "mentor",
                  ).map((mentor) => (
                    <MenuItem key={mentor.id} value={mentor.id}>
                      {mentor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Evaluator 1</InputLabel>
                <Select
                  name="evaluator1"
                  label="EVALUATOR 1"
                  value={editDialog.data.evaluator1 || 0}
                  onChange={(e) =>
                    setEditDialog({
                      open: editDialog.open,
                      data: {
                        ...editDialog.data,
                        evaluator1: e.target.value,
                      },
                    })
                  }
                >
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>
                  {data?.Idea_USERS?.filter(
                    (user) => user.roles == "evaluator",
                  ).map((evaluator) => (
                    <MenuItem key={evaluator.id} value={evaluator.id}>
                      {evaluator.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Evaluator 2
                </InputLabel>
                <Select
                  name="evaluator2"
                  label="EVALUATOR 2"
                  value={editDialog.data.evaluator2 || 0}
                  onChange={(e) =>
                    setEditDialog({
                      open: editDialog.open,
                      data: {
                        ...editDialog.data,
                        evaluator2: e.target.value,
                      },
                    })
                  }
                >
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>
                  {data?.Idea_USERS?.filter(
                    (user) => user.roles == "evaluator",
                  ).map((evaluator) => (
                    <MenuItem key={evaluator.id} value={evaluator.id}>
                      {evaluator.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>

          <DialogActions sx={styles.dialogActions}>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSave} type="submit" loding={assignLoading}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        <AddEvaluator open={open} setOpen={setOpen} />
      </Paper>
    </Box>
  );
};

export default EvaluatorsTable;
