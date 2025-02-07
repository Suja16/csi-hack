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
                    <Typography variant="h6"> <b>Important Update!</b></Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>The moment you&apos;ve been waiting for is almost here! <b>The results will be declared on or before 10th February!</b> Stay tuned and keep an eye on your inbox.
                    </Typography>
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
