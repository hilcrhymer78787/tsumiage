import {
  Box,
  Card,
  CardActions,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";

import { CardContent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useCreateInvitation } from "@/data/invitation/useCreateInvitation";

const CreateFriend = () => {
  const { createInvitation, isLoading, emailError, message, setMessage } =
    useCreateInvitation();
  const [email, setEmail] = useState("");

  const onClickCreate = () => {
    createInvitation({ email });
  };

  return (
    <Card>
      <CardHeader title="友達申請" />
      <CardContent sx={{ p: "30px 15px" }}>
        {!!message ? (
          <Typography color="primary" sx={{ textAlign: "center" }}>
            {message}
          </Typography>
        ) : (
          <TextField
            onKeyPress={(e) => {
              if (e.key === "Enter") onClickCreate();
            }}
            error={!!emailError}
            helperText={emailError}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            label="メールアドレス"
          />
        )}
      </CardContent>

      <CardActions disableSpacing>
        <Box></Box>
        {!message && (
          <LoadingButton
            onClick={onClickCreate}
            variant="contained"
            loading={isLoading}
          >
            申請
            <SendIcon />
          </LoadingButton>
        )}
        {!!message && (
          <LoadingButton
            onClick={() => {
              setEmail("");
              setMessage("");
            }}
            color="inherit"
            variant="contained"
            loading={isLoading}
          >
            続けて申請
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
};
export default CreateFriend;
