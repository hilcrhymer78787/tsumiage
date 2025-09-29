import { Dispatch, SetStateAction } from "react";
import CreateUser from "@/components/user/CreateUser";
import { Card, Container } from "@mui/material";
import Center from "./Center";
const AuthNew = ({ setIsNew }: { setIsNew: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <Container maxWidth="xs">
      <Center minHeight="100vh" p="10px">
        <Card sx={{ width: "100%" }}>
          <CreateUser onCloseMyself={() => {}} loginInfo={null} setIsNew={setIsNew} />
        </Card>
      </Center>
    </Container>
  );
};
export default AuthNew;
