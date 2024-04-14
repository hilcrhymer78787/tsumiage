import React from "react";
import LoginLayout from "@/layouts/login";
import CreateUser from "@/components/user/CreateUser";
const Login = () => {
  return (
    <LoginLayout>
      <CreateUser onCloseMyself={() => { }} loginInfo={null} />
    </LoginLayout>
  );
};
export default Login;