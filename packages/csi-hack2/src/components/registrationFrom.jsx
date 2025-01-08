import { IconButton, Typography } from "@mui/material";
import Popup from "../elements/popup";
import CloseIcon from "@mui/icons-material/Close";
export default function RegistrationForm({ open, onClose }) {
  return (
    <Popup
      dialogProps={{
        open: open,
        onClose: onClose,
      }}
    >
      <IconButton
        edge="end"
        color="inherit"
        onClick={onClose} // Close registration when clicked
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Register
      </Typography>
    </Popup>
  );
}
