import React from 'react';
import { Box, Typography, Modal, Fade, Backdrop, TextField, Button, FormControl } from '@mui/material';

const ModalForm = ({open, setOpen}) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    width: '80%',
    height: '80%',
    maxWidth: '800px',
    bgcolor: 'white',
    boxShadow: 24,
    outline: 'none',
    overflow: 'auto',
    borderRadius: '24px',
    p: 4,
  };

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    mt: 2,
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: '#FF0000',
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}
            >
              REGISTRATION FORM
            </Typography>
            <Button
              onClick={() => setOpen(false)}
              sx={{
                minWidth: '40px',
                p: 0,
                '&:hover': { bgcolor: 'transparent' }
              }}
            >
              ✕
            </Button>
          </Box>

          <Box component="form" sx={formStyle}>
            <TextField
              fullWidth
              label="FULL NAME"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
            />
            <TextField
              fullWidth
              label="PHONE NO."
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
            />
            <TextField
              fullWidth
              label="EMAIL-ID"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
              type="email"
            />
            <TextField
              fullWidth
              label="GITHUB"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
            />
            <TextField
              fullWidth
              label="LINKEDIN"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
            />
            <TextField
              fullWidth
              label="LINKEDIN"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
            />
            <TextField
              fullWidth
              label="COLLEGE NAME"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
            </TextField>
            <TextField
              fullWidth
              label="DEGREE"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
            </TextField>
            <TextField
              fullWidth
              label="BRANCH"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
            />
            <TextField
              fullWidth
              label="YEAR"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
            />
            <TextField
              fullWidth
              label="TECH STACK"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",

                }
              }}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              label="WHY DID YOU REGISTER FOR THIS HACKATHON?"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                }
              }}
              multiline
              rows={4}
              sx={{ gridColumn: 'span 2' }}
            />
            <Button
              variant="contained"
              sx={{
                gridColumn: 'span 2',
                mt: 2,
                bgcolor: '#3f51b5',
                py: 1.5,
                borderRadius: '24px',
                '&:hover': {
                  bgcolor: '#2c387e'
                }
              }}
            >
              REGISTER
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalForm;
