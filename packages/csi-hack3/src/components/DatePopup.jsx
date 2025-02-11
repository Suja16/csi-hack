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
                    <Typography variant="h6"> <b>Results Announced!</b></Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>The wait is over! <b>The results for the hackathon have been announced.</b> Team leaders check your inbox now to see if your team made it to the top!</Typography>
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
