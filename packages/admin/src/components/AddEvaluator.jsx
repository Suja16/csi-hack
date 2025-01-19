import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography, Grid2, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { ADD_EVALUATOR } from "../queries";
import Popup from "../../../ui/popup";
import TextField from "../../../ui/TextBox";
import addEvaluatorSchema from "../utils/addEvaluatorSchema";
import { useEffect } from "react";
import { useState } from "react";

export default function AddEvaluator({ open, setOpen }) {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addEvaluatorSchema),
  });

  const [addEvaluator, { loading, error }] = useMutation(ADD_EVALUATOR);

  const onSubmit = async (data) => {
    console.log(data);
    await addEvaluator({
      variables: {
        name: data.name,
        email: data.email,
        phone_no: data.phone_number,
        password: data.password,
        roles: "evaluator",
      },
    });
    setMessage("Evaluator added successfully");
    setShowSnackBar(true);
    setTimeout(() => {
      setShowSnackBar(false);
      setOpen(false);
      reset();
    }, 3000);
  };

  useEffect(() => {
    if (error) {
      setMessage(error.message);
      setShowSnackBar(true);
    }
  }, [error]);

  return (
    <Popup
      dialogProps={{ open, onClose: () => setOpen(false), maxWidth: "md" }}
    >
      <Box display="flex" justifyContent="space-between" padding={2}>
        <Typography variant="h5">Add Evaluator</Typography>
        <Button>
          <Close onClick={() => setOpen(false)} />
        </Button>
      </Box>
      <Grid2
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        container
        columns={{ xs: 1, sm: 2 }}
        spacing={2}
        padding={{ xs: 0, sm: 4 }}
        marginTop={{ xs: 2, sm: 0 }}
      >
        <Grid2 item size={1}>
          <TextField
            name="name"
            label="Name"
            register={register}
            error={errors.name}
            helperText={errors.name?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextField
            name="email"
            label="Email"
            register={register}
            error={errors.email}
            helperText={errors.email?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextField
            name="phone_number"
            label="Phone"
            register={register}
            error={errors.phone_number}
            helperText={errors.phone_number?.message}
          />
        </Grid2>
        <Grid2 item size={1}>
          <TextField
            name="password"
            label="Password"
            register={register}
            error={errors.password}
            helperText={errors.password?.message}
          />
        </Grid2>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          loading={loading}
        >
          Add Evaluator
        </Button>
      </Grid2>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={2000}
        onClose={() => setShowSnackBar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={message}
      />
    </Popup>
  );
}
