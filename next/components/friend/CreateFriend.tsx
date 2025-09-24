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
import axios from "axios";
import { useState } from "react";
import { useCreateInvitation } from "@/data/invitation/useCreateInvitation";

const CreateFriend = () => {
  const { createInvitation, isLoading } = useCreateInvitation();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const apiInvitationCreate = async () => {
    if (validation()) return;
    const res = await createInvitation({ email });
    if (!res) return;
    setMessage(res.data.data.message);
  };

  const validation = () => {
    let isError = false;
    setEmailError("");
    if (!/.+@.+\..+/.test(email)) {
      setEmailError("正しい形式で入力してください");
      isError = true;
    }
    return isError;
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
              if (e.key === "Enter") apiInvitationCreate();
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
            onClick={apiInvitationCreate}
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
