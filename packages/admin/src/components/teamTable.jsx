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

const initialData = [
  { id: "1", status: "Success", email: "ken99@yahoo.com", amount: 316.0 },
  { id: "2", status: "Success", email: "abe45@gmail.com", amount: 242.0 },
  {
    id: "3",
    status: "Processing",
    email: "monserrat44@gmail.com",
    amount: 837.0,
  },
  { id: "4", status: "Success", email: "silas22@gmail.com", amount: 874.0 },
  { id: "5", status: "Failed", email: "carmella@hotmail.com", amount: 721.0 },
];

export default function DataTable() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    const filtered = initialData.filter(
      (row) =>
        row.email.toLowerCase().includes(term.toLowerCase()) ||
        row.status.toLowerCase().includes(term.toLowerCase())
    );
    setData(filtered);
  }, []);

  const handleSort = useCallback(() => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    const sorted = [...data].sort((a, b) => {
      if (newDirection === "asc") {
        return a.email.localeCompare(b.email);
      }
      return b.email.localeCompare(a.email);
    });
    setData(sorted);
  }, [data, sortDirection]);

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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 2, gap: 2 }}
      >
        <TextField
          placeholder="Filter emails..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ minWidth: 300 }}
        />
        <Button variant="outlined" sx={{ minWidth: 120 }}>
          Columns
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedRows.length === data.length}
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < data.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleSort}
                >
                  Email
                  {sortDirection === "asc" ? (
                    <ArrowUpward fontSize="small" />
                  ) : (
                    <ArrowDownward fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell padding="checkbox" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      color:
                        row.status === "Success"
                          ? "success.main"
                          : row.status === "Failed"
                          ? "error.main"
                          : "warning.main",
                    }}
                  >
                    {row.status}
                  </Box>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">${row.amount.toFixed(2)}</TableCell>
                <TableCell padding="checkbox">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, row.id)}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
