import { useState, useCallback } from "react";
import {
  Box,
  TextField,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close, Check } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FilterDropdown from "./FilterButton";
import Popup from "../../../ui/popup";
import TeamDetailsPage from "./DataPopupContent";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom"; // Import hooks
import { useQuery } from "@apollo/client";
import { TEAM_QUERY } from "../queries";

export default function DataTable() {
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // To get the current URL

  // const [data, setData] = useState(initialData); // Your data
  const { data, loading, error } = useQuery(TEAM_QUERY);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);

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

  // Function to handle search and update URL
  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term);
      // Update the URL with the search term as a query parameter
      navigate({
        pathname: location.pathname,
        search: `?search=${term}`, // Add search query parameter to the URL
      });
    },
    [location, navigate],
  );

  // Update data when the search term in URL changes
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const searchQuery = queryParams.get("search") || "";
  //   setSearchTerm(searchQuery);

  //   const filtered = initialData.filter(
  //     (row) =>
  //       row.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       row.submission.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       row.leaderName.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setData(filtered);
  // }, [location.search]);

  const handlePopupOpen = (row) => {
    setSelectedRowDetails(row);
    setPopupOpen(true);
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper sx={{ width: "98%", overflow: "hidden", p: 2, mr: -1 }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          mb: 3,
          mt: 1,
          gap: 2,
        }}
      >
        <TextField
          placeholder="Search teams..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)} // Update URL on change
          sx={{ minWidth: { xs: 200, md: 300 } }}
        />
        <FilterDropdown />
      </Box>

      <Box sx={{ height: "70vh", width: "99%" }}>
        <DataGrid
          rows={loading ? [] : data.Team}
          columns={columns}
          pageSize={5}
        />
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
