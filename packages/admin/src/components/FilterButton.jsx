import { FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Menu,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { useState } from "react";

const initialFilters = {
  status: "active", // Default selected value
};

export default function FilterDropdown({ isApproved, setIsApproved }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [activeFiltersCount, setActiveFiltersCount] = useState(1); // Based on default values

  const filterOptions = {
    status: [
      { id: "active", label: "Approved" },
      { id: "pending", label: "Rejected" },
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

  // Handle radio button change
  const handleFilterChange = (category, value) => {
    // Update the specific category filter
    const updatedFilters = { ...filters, [category]: value };
    setFilters(updatedFilters);
  
    // Update active filter count
    const count = Object.values(updatedFilters).filter(Boolean).length;
    setActiveFiltersCount(count);
  
    // Update parent state if status filter is changed
    if (category === "status") {
      setIsApproved(value === "active"); // "active" for Approved, "pending" for Rejected
    }
  };
  

  // Reset all filters
  const clearFilters = () => {
    const resetFilters = { status: "" };
    setFilters(resetFilters);
    setActiveFiltersCount(0);
    setIsApproved(false); // Reset parent state
  };

  return (
    <Box>
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
        {/*{activeFiltersCount > 0 && (
          <Box
            sx={{
              ml: 1,
              px: 1,
              py: 0.5,
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              borderRadius: 1,
              fontSize: "0.75rem",
              display: "inline-block",
            }}
          >
            {activeFiltersCount}
          </Box>
        )} */}
      </Button>

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
          {/* {activeFiltersCount > 0 && (
            <Button
              size="small"
              onClick={clearFilters}
              startIcon={<Close fontSize="small" />}
              sx={{
                color: "primary.main",
                fontSize: "0.8rem",
                textTransform: "none",
              }}
            >
              Clear all
            </Button>
          )} */}
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
            <RadioGroup
  value={filters[category]} // This binds the selected value of the category
  onChange={(e) => handleFilterChange(category, e.target.value)} // Update on change
>
  {options.map((option) => (
    <FormControlLabel
      key={option.id}
      value={option.id} // Radio button value
      control={<Radio sx={{ color: "primary.main" }} />} // Styling
      label={option.label} // Displayed label
    />
  ))}
</RadioGroup>

            </FormControl>
          </Box>
        ))}
      </Menu>
    </Box>
  );
}
