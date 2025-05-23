import React, { Dispatch, SetStateAction } from "react";
import LoginLayout from "@/layouts/login";
import CreateUser from "@/components/user/CreateUser";
import { Container } from "@mui/material";
const AuthNew = ({setIsNew}:{setIsNew: Dispatch<SetStateAction<boolean>>}) => {
  return (
    <Container sx={{ p: "10px" }} maxWidth="xs">
      <CreateUser onCloseMyself={() => {}} loginInfo={null} setIsNew={setIsNew}/>
    </Container>
  );
};
export default AuthNew;
