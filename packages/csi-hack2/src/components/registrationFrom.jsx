import { IconButton, Typography, Snackbar, Grid2, Button, Tooltip, styled } from "@mui/material";
import Popup from "../elements/popup";
import CloseIcon from "@mui/icons-material/Close";
import registrationSchema from "../utils/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import axios from "axios";
import TextBox from "./TextBox";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Delete from "@mui/icons-material/Delete";
import uploadFile from "../utils/uploadFile";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function RegistrationForm({ open, onClose, userData }) {
  const {
          formState: { errors },
          handleSubmit,
          register,
          setValue,
          getValues,
          watch,
          reset
      } = useForm({
          mode: "onChange",
          resolver: yupResolver(registrationSchema),
          defaultValues: {
            gender: "MALE", ...userData
          }
      })

  const teamChoice = watch("team_choice")
  const resume = watch("resume")
  const photo_id = watch("photo_id")

  useEffect(() => {
    console.log(errors);
    console.log(resume);
  }, [errors, resume])

  useEffect(() => {
    reset(userData);
  }, [userData]);

  const [clickCount, setClickCount] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClose = () => {
    if (clickCount === 0) {
      setClickCount(1);
      setTimeout(() => setClickCount(0), 2000); // Reset click count after 2 seconds
    } else {
      reset({});
      onClose();
    }
  };

  const onSubmit = async () => {
    const data = getValues();
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

    // upload resume
    const resumeURLPromise = await uploadFile(resume[0]);

    // upload photo id
    const photoIdURLPromise = await uploadFile(photo_id[0]);

    const [resumeURL, photoIdURL] = await Promise.all([resumeURLPromise, photoIdURLPromise]);

    more_details.resume = resumeURL;
    more_details.photo_id = photoIdURL;

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


        // navigate("/header");
        setShowSnackbar(true);

        setTimeout(() => { setShowSnackbar(false); onClose() }, 3000);


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

        // navigate("/header");

        setShowSnackbar(true);

        setTimeout(() => { setShowSnackbar(false); onClose() }, 3000);
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
        onClick={handleClose} // Close registration when clicked
        sx={{
          position: "absolute",
          top: 8,
          right: 25,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" align="center" marginTop="1.5rem">
        Register
      </Typography>
      <Grid2 component="form"  onSubmit={handleSubmit(onSubmit)} container columns={{xs:1, sm:2}} spacing={2} padding="2rem">
        <Grid2 item size={1}>
          <TextBox
            name="phone_number"
            label="PHONE NUMBER"
            register={register}
            placeholder={"Enter 10 digit phone number"}
            helperText={errors?.phone_number?.message}
            error={!!errors?.phone_number?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextBox
            name="gender"
            label="GENDER"
            register={register}
            placeholder={"MALE / FEMALE"}
            helperText={errors?.gender?.message}
            error={!!errors?.gender?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextBox
            name="degree"
            label="DEGREE"
            register={register}
            placeholder={"Enter your Degree"}
            helperText={errors?.degree?.message}
            error={!!errors?.degree?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextBox
            name="college"
            label="COLLEGE"
            register={register}
            placeholder={"Enter College Name"}
            helperText={errors?.college?.message}
            error={!!errors?.college?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextBox
            name="branch"
            label="BRANCH"
            register={register}
            placeholder={"Enter Your Branch"}
            helperText={errors?.branch?.message}
            error={!!errors?.branch?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextBox
            name="year"
            label="YEAR OF GRADUATION"
            register={register}
            placeholder={"Enter College Name"}
            helperText={errors?.year?.message}
            error={!!errors?.year?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextBox
            name="linkedin"
            label="LINKEDIN"
            register={register}
            placeholder={"Enter LinkedIn Profile URL"}
            helperText={errors?.linkedin?.message}
            error={!!errors?.linkedin?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextBox
            name="github"
            label="GITHUB"
            register={register}
            placeholder={"Enter Github Profile URL"}
            helperText={errors?.github?.message}
            error={!!errors?.github?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextBox
            name="tech_stack"
            label="TECH STACK"
            register={register}
            placeholder={"Enter Your Tech Stack"}
            helperText={errors?.tech_stack?.message}
            error={!!errors?.tech_stack?.message}
            multiline
            rows={3}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextBox
            name="why_this_hackathon"
            label="WHY THIS HACKATHON"
            register={register}
            placeholder={"Why do you want to participate in this hackathon?"}
            helperText={errors?.why_this_hackathon?.message}
            error={!!errors?.why_this_hackathon?.message}
            multiline
            rows={3}
          />
        </Grid2>
        <Grid2 item size={1}>
          <Button
            component="label"
            role={undefined}
            variant="text"
            tabIndex={-1}
            startIcon={resume && resume[0] ? <Tooltip title="Delete File"><Delete/></Tooltip>: <CloudUploadIcon />}
            sx={{ padding: "1rem" }}
          >
            {resume && resume[0] ? "" : "Upload Resume"}
            <VisuallyHiddenInput
              name="resume"
              type="file"
              accept="application/pdf"
              {...register("resume")}
            />
          </Button>
          {resume && resume[0] && (
            <>
              <Typography variant="caption">{resume[0].name}</Typography>
            </>
          )}
        </Grid2>
        <Grid2 item size={1} display="flex" gap="1rem" alignItems="center">
          <Button
            component="label"
            role={undefined}
            variant="text"
            startIcon={photo_id && photo_id[0] ? <Tooltip title="Delete File"><Delete/></Tooltip> : <CloudUploadIcon />}
            sx={{ padding: "1rem" }}
          >
            {photo_id && photo_id[0] ? "" : "Upload Photo ID"}
            <VisuallyHiddenInput
              type="file"
              name="photo_id"
              accept="image/*"
              {...register("photo_id")}
            />
          </Button>
          {photo_id && photo_id[0] && (
            <>
              <Typography variant="caption">{photo_id[0].name}</Typography>
            </>
          )}
        </Grid2>
        <Grid2 item size={1}>
          <Typography variant="caption" color="error">
            {errors?.resume?.message}
          </Typography>
        </Grid2>
        <Grid2 item size={1}>
          <Typography variant="caption" color="error">
            {errors?.photo_id?.message}
          </Typography>
        </Grid2>
        <Grid2 item size={1} display="flex" justifyContent="start" gap="3rem" marginTop="1rem">
          <Tooltip title="Team Leaders create a Team">
            <Button
              variant={teamChoice==="create" ? "contained" : "outlined"}
              color="secondary"
              onClick={() => setValue("team_choice", "create")}
              sx={{
                py: "1rem",
                px: "1rem",
                borderRadius: "5px",
              }}
            >
              Create A Team
            </Button>
          </Tooltip>
          <Tooltip title="Team Members join a Leader's Team">
            <Button
              variant={teamChoice==="join" ? "contained" : "outlined"}
              color="secondary"
              onClick={() => setValue("team_choice", "join")}
              sx={{
                py: "1rem",
                px: "1rem",
                borderRadius: "5px",
              }}
            >
              Join A Team
            </Button>
          </Tooltip>
        </Grid2>
        {!teamChoice && (
          <Grid2 item size={1} marginTop="1rem" display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="caption" color="error">
              * Team Leaders will &apos;Create A Team&apos;
            </Typography>
            <Typography variant="caption" color="error">
              * Team Members will &apos;Join A Team&apos; using Invite Code
            </Typography>
          </Grid2>
        )}
        {teamChoice === "create" && (
          <Grid2 item size={1} marginTop="1rem">
            <TextBox
              name="team_name"
              label="TEAM NAME"
              register={register}
              placeholder={"Enter your team name"}
              helperText={errors?.team_name?.message}
              error={!!errors?.team_name?.message}
            />
          </Grid2>
        )}
        {teamChoice === "join" && (
          <Grid2 item size={1} marginTop="1rem">
            <TextBox
              name="invite_code"
              label="INVITE CODE"
              register={register}
              placeholder={"Enter invite code"}
              helperText={errors?.invite_code?.message}
              error={!!errors?.invite_code?.message}
            />
          </Grid2>
        )}
        <Grid2 item size={2} display="flex" justifyContent="end" marginTop="1rem">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!teamChoice}
            sx={{
              py: "1rem",
              px: "2rem",
              borderRadius: "99px",
            }}
          >
            Register
          </Button>
        </Grid2>
      </Grid2>
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
    </Popup>
  );
}
