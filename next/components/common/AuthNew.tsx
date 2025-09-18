import { Dispatch, SetStateAction } from "react";
import CreateUser from "@/components/user/CreateUser";
import { Card, Container } from "@mui/material";
const AuthNew = ({
  setIsNew,
}: {
  setIsNew: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Container sx={{ p: "10px" }} maxWidth="xs">
      <Card>
        <CreateUser
          onCloseMyself={() => {}}
          loginInfo={null}
          setIsNew={setIsNew}
        />
      </Card>
    </Container>
  );
};
export default AuthNew;
