import { Box, Card, CardActions, CardHeader, TextField, Typography } from "@mui/material";

import { CardContent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useInvitationApi } from "@/data/invitation";
const CreateFriend = () => {
  const { invitationCreate, invitationCreateLoading } = useInvitationApi();
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");
  const apiInvitationCreate = async () => {
    if (validation()) return;
    try {
      const res = await invitationCreate({
        email: email
      });
      setSuccessMessage(res.data.successMessage);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.errorMessage) {
          setEmailError(e.response.data.errorMessage);
        } else {
          alert(`${e?.response?.status}：${e?.response?.statusText}`);
        }
      } else {
        alert("予期せぬエラーが発生しました");
      }
    }
  };
  const validation = (): boolean => {
    let isError: boolean = false;
    setEmailError("");
    if (!(/.+@.+\..+/.test(email))) {
      setEmailError("正しい形式で入力してください");
      isError = true;
    }
    return isError;
  };
  return (
    <Card>
      <CardHeader title="友達申請" />
      <CardContent sx={{ p: "30px 15px", }} >
        {!successMessage && (
          <TextField
            onKeyPress={e => { if (e.key === "Enter") { apiInvitationCreate(); } }}
            error={!!emailError}
            helperText={emailError}
            value={email}
            onChange={(e) => { setEmail(e.currentTarget.value); }}
            label="メールアドレス" variant="outlined" color="primary"
          />
        )}
        {!!successMessage && (
          <Typography
            sx={{
              color: "#1976d2",
              textAlign: "center"
            }}>{successMessage}
          </Typography>
        )}
      </CardContent>

      <CardActions disableSpacing>
        <Box></Box>
        {!successMessage && (
          <LoadingButton
            onClick={apiInvitationCreate}
            color="primary"
            variant="contained"
            loading={invitationCreateLoading}>
            申請<SendIcon />
          </LoadingButton>
        )}
        {!!successMessage && (
          <LoadingButton
            onClick={() => {
              setEmail("");
              setSuccessMessage("");
            }}
            color="inherit"
            variant="contained"
            loading={invitationCreateLoading}>
            続けて申請
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
};
export default CreateFriend;