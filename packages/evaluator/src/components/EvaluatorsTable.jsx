import EditIcon from "@mui/icons-material/Edit";
import RateReviewIcon from "@mui/icons-material/RateReview";
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
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";

const MENTOR_OPTIONS = ["Ayush Mehta", "Oni Chan", "vats boy"];
const EVALUATOR_OPTIONS = [
  "Minank Mehta",
  "Rai Janpara",
  "Twinkle Naman",
  "Suja16",
];
const STATUS_OPTIONS = ["Reviewed", "Pending", "Ongoing", "Assigned"];

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

const FormField = ({
  name,
  label,
  type = "text",
  options = null,
  multiline = false,
  value,
  onChange,
}) => (
  <FormControl sx={styles.formControl}>
    {type === "select" ? (
      <>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          value={value || ""}
          onChange={onChange}
          label={label}
          sx={{ bgcolor: "white" }}
        >
          {options?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </>
    ) : (
      <TextField
        name={name}
        label={label}
        value={value || ""}
        onChange={onChange}
        variant="outlined"
        fullWidth
        multiline={multiline}
        rows={multiline ? 4 : 1}
        sx={{ bgcolor: "white" }}
      />
    )}
  </FormControl>
);

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "select"]),
  options: PropTypes.arrayOf(PropTypes.string),
  multiline: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const EvaluatorsTable = () => {
  const [teams, setTeams] = useState([]);
  const [editDialog, setEditDialog] = useState({
    open: false,
    data: {
      teamName: "",
      mentorAssigned: "",
      evaluator1Assigned: "",
      evaluator2Assigned: "",
      reviewGiven: "",
      status: "",
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const dummyData = [
          {
            id: 1,
            teamName: "Team A",
            mentorAssigned: "Rai Janpara",
            evaluator1Assigned: "Aayush Mehta",
            evaluator2Assigned: "Aayush Mehta",
            reviewGiven: "Good progress",
            status: "Ongoing",
          },
          {
            id: 2,
            teamName: "Team B",
            mentorAssigned: "Saman Nachetee",
            evaluator1Assigned: "Ayush Mehta",
            evaluator2Assigned: "Ayush Mehta",
            reviewGiven: "Needs improvement",
            status: "Pending",
          },
          {
            id: 3,
            teamName: "Team C",
            mentorAssigned: "Viraj Chokeme",
            evaluator1Assigned: "Ayush Mehta",
            evaluator2Assigned: "Ayush Mehta",
            reviewGiven: "Excellent work",
            status: "Reviewed",
          },
          {
            id: 4,
            teamName: "Team D",
            mentorAssigned: "Suja16",
            evaluator1Assigned: "Grace Lee",
            evaluator2Assigned: "Ayush Mehta",
            reviewGiven: "Excellent work",
            status: "Reviewed",
          },
        ];
        setTeams(dummyData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const handleEditClick = useCallback(
    (id) => {
      const teamToEdit = teams.find((team) => team.id === id);
      setEditDialog({ open: true, data: teamToEdit });
    },
    [teams],
  );

  const handleDialogClose = useCallback(
    () => setEditDialog((prev) => ({ ...prev, open: false })),
    [],
  );

  const handleFormChange = useCallback((event) => {
    const { name, value } = event.target;
    setEditDialog((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
    }));
  }, []);

  const handleSave = useCallback(() => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === editDialog.data.id ? { ...team, ...editDialog.data } : team,
      ),
    );
    handleDialogClose();
  }, [editDialog.data, handleDialogClose]);

  useEffect(() => {
    if (editDialog.open) {
      const teamToEdit = teams.find((team) => team.id === editDialog.data.id);
      if (teamToEdit) {
        setEditDialog((prev) => ({ ...prev, data: teamToEdit }));
      }
    }
  }, [editDialog.open, teams]);

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
          <div style={{ fontWeight: "bold", fontSize: "1rem", paddingLeft: 20 }}>
            Team ID
          </div>
        ),
        renderCell: (params) => (
          <div style={{ display: "flex", paddingLeft: 20 }}>{params.value}</div>
        ),
      },
      {
        field: "teamName",
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
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Mentor Assigned</div>
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
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Evaluator 1</div>
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
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Evaluator 2</div>
        ),
      },
      {
        field: "reviewGiven",
        headerName: "Review",
        width: 200,
        flex: 1,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Review</div>
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
              textTransform: "none"
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
    [handleEditClick]
  );

  return (
    <Box sx={styles.root}>
      <Paper sx={styles.paper} elevation={3}>
        <DataGrid
          rows={teams}
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
              <EditIcon sx={{ mr: 1 }} /> Edit Team
            </Typography>
          </DialogTitle>

          <DialogContent sx={styles.dialogContent} dividers>
            <Box mb={3}>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Team Information
              </Typography>
              <FormField
                name="teamName"
                label="Team Name"
                value={editDialog.data.teamName}
                onChange={handleFormChange}
              />
            </Box>

            <Box mb={3}>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Assignments
              </Typography>
              <FormField
                name="mentorAssigned"
                label="Mentor Assigned"
                type="select"
                options={MENTOR_OPTIONS}
                value={editDialog.data.mentorAssigned}
                onChange={handleFormChange}
              />
              <FormField
                name="evaluator1Assigned"
                label="Evaluator 1"
                type="select"
                options={EVALUATOR_OPTIONS}
                value={editDialog.data.evaluator1Assigned}
                onChange={handleFormChange}
              />
              <FormField
                name="evaluator2Assigned"
                label="Evaluator 2"
                type="select"
                options={EVALUATOR_OPTIONS}
                value={editDialog.data.evaluator2Assigned}
                onChange={handleFormChange}
              />
            </Box>

            <Box sx={styles.reviewSection}>
              <Typography variant="h6" sx={styles.sectionTitle}>
                <RateReviewIcon /> Review Details
              </Typography>
              <FormField
                name="reviewGiven"
                label="Performance Review"
                multiline={true}
                value={editDialog.data.reviewGiven}
                onChange={handleFormChange}
              />
              <FormField
                name="status"
                label="Review Status"
                type="select"
                options={STATUS_OPTIONS}
                value={editDialog.data.status}
                onChange={handleFormChange}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={styles.dialogActions}>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default EvaluatorsTable;
