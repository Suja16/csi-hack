import { Dialog, DialogContent } from "@mui/material";

export default function Popup({ children, dialogProps }) {
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      scroll="body"
      {...dialogProps}
      disableRestoreFocus
      onClose={(e, reason) => {
        if (dialogProps.onClose) {
          if (reason && reason === "backdropClick") {
            return;
          }

          dialogProps.onClose(e, reason);
        }
      }}
    >
      <DialogContent dividers sx={{ p: 0 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
