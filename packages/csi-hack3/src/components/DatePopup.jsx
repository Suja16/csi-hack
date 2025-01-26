import React, { useEffect } from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Zoom } from '@mui/material';

const DatePopup = () => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Zoom}
                onClose={handleClose}
            >
                <DialogTitle style={{ textAlign: 'center' }}>
                    <Typography variant="h6"> <b>Deadline Extended!</b></Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>To ensure your team has ample time to finalize and submit your innovative ideas we have extended the deadline to <b>3rd February, 2025</b></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DatePopup;
