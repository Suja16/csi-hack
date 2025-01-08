import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registrationSchema from "./validation";
import ModalForm from "./ModalForm";
import Logo from "../../assets/CroppedfinalLogo.png";
import UnionBankLogo from "../../assets/unionBankLogo.jpeg";
import { useNavigate } from "react-router-dom";

function Component1_whitecard(props) {
  const [formOpen, setFormOpen] = useState(false);
  const methods = useForm({
    resolver: yupResolver(registrationSchema),
    mode: "onTouched",
    defaultValues: {
      gender: "MALE"
    }
  });
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const response = await axios.post(
        "/api/v1/auth/googleToken",
        { code },
        { baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS }
      );
      console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", response.data.user);
      const participantResponse = await axios.post(
        `https://api.csi-kjsce.org/api/v1/event/p/get/47`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (participantResponse.data.event.Participant) {
        navigate("/header");
      }
      const user = response.data.user;
      methods.reset({
        degree: user.degree,
        college: user.college,
        branch: user.branch,
        year: user.year,
        gender: user.gender,
        phone_number: user.phone_number,
      });
      setFormOpen(true);
    },
    flow: "auth-code",
  });
  // const login = () => {setFormOpen(true)};
  const isMid = useMediaQuery("(max-width:900px) ,(max-width:1462px)");
  return (
    <Box
      width={"100vw"}
      height={"400px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width="max-content"
        left={isMid ? "11rem" : "35rem"}
        height="387px"
        position={"absolute"}
      >
        <svg
          width={isMid ? "730" : "861"}
          height={isMid ? "300" : "387"}
          viewBox="0 0 861 387"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 35C0 15.67 15.6701 0 35 0H826C845.33 0 861 15.6701 861 35V232.274C861 242.228 856.762 251.711 849.346 258.35L715.614 378.076C709.196 383.823 700.884 387 692.269 387H371.391C352.061 387 336.391 371.33 336.391 352V290C336.391 270.67 320.721 255 301.391 255H35C15.67 255 0 239.33 0 220V35Z"
            fill="white"
          />
        </svg>
        <Box
          width={"max-content"}
          position={"absolute"}
          zIndex={1}
          left={isMid ? "4rem" : "0.6rem"}
          height={"max-content"}
          top={"1.3rem"}
        >
          <img width={isMid ? "250" : "400px"} src={Logo} alt="" />
        </Box>
        <Box
          top={"25%"}
          // marginLeft={"-60px"}
          position={"absolute"}
          zIndex={1}
          width={"max-content"}
          marginX={isMid ? "28rem" : "34rem"}
          left={"-100px"}
          height={"max-content"}
        >
          <img src={UnionBankLogo} width={isMid ? "260px" : "400px"} alt="" />
        </Box>
        <Button
          variant="contained"
          onClick={() => login()}
          style={{
            position: "absolute",
            top: "70%",
            right: "25%",
            color: "white",
            padding: "15px 20px",
            borderRadius: "10px",
            fontSize: "28px",
            zIndex: 10,
          }}
        >
          Register
        </Button>
        <ModalForm open={formOpen} setOpen={setFormOpen} methods={methods} />
        {/* <Button
          variant={isMid ? "subtitle1" : "h4"}
          component="button"
          position={"absolute"}
          top={isMid ? "13rem" : "17rem"}
          right={isMid ? "11.5rem" : "13rem"}
          bgcolor="#2846AA"
          color="white"
          padding={isMid ? "8px 17px" : "6px 20px"}
          borderRadius="10px"
        >
          Register
        </Button> */}
      </Box>
    </Box>
  );
}

export default Component1_whitecard;
