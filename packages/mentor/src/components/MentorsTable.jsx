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
  searchInput: {
    marginBottom: "20px",
    width: "100%",
    maxWidth: "300px",
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

const MentorsTable = () => {
  const [teams, setTeams] = useState([]);
  const [editDialog, setEditDialog] = useState({
    open: false,
    data: {
      teamName: "",
     
      reviewGiven: "",
      status: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const dummyData = [
          {
            id: 1,
            teamName: "Team A",
      
            reviewGiven: "Good progress",
            status: "Ongoing",
          },
          {
            id: 2,
            teamName: "Team B",
          
            reviewGiven: "Needs improvement",
            status: "Pending",
          },
          {
            id: 3,
            teamName: "Team C",
      
            reviewGiven: "Excellent work",
            status: "Reviewed",
          },
          {
            id: 4,
            teamName: "Team D",
         
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
    []
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
        team.id === editDialog.data.id ? { ...team, ...editDialog.data } : team
      )
    );
    handleDialogClose();
  }, [editDialog.data, handleDialogClose]);

  const columns = useMemo(() => [
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
      width: 130,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Team Name</div>
      ),
    },


    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          onClick={() => handleEditClick(params.row.id)}
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      ),
    },
  ], [handleEditClick]);

  // Search filter logic
  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={styles.root}>
      <Paper sx={styles.paper} elevation={3}>
        <Typography variant="h6" component="div" gutterBottom>
          Mentor Management
        </Typography>
        
        {/* Search Input */}
        <TextField
          label="Search Team"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={styles.searchInput}
        />

        <DataGrid
          rows={filteredTeams}
          columns={columns}
          loading={loading}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          autoHeight
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={editDialog.open}
        onClose={handleDialogClose}
        sx={styles.dialog}
      >
        <DialogTitle sx={styles.dialogTitle}>
          <RateReviewIcon />
          Edit Team Details
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <FormField
            name="teamName"
            label="Team Name"
            value={editDialog.data.teamName}
            onChange={handleFormChange}
          />
         
          <FormField
            name="reviewGiven"
            label="Your Feedback"
            multiline
            value={editDialog.data.reviewGiven}
            onChange={handleFormChange}
          />
          
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MentorsTable;
