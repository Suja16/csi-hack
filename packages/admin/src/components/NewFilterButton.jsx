import { FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Menu,
  Typography,
  Badge,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

export default function NewFilterDropdown({ filters, setFilters }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const filterOptions = {
    approved: [
      { id: "approved_yes", label: "Approved", value: true },
      { id: "approved_no", label: "Not Approved", value: false },
    ],
    submitted: [
      { id: "submitted_yes", label: "Submitted", value: true },
      { id: "submitted_no", label: "Not Submitted", value: false },
    ],
    domain: [
      { id: "fintech", label: "FINTECH", value: "FINTECH" },
      { id: "cybersecurity", label: "CYBERSECURITY", value: "CYBERSECURITY" },
      { id: "genai", label: "GENAI", value: "GENAI" },
    ],
    pwd: [{ id: "pwd_team", label: "PWD Team", value: true }],
    all_women: [
      {
        id: "all_women_team",
        label: "All Women Team",
        value: "all_women_team",
      },
    ],
    team_completion: [
      { id: "completed_yes", label: "Complete", value: true },
      { id: "completed_no", label: "Incomplete", value: false },
    ],
    submission_validity: [
      { id: "valid", label: "Valid Submission", value: true },
      { id: "invalid", label: "Invalid Submission", value: false },
      { id: "pending", label: "Pending Check", value: null },
    ],
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (category, value) => {
    const updatedFilters = { ...filters };
    if (updatedFilters[category]?.includes(value)) {
      updatedFilters[category] = updatedFilters[category].filter(
        (item) => item !== value,
      );
    } else {
      updatedFilters[category] = [...(updatedFilters[category] || []), value];
    }
    setFilters(updatedFilters);
  };

  const clearFilters = () => {
    const resetFilters = Object.keys(filterOptions).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    setFilters(resetFilters);
  };

  const appliedFiltersCount = Object.values(filters).flat().length;

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
          aria-label="Open filters"
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
        aria-labelledby="filter-menu"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" id="filter-menu">
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
              sx={{
                textTransform: "uppercase",
                color: "text.secondary",
                mb: 1,
              }}
            >
              {category.replace(/_/g, " ")}
            </Typography>
            <FormControl>
              {options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  control={
                    <Checkbox
                      checked={
                        filters[category]?.includes(option.value) || false
                      }
                      onChange={() =>
                        handleFilterChange(category, option.value)
                      }
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
