import { useState, useCallback } from "react";
import {
  Box,
  TextField,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FilterDropdown from "./FilterButton";
import Popup from "../../../ui/popup";
import TeamDetailsPage from "./DataPopupContent";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { render } from "react-dom";
import {  useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import hooks


const initialData = [
  {
    id: "1",
    teamName: "Tata Consultancy Services",
    approved: true,
    submission: "On Time",
    leaderName: "Amit Kumar",
    teamMembers: [
      {
        name: "Gopal Dose",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "I am passionate about coding and problem-solving. This hackathon gives me an opportunity to work with innovative minds and build impactful solutions.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Rajesh Kumar",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "I love learning new technologies and I want to challenge myself in a competitive environment where I can push the boundaries of my skills.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Sujal Jain",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "This hackathon is a perfect place to collaborate, learn from others, and work on real-world problems using cutting-edge technologies.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Neha Reddy",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "This hackathon is a perfect place to collaborate, learn from others, and work on real-world problems using cutting-edge technologies.",
        github: "https://github.com/GopalDose",
      },
    ],
  },
  {
    id: "2",
    teamName: "Infosys",
    approved: false,
    submission: "Late",
    leaderName: "Sanya Mehra",
    teamMembers: [
      {
        name: "Gopal Dose",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "I am passionate about coding and problem-solving. This hackathon gives me an opportunity to work with innovative minds and build impactful solutions.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Ravi Singh",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "I want to work on something meaningful while learning and growing in a competitive and diverse environment.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Priya Patel",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "The opportunity to meet like-minded individuals and develop creative solutions in a challenging environment motivates me.",
        github: "https://github.com/GopalDose",
      },
    ],
  },
  {
    id: "3",
    teamName: "Wipro",
    approved: true,
    submission: "On Time",
    leaderName: "Ravi Kumar",
    teamMembers: [
      {
        name: "Gopal Dose",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "I believe that innovation happens when diverse minds come together. I look forward to contributing to that creativity in this hackathon.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Manoj Desai",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "This is a fantastic opportunity to learn, grow, and collaborate with talented individuals to create impactful solutions.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Anita Sharma",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "I am excited to push my skills further in a team environment and make meaningful contributions.",
        github: "https://github.com/GopalDose",
      },
    ],
  },
  {
    id: "4",
    teamName: "Tech Mahindra",
    approved: true,
    submission: "On Time",
    leaderName: "Priya Singh",
    teamMembers: [
      {
        name: "Ravi Mehra",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "This hackathon offers a platform for me to test my skills while learning and collaborating with experts in a fast-paced environment.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Manoj Reddy",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "I’m excited to apply my technical knowledge to create solutions that can make a significant difference in society.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Anita Kumari",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "The hackathon provides a platform where we can turn our ideas into reality by leveraging our technical knowledge.",
        github: "https://github.com/GopalDose",
      },
    ],
  },
  {
    id: "5",
    teamName: "Cognizant",
    approved: false,
    submission: "Late",
    leaderName: "Vikram Sharma",
    teamMembers: [
      {
        name: "Priya Gupta",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "I am motivated to contribute to innovative solutions that have the potential to make a lasting impact. The hackathon offers a collaborative environment for that.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Ravi Patil",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "Participating in this hackathon will enable me to sharpen my problem-solving skills while working with a diverse group of talented individuals.",
        github: "https://github.com/GopalDose",
      },
      {
        name: "Shweta Deshmukh",
        resume:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose%20Resume%2026Nov.pdf3d072281-0036-4522-a8ed-f096d6074962?alt=media&token=894c4ca7-e2b9-47e7-a290-4ac754b51230",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FGopal%20Dose.jpg23db608f-3129-49e2-9ee4-7c306e0f4754?alt=media&token=5f5885ed-14af-410d-9d11-b4ff81530f13",
        TechStack:
          "C++, Java, Python, JavaScript, PHP, HTML, CSS, React.js, Node.js, Express.js, ASP.NET, Django, Django REST Framework (DRF), MySQL, MongoDB, PostgreSQL",
        linkedin: "https://www.linkedin.com/in/gopaldose21/",
        why_this_hackathon:
          "This hackathon provides an excellent opportunity to collaborate, innovate, and work on real-world problems with other talented individuals.",
        github: "https://github.com/GopalDose",
      },
    ],
  },
];

export default function DataTable() {
    const navigate = useNavigate(); // For navigation
    const location = useLocation(); // To get the current URL
  
    const [data, setData] = useState(initialData); // Your data
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [selectedRows, setSelectedRows] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);
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
          <div style={{ fontWeight: "bold", fontSize: "1rem", paddingLeft: 20 }}>ID</div>
        ),
        renderCell: (params) => (
          <div style={{ display: "flex", paddingLeft: 20 }}>{params.value}</div>
        ),
      },
      {
        field: "teamName",
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
        renderCell: (params) => (
          <CheckIcon sx={{ color: params.value ? "green" : "red" }} />
        ),
        renderHeader: () => (
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Approved</div>
        ),
      },
      {
        field: "submission",
        width: 220,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>Submission</div>
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
    const handleSearch = useCallback((term) => {
      setSearchTerm(term);
      // Update the URL with the search term as a query parameter
      navigate({
        pathname: location.pathname,
        search: `?search=${term}`, // Add search query parameter to the URL
      });
    }, [location, navigate]);
  
    // Update data when the search term in URL changes
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const searchQuery = queryParams.get("search") || "";
      setSearchTerm(searchQuery);
  
      const filtered = initialData.filter(
        (row) =>
          row.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.submission.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.leaderName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setData(filtered);
    }, [location.search]);
  
    const handlePopupOpen = (row) => {
      setSelectedRowDetails(row);
      setPopupOpen(true);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      setActiveRow(null);
    };
  
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
          <DataGrid rows={data} columns={columns} pageSize={5} />
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
  
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
          <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        </Menu>
      </Paper>
    );
  }
