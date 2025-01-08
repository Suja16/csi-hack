import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DragDrop from "../drag_drop";

const ModalForm = ({ open, setOpen, methods }) => {
  const navigate = useNavigate();
  const modalStyle = {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    left: "50%",
    width: "80%",
    height: "80%",
    maxWidth: "800px",
    bgcolor: "white",
    boxShadow: 24,
    outline: "none",
    overflow: "auto",
    borderRadius: "24px",
    p: 4,
  };

  const formStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    mt: 2,
  };

  const { control, handleSubmit, formState: { errors }, watch, setValue } = methods;
  const teamChoice = watch("team_choice")

  const [clickCount, setClickCount] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  console.log(errors)

  const onSubmit = async () => {
    const data = methods.getValues();
    console.log(data);

    const userData = {
      degree: data.degree,
      branch: data.branch,
      gender: data.gender,
      phone_number: data.phone_number,
      year: data.year,
      college: data.college,
    };

    const more_details = {
      linkedin: data.linkedin,
      github: data.github,
      category: data.category,
      tech_stack: data.tech_stack,
      why_this_hackathon: data.why_this_hackathon,
    };

    // update user details
    try {
      await axios.post("/api/v1/user/p/update", userData, {
        baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    } catch (e) {
      console.error(e);
      return;
    }

    // upload image
    // try {
    //   const fileResponse = await axios.postForm(
    //     import.meta.env.VITE_FILE_WORKER_ADDRESS,
    //     {
    //       file: data.resume[0],
    //     },
    //   );
    //   console.log(fileResponse);
    //   more_details["resume"] = fileResponse.data.url;
    // } catch (e) {
    //   console.error(e);
    //   setCurrentStep("TeamDetails");
    //   return;
    // }

    if (data.team_choice === "create") {
      // create team
      try {
        const teamResponse = await axios.post(
          "/api/v1/event/p/create-team",
          {
            event_id: import.meta.env.VITE_EVENT_ID,
            team_name: data.team_name,
            more_details,
          },
          {
            baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );
        const inviteCode = teamResponse.data.team.invite_code;
        localStorage.setItem("inviteCode", inviteCode);
        localStorage.setItem("teamName", data.team_name);
        console.log(teamResponse);
        alert("Your team code is - " + inviteCode)
        localStorage.setItem("status", "true")
        setSnackbarMessage("Registration Successful");


        navigate("/header");
        setShowSnackbar(true);

        setTimeout(() => { setShowSnackbar(false); setOpen(false) }, 3000);


      } catch (e) {
        console.error(e);
        if (e.response && e.response.data && e.response.data.message) {
          setSnackbarMessage(e.response.data.message);
          setShowSnackbar(true);


          setTimeout(() => setShowSnackbar(false), 3000);
          return;
        }
        return;
      }
    } else {
      // join team
      try {
        await axios.post(
          "/api/v1/event/p/join-team",
          {
            event_id: import.meta.env.VITE_EVENT_ID,
            invite_code: data.invite_code,
            more_details,
          },
          {
            baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );
        localStorage.setItem("status" , "true")
        setSnackbarMessage("Registration Successful");

        navigate("/header");

        setShowSnackbar(true);

        setTimeout(() => { setShowSnackbar(false); setOpen(false) }, 3000);
      } catch (e) {
        console.error(e);
        if (e.response && e.response.data && e.response.data.message) {
          setSnackbarMessage(e.response.data.message);
          setShowSnackbar(true);

          setTimeout(() => setShowSnackbar(false), 3000);
          return;
        }
        return;
      }
    }
  };

  const handleClose = () => {
    if (clickCount === 0) {
      setClickCount(1);
      setTimeout(() => setClickCount(0), 2000); // Reset click count after 2 seconds
    } else {
      methods.reset({});
      setOpen(false);
    }
  };


  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: "#FF0000",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              REGISTRATION FORM
            </Typography>
            <Button
              onClick={handleClose}
              sx={{
                minWidth: "40px",
                p: 0,
                "&:hover": { bgcolor: "transparent" },
              }}
            >
              ✕
            </Button>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formStyle}>
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="PHONE NO."
                  variant="outlined"
                  error={!!errors.phone_number}
                  helperText={errors.phone_number?.message}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="GENDER"
                  variant="outlined"
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </TextField>
              )}
            />
            <Controller
              name="degree"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="DEGREE"
                  variant="outlined"
                  error={!!errors.degree}
                  helperText={errors.degree?.message}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="college"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="COLLEGE"
                  variant="outlined"
                  error={!!errors.college}
                  helperText={errors.college?.message}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="branch"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="BRANCH"
                  variant="outlined"
                  error={!!errors.branch}
                  helperText={errors.branch?.message}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="YEAR OF GRADUATION"
                  variant="outlined"
                  error={!!errors.year}
                  helperText={errors.year?.message}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="linkedin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="LINKEDIN"
                  variant="outlined"
                  error={!!errors.linkedin}
                  helperText={errors.linkedin?.message}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="github"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="GITHUB"
                  variant="outlined"
                  error={!!errors.github}
                  helperText={errors.github?.message}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="tech_stack"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="TECH STACK"
                  variant="outlined"
                  error={!!errors.tech_stack}
                  helperText={errors.tech_stack?.message}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                  multiline
                  rows={3}
                />
              )}
            />
            <Controller
              name="why_this_hackathon"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="WHY THIS HACKATHON?"
                  variant="outlined"
                  error={!!errors.why_this_hackathon}
                  helperText={errors.why_this_hackathon?.message}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                  multiline
                  rows={3}
                />
              )}
            />
            <Box sx={{ gridColumn: "span 2" }}>
            <DragDrop setValue={setValue}/>
            <Typography variant="caption" sx={{ color: "#D20000" }}>
              {errors.resume?.message}
            </Typography>
            </Box>

            <Box sx={{ gridColumn: "span 2", display: "flex", justifyContent: "start", gap: "10px" , width:"100%"}}>
              <Button
                variant={teamChoice==="create" ? "contained" : "outlined"}
                color="secondary"
                onClick={() => setValue("team_choice", "create")}
                sx={{
                  gridColumn: "span 2",
                  mt: 2,
                  py: 1.5,
                  width: "140px",
                  borderRadius: "24px",
                }}
              >
                Create Team
              </Button>
              <Button
                variant={teamChoice==="join" ? "contained" : "outlined"}
                color="secondary"
                onClick={() => setValue("team_choice", "join")}
                sx={{
                  gridColumn: "span 2",
                  mt: 2,
                  py: 1.5,
                  width: "140px",
                  borderRadius: "24px",
                }}
              >
                Join Team
              </Button>
            </Box>
            {teamChoice === "create" && (
              <Controller
                name="team_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="TEAM NAME"
                    variant="outlined"
                    error={!!errors.team_name}
                    helperText={errors.team_name?.message}
                    InputProps={{
                      style: {
                        borderRadius: "20px",
                      },
                    }}
                  />
                )}
              />
            )}
            {teamChoice === "join" && (
              <Controller
                name="invite_code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="INVITE CODE"
                    variant="outlined"
                    error={!!errors.invite_code}
                    helperText={errors.invite_code?.message}
                    InputProps={{
                      style: {
                        borderRadius: "20px",
                      },
                    }}
                  />
                )}
              />
            )}
            {teamChoice && (
            <Box sx={{ gridColumn: "span 2", display: "flex", justifyContent: "end", gap: "10px" , width:"100%"}}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  gridColumn: "span 2",
                  mt: 2,
                  py: 1.5,
                  borderRadius: "24px",
                }}
              >
                Submit
              </Button>
            </Box>
            )}
          </Box>
          {showSnackbar && (<Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            message={snackbarMessage}
          />)}
          {clickCount===1 && (<Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            message="Click twice to close"
          />)}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalForm;
