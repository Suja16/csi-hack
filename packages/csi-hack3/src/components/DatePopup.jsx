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
                    <Typography variant="h6"> <b>Hackathon Update!</b></Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>Mark your calendars! <b>The hackathon is happening on 17th-18th March.</b> Get ready to innovate, compete, and showcase your skills. Stay tuned for more details!</Typography>
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
