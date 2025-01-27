import { useContext, useState } from "react";
import UserDataContext from "../../contexts/userDataContext";
import {
  Box,
  Typography,
  Grid2,
  Button,
  Tooltip,
  useTheme,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextBox from "../../../../ui/TextBox";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Delete from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { uploadFile } from "../../utils/uploadFile";
import axios from "axios";
import { useNavigate } from "react-router";
import { success } from "../../utils/snackbar";

const formSchema = yup.object({
  domain: yup
    .string()
    .is(["FINTECH", "CYBERSECURITY", "GENAI"], "Invalid Domain.")
    .required("Domain is required"),

  video: yup.string().required("Video URL is required"),

  ppt: yup
    .mixed()
    .required("PPT is required")
    .test("minimumFiles", "PPT is required", (value) => {
      return value && value.length > 0 && value[0];
    })
    .test("fileType", "Only PDF files are allowed", (value) => {
      return (
        value && value.length > 0 && value[0] && value[0].name.endsWith(".pdf")
      );
    })
    .test("fileSize", "File size must be less than 5MB", (value) => {
      return (
        value &&
        value.length > 0 &&
        value[0] &&
        value[0].size <= 5 * 1024 * 1024
      );
    }),
  consent: yup
    .mixed()
    .required("Consent letter is required")
    .test("minimumFiles", "Consent letter is required", (value) => {
      return value && value.length > 0 && value[0];
    })
    .test("fileType", "Only PDF files are allowed", (value) => {
      return (
        value &&
        value.length > 0 &&
        value[0] &&
        value[0].type === "application/pdf"
      );
    })
    .test("fileSize", "File size must be less than 5MB", (value) => {
      return (
        value &&
        value.length > 0 &&
        value[0] &&
        value[0].size <= 5 * 1024 * 1024
      );
    }),
  acceptance: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Acceptance is required"),
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const TeamDetails = ({ setShowSnackBar, setSnackBarMessage }) => {
  const navigate = useNavigate();
  const { userData, eventData } = useContext(UserDataContext);
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
    control,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues: {
      acceptance: false,
      video: "",
      ppt: null,
      consent: null,
      domain: "FINTECH",
    },
  });

  useEffect(() => {
    if (eventData.Participant.team.submissions) {
      setSubmitted(true);
    }
  }, [errors, eventData.Participant.team.submissions]);

  const ppt = watch("ppt");
  const consent = watch("consent");

  const onSubmit = async () => {
    setIsSubmitting(true);
    const data = getValues();
    console.log(data);

    const pptUrlPromise = uploadFile(ppt[0]);
    const consentUrlPromise = uploadFile(consent[0]);

    const [pptUrl, consentUrl] = await Promise.all([
      pptUrlPromise,
      consentUrlPromise,
    ]);

    console.log("PPT URL:", pptUrl);
    console.log("Consent URL:", consentUrl);

    const submissions = {
      video: data.video,
      ppt: pptUrl,
      consent: consentUrl,
      acceptance: data.acceptance,
      domain: data.domain,
    };
    try {
      const response = await axios.post(
        "/api/v1/event/p/team-submission",
        { team_id: eventData.Participant.team.id, submissions },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
        },
      );
      if (response.status === 200 && response.data.error == false) {
        setIsSubmitting(false);
        setSubmitted(true);
        success("Submission successful!");
      } else if (response.data.error == true) {
        setIsSubmitting(false);
        window.alert(response.data.message);
        setSubmitted(false);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const leaveTeam = async () => {
    try {
      const response = await axios.post(
        "/api/v1/event/p/remove-from-team",
        { team_id: eventData.Participant.team.id, user_id: userData.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
        },
      );
      console.log(response.data);
      setSnackBarMessage("Left team successfully");
      setShowSnackBar(true);
      setTimeout(() => navigate("/"), 5000);
      setTimeout(() => setShowSnackBar(false), 5000);
    } catch (error) {
      console.error(error);
      if (error.response?.data.error) {
        setSnackBarMessage(error.response.data.message);
        setShowSnackBar(true);
        setTimeout(() => setShowSnackBar(false), 5000);
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid2 container justifyContent="center">
      <Grid2
        item
        size={{ xs: 12, md: 6 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h5">Team Members</Typography>
        <Box>
          {eventData.Participant.team.Participant.map((member) => (
            <Typography
              key={member.user.id}
              bgcolor={theme.palette.background.main}
              padding="1rem"
              borderRadius="10px"
              marginY="0.5rem"
              display="flex"
              gap={2}
              justifyContent="space-between"
              alignItems="center"
            >
              {member.user.name}
              {eventData.Participant.team.leader_id === member.user.id && (
                <Typography
                  bgcolor={theme.palette.secondary.main}
                  padding="0.5rem"
                  borderRadius="10px"
                  color="white"
                >
                  Leader
                </Typography>
              )}
            </Typography>
          ))}
        </Box>
      </Grid2>
      <Grid2
        item
        size={{ xs: 12, md: 6 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h5">Team Code</Typography>
        <Button
          variant="outlined"
          sx={{
            paddingX: "3.5rem",
            paddingY: "1rem",
            marginTop: "0.5rem",
            textTransform: "none",
          }}
          onClick={() =>
            navigator.clipboard.writeText(
              eventData.Participant.team.invite_code,
            )
          }
        >
          {eventData.Participant.team.invite_code}
        </Button>
        {!submitted &&
        userData.id === eventData.Participant.team.leader_id &&
        eventData.Participant.team.Participant.length == 4 ? (
          <>
            <Button
              variant="contained"
              onClick={handleClickOpen}
              sx={{ padding: "1rem", marginTop: "3rem" }}
            >
              Upload <br /> Attachments
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle variant="subtitle1" sx={{ margin: 2 }}>
                Upload Your Attachment
              </DialogTitle>
              <DialogContent>
                <Grid2
                  container
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  justifyContent="center"
                  sx={{ padding: "3" }}
                >
                  <Grid2 item size={10}>
                    <FormControl sx={{ mb: 2 }}>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Domain
                      </FormLabel>
                      <Controller
                        name="domain"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            {...field}
                          >
                            <FormControlLabel
                              value="FINTECH"
                              control={<Radio />}
                              label="FinTech"
                            />
                            <FormControlLabel
                              value="CYBERSECURITY"
                              control={<Radio />}
                              label="Cybersecurity"
                            />
                            <FormControlLabel
                              value="GENAI"
                              control={<Radio />}
                              label="GenAI"
                            />
                          </RadioGroup>
                        )}
                      />
                    </FormControl>
                    <TextBox
                      name="video"
                      label="VIDEO URL"
                      register={register}
                      placeholder={"Enter Video URL"}
                      helperText={errors?.video?.message}
                      error={!!errors?.video?.message}
                      width="50%"
                      sx={{ mb: 2 }}
                    />
                  </Grid2>
                  <Grid2 item size={5}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="text"
                      tabIndex={-1}
                      startIcon={
                        ppt && ppt[0] ? (
                          <Tooltip title="Delete File">
                            <Delete />
                          </Tooltip>
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                      sx={{ padding: "1rem" }}
                    >
                      {ppt && ppt[0] ? "" : "Upload PPT"}
                      <VisuallyHiddenInput
                        name="ppt"
                        type="file"
                        accept="application/pdf"
                        {...register("ppt")}
                      />
                    </Button>
                    {ppt && ppt[0] && (
                      <>
                        <Typography variant="caption">{ppt[0].name}</Typography>
                      </>
                    )}
                  </Grid2>
                  <Grid2 item size={5}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="text"
                      tabIndex={-1}
                      startIcon={
                        consent && consent[0] ? (
                          <Tooltip title="Delete File">
                            <Delete />
                          </Tooltip>
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                      sx={{ padding: "1rem" }}
                    >
                      {consent && consent[0] ? "" : "Upload Consent Form"}
                      <VisuallyHiddenInput
                        name="consent"
                        type="file"
                        accept="application/pdf"
                        {...register("consent")}
                      />
                    </Button>
                    {consent && consent[0] && (
                      <>
                        <Typography variant="caption">
                          {consent[0].name}
                        </Typography>
                      </>
                    )}
                  </Grid2>
                  <Grid2 item size={5}>
                    <Typography variant="caption" color="error">
                      {errors?.ppt?.message}
                    </Typography>
                  </Grid2>
                  <Grid2 item size={5}>
                    <Typography variant="caption" color="error">
                      {errors?.consent?.message}
                    </Typography>
                  </Grid2>
                  <Grid2 item size={10} margin="1rem">
                    <FormControlLabel
                      control={
                        <Controller
                          name="acceptance"
                          control={control}
                          render={({ field: props }) => (
                            <Checkbox
                              {...props}
                              checked={props.value}
                              onChange={(e) => props.onChange(e.target.checked)}
                            />
                          )}
                        />
                      }
                      label="I confirm that the intellectual property rights of the project submitted belong to the Union Bank of India and/or the organizing committee as per the event's terms and conditions."
                    />
                    <Typography variant="caption" color="error">
                      {errors?.acceptance?.message}
                    </Typography>
                  </Grid2>
                  <Grid2 item size={10}>
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      sx={{
                        padding: "1rem",
                        marginTop: "1rem",
                        marginX: "auto",
                      }}
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Submit
                    </LoadingButton>
                  </Grid2>
                  <Typography variant="caption" color="error" marginTop="3rem">
                    *Only team leader is required to submit attachments
                  </Typography>
                </Grid2>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <Grid2
            item
            size={10}
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop="3rem"
          >
            <Typography variant="h6" textAlign="center">
              {submitted
                ? "Your submission has been recorded."
                : eventData.Participant.team.Participant.length != 4
                  ? "4 Members are required in a team."
                  : "Your team leader has not submitted the project yet."}
            </Typography>
          </Grid2>
        )}
      </Grid2>
    </Grid2>
  );
};

export default TeamDetails;
