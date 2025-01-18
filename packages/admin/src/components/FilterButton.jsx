import { Close, FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Menu,
  Typography
} from "@mui/material";
import { useState } from "react";

const initialFilters = {
  status: [
    { id: "active", label: "Approved", checked: true },
    { id: "pending", label: "Rejected", checked: false },
  ],
};

export default function FilterDropdown({ isApproved, setIsApproved }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (category, filterId) => {
    // Update the filter state properly
    const newFilters = {
      ...filters,
      [category]: filters[category].map((filter) =>
        filter.id === filterId
          ? { ...filter, checked: !filter.checked }
          : filter
      ),
    };

    setFilters(newFilters);

    // Update active filters count
    const count = Object.values(newFilters)
      .flat()
      .filter((filter) => filter.checked).length;

    setActiveFiltersCount(count);

    // If 'status' category filter is changed, update the parent component state
    if (category === "status") {
      const approved = newFilters.status.find((filter) => filter.id === "active").checked;
      setIsApproved(approved); // Update the parent state
    }
  };

  const clearFilters = () => {
    // Reset all filters to unchecked state
    const resetFilters = Object.entries(filters).reduce(
      (acc, [category, options]) => ({
        ...acc,
        [category]: options.map((option) => ({ ...option, checked: false })),
      }),
      {}
    );

    setFilters(resetFilters);
    setActiveFiltersCount(0);
    setIsApproved(false); // Reset isApproved state in parent
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<FilterList sx={{ color: "#1e2939" }} />}
        endIcon={
          activeFiltersCount > 0 && (
            <Box
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
              }}
            >
              {activeFiltersCount}
            </Box>
          )
        }
        sx={{ minWidth: 100, color: "#1e2939", borderColor: "#1e2939" }}
      >
        Filters
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 480,
            mt: 1,
            scrollbarWidth: "thin",
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Filters
            </Typography>
            {activeFiltersCount > 0 && (
              <Button
                size="small"
                onClick={clearFilters}
                startIcon={<Close fontSize="small" />}
              >
                Clear all
              </Button>
            )}
          </Box>
        </Box>

        {Object.entries(filters).map(([category, options], index) => (
          <Box key={category}>
            {index > 0 && <Divider />}
            <Box sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  textTransform: "uppercase",
                  color: "text.secondary",
                }}
              >
                {category}
              </Typography>
              <FormGroup>
                {options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    control={
                      <Checkbox
                        checked={option.checked}
                        onChange={() => handleFilterChange(category, option.id)}
                        size="small"
                      />
                    }
                    label={option.label}
                  />
                ))}
              </FormGroup>
            </Box>
          </Box>
        ))}
      </Menu>
    </Box>
  );
}
