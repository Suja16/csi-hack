import { FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Menu,
  Typography,
  Badge
} from "@mui/material";
import { useState } from "react";

const initialFilters = {
  approved: null,
  submitted: null,
};

export default function NewFilterDropdown({ filters, setFilters }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const filterOptions = {
    approved: [
      { id: "approved_yes", label: "Yes", value: true },
      { id: "approved_no", label: "No", value: false },
    ],
    submitted: [
      { id: "submitted_yes", label: "Yes", value: true },
      { id: "submitted_no", label: "No", value: false },
    ],
  };

  // Open the dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle checkbox change
  const handleFilterChange = (category, value) => {
    // Toggle the filter value
    const updatedFilters = { ...filters, [category]: filters[category] === value ? null : value };
    setFilters(updatedFilters);
  };

  // Reset all filters
  const clearFilters = () => {
    const resetFilters = { approved: null, submitted: null };
    setFilters(resetFilters);
  };

  // Calculate the number of applied filters
  const appliedFiltersCount = Object.values(filters).filter((value) => value !== null).length;

  return (
    <Box>
      <Badge badgeContent={appliedFiltersCount} color="primary">
        <Button
          variant="outlined"
          onClick={handleClick}
          startIcon={<FilterList />}
          sx={{
            minWidth: 120,
            color: "#1e2939",
            borderColor: "#1e2939",
            "&:hover": { backgroundColor: "rgba(30, 41, 57, 0.1)" },
          }}
        >
          Filters
        </Button>
      </Badge>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 340,
            maxHeight: 500,
            mt: 1,
            borderRadius: 2,
            boxShadow: 4,
            p: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Filters
          </Typography>
          <Button
            size="small"
            onClick={clearFilters}
            sx={{
              color: "primary.main",
              fontSize: "0.8rem",
              textTransform: "none",
            }}
          >
            Clear all
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {Object.entries(filterOptions).map(([category, options]) => (
          <Box key={category} sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ textTransform: "uppercase", color: "text.secondary", mb: 1 }}
            >
              {category}
            </Typography>
            <FormControl>
              {options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  control={
                    <Checkbox
                      checked={filters[category] === option.value}
                      onChange={() => handleFilterChange(category, option.value)}
                      sx={{ color: "primary.main" }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormControl>
          </Box>
        ))}
      </Menu>
    </Box>
  );
}