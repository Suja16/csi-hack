import { useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { MoreVert, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FilterDropdown from "./FilterButton";
import Popup from "../../../ui/popup";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TeamDetailsPage from "./DataPopupContent";

// const initialData = [
//   {
//     id: "1",
//     teamName: "Tata Consultancy Services",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Amit Kumar",
//   },
//   {
//     id: "2",
//     teamName: "Infosys",
//     approved: false,
//     submission: "Late",
//     leaderName: "Sanya Mehra",
//   },
//   {
//     id: "3",
//     teamName: "Wipro",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Ravi Kumar",
//   },
//   {
//     id: "4",
//     teamName: "Tech Mahindra",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Priya Singh",
//   },
//   {
//     id: "5",
//     teamName: "Cognizant",
//     approved: false,
//     submission: "Late",
//     leaderName: "Vikram Sharma",
//   },
//   {
//     id: "6",
//     teamName: "HCL Technologies",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Anita Yadav",
//   },
//   {
//     id: "7",
//     teamName: "Accenture",
//     approved: false,
//     submission: "Late",
//     leaderName: "Rajesh Gupta",
//   },
//   {
//     id: "8",
//     teamName: "Larsen & Toubro",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Neha Verma",
//   },
//   {
//     id: "9",
//     teamName: "Tech Mahindra",
//     approved: false,
//     submission: "Late",
//     leaderName: "Aakash Reddy",
//   },
//   {
//     id: "10",
//     teamName: "Capgemini",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Sandeep Jain",
//   },
//   {
//     id: "11",
//     teamName: "Mindtree",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Shweta Patel",
//   },
//   {
//     id: "12",
//     teamName: "Hewlett Packard Enterprise",
//     approved: false,
//     submission: "Late",
//     leaderName: "Manoj Bansal",
//   },
//   {
//     id: "13",
//     teamName: "Oracle India",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Pooja Sharma",
//   },
//   {
//     id: "14",
//     teamName: "IBM India",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Nitin Agarwal",
//   },
//   {
//     id: "15",
//     teamName: "SAP India",
//     approved: false,
//     submission: "Late",
//     leaderName: "Arvind Kumar",
//   },
//   {
//     id: "16",
//     teamName: "DXC Technology",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Geeta Joshi",
//   },
//   {
//     id: "17",
//     teamName: "Siemens India",
//     approved: false,
//     submission: "Late",
//     leaderName: "Rohit Chaudhary",
//   },
//   {
//     id: "18",
//     teamName: "Adobe India",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Kavita Rao",
//   },
//   {
//     id: "19",
//     teamName: "Zensar Technologies",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Manish Patel",
//   },
//   {
//     id: "20",
//     teamName: "Cognizant",
//     approved: false,
//     submission: "Late",
//     leaderName: "Nidhi Tiwari",
//   },
//   {
//     id: "21",
//     teamName: "Wipro",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Arun Gupta",
//   },
//   {
//     id: "22",
//     teamName: "Tata Consultancy Services",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Meenal Bhat",
//   },
//   {
//     id: "23",
//     teamName: "Infosys",
//     approved: false,
//     submission: "Late",
//     leaderName: "Kiran Sharma",
//   },
//   {
//     id: "24",
//     teamName: "Tech Mahindra",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Ruchi Patil",
//   },
//   {
//     id: "25",
//     teamName: "HCL Technologies",
//     approved: false,
//     submission: "Late",
//     leaderName: "Ankit Gupta",
//   },
//   {
//     id: "26",
//     teamName: "Mindtree",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Suman Verma",
//   },
//   {
//     id: "27",
//     teamName: "Oracle India",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Rahul Sharma",
//   },
//   {
//     id: "28",
//     teamName: "Capgemini",
//     approved: false,
//     submission: "Late",
//     leaderName: "Kavita Yadav",
//   },
//   {
//     id: "29",
//     teamName: "Siemens India",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Sushil Kumar",
//   },
//   {
//     id: "30",
//     teamName: "IBM India",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Tanuja Reddy",
//   },
//   {
//     id: "31",
//     teamName: "Adobe India",
//     approved: false,
//     submission: "Late",
//     leaderName: "Deepak Chauhan",
//   },
//   {
//     id: "32",
//     teamName: "Accenture",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Niharika Patil",
//   },
//   {
//     id: "33",
//     teamName: "DXC Technology",
//     approved: false,
//     submission: "Late",
//     leaderName: "Harish Mehta",
//   },
//   {
//     id: "34",
//     teamName: "Zensar Technologies",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Raghav Sharma",
//   },
//   {
//     id: "35",
//     teamName: "Wipro",
//     approved: false,
//     submission: "Late",
//     leaderName: "Amit Deshmukh",
//   },
//   {
//     id: "36",
//     teamName: "Tech Mahindra",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Sandeep Thakur",
//   },
//   {
//     id: "37",
//     teamName: "Infosys",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Priyanka Sharma",
//   },
//   {
//     id: "38",
//     teamName: "Mindtree",
//     approved: false,
//     submission: "Late",
//     leaderName: "Kunal Joshi",
//   },
//   {
//     id: "39",
//     teamName: "Tata Consultancy Services",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Nidhi Agarwal",
//   },
//   {
//     id: "40",
//     teamName: "Larsen & Toubro",
//     approved: false,
//     submission: "Late",
//     leaderName: "Sunil Sharma",
//   },
//   {
//     id: "41",
//     teamName: "Cognizant",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Tanvi Kapoor",
//   },
//   {
//     id: "42",
//     teamName: "Hewlett Packard Enterprise",
//     approved: false,
//     submission: "Late",
//     leaderName: "Pankaj Singh",
//   },
//   {
//     id: "43",
//     teamName: "Zensar Technologies",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Vikram Patel",
//   },
//   {
//     id: "44",
//     teamName: "Accenture",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Neha Gupta",
//   },
//   {
//     id: "45",
//     teamName: "Capgemini",
//     approved: false,
//     submission: "Late",
//     leaderName: "Kiran Kumar",
//   },
//   {
//     id: "46",
//     teamName: "Siemens India",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Nisha Verma",
//   },
//   {
//     id: "47",
//     teamName: "Tech Mahindra",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Aditya Mehta",
//   },
//   {
//     id: "48",
//     teamName: "Wipro",
//     approved: false,
//     submission: "Late",
//     leaderName: "Kavita Shah",
//   },
//   {
//     id: "49",
//     teamName: "HCL Technologies",
//     approved: true,
//     submission: "On Time",
//     leaderName: "Ankur Agarwal",
//   },
//   {
//     id: "50",
//     teamName: "Infosys",
//     approved: false,
//     submission: "Late",
//     leaderName: "Shilpa Patel",
//   },
// ];

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
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [sortColumn, setSortColumn] = useState("id");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    const filtered = initialData.filter(
      (row) =>
        row.teamName.toLowerCase().includes(term.toLowerCase()) ||
        row.submission.toLowerCase().includes(term.toLowerCase()) ||
        row.leaderName.toLowerCase().includes(term.toLowerCase())
    );
    setData(filtered);
  }, []);

  const handleSort = useCallback(
    (column) => {
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDirection);
      setSortColumn(column);
      const sorted = [...data].sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return newDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return newDirection === "asc" ? valueA - valueB : valueB - valueA;
        }
      });
      setData(sorted);
    },
    [data, sortDirection]
  );

  const handleSelectAll = useCallback(
    (event) => {
      if (event.target.checked) {
        setSelectedRows(data.map((row) => row.id));
      } else {
        setSelectedRows([]);
      }
    },
    [data]
  );

  const handleSelectRow = useCallback((id) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      }
      return [...prev, id];
    });
  }, []);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  const handlePopupOpen = (row) => {
    setSelectedRowDetails(row);
    setPopupOpen(true);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          mb: 2,
          gap: 2,
        }}
      >
        <TextField
          placeholder="Search teams..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ minWidth: { xs: 200, md: 300 } }}
        />
        {/* <FilterButtonExample/> */}
        <FilterDropdown />
      </Box>
      <TableContainer
        sx={{
          maxHeight: "98%",
          overflow: "auto",
          scrollbarWidth: "thin",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                // backgroundColor: "#1e2939",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                  onClick={() => handleSort("id")}
                >
                  ID
                  {sortColumn === "id" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    ))}
                  {sortColumn !== "id" && <ArrowUpward fontSize="small" />}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                  onClick={() => handleSort("teamName")}
                >
                  Team Name
                  {sortColumn === "teamName" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    ))}
                  {sortColumn !== "teamName" && (
                    <ArrowUpward fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "1rem" }}>
                Approved
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "1rem" }}>
                Submission
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "1rem" }}>
                Leader Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  paddingRight: "2rem",
                  textAlign: "center",
                }}
              >
                More Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.teamName}</TableCell>
                <TableCell
                  sx={{
                    color: row.approved ? "success.main" : "error.main",
                    fontWeight: 500,
                    fontSize: "1rem",
                    paddingLeft: 5,
                  }}
                >
                  {row.approved ? <CheckIcon /> : <ClearIcon />}
                </TableCell>
                <TableCell>{row.submission}</TableCell>
                <TableCell>{row.leaderName}</TableCell>
                <TableCell padding="checkbox" sx={{ textAlign: "center" }}>
                  <RemoveRedEyeIcon
                    sx={{ cursor: "pointer", color: "#00579c" }}
                    onClick={() => handlePopupOpen(row)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Popup
        dialogProps={{
          open: popupOpen,
        }}
      >
        <IconButton
          onClick={() => setPopupOpen(false)}
          sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
        {/* {selectedRowDetails && (
          <Box>
            <Typography variant="h6">Team Details</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                ID: {selectedRowDetails.teamMembers[0].name}
              </Typography>
              <Typography variant="body1">
                Team Name: {selectedRowDetails.teamName}
              </Typography>
              <Typography variant="body1">
                Submission: {selectedRowDetails.submission}
              </Typography>
              <Typography variant="body1">
                Leader Name: {selectedRowDetails.leaderName}
              </Typography>
            </Box>
          </Box>
        )} */}
        <TeamDetailsPage teamData={selectedRowDetails} />
      </Popup>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
      </Menu>
    </Paper>
  );
}
