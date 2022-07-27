import { LoadingButton } from "@mui/lab";
import * as React from "react";
import { TextField, Box, Card, CardHeader, CardActions, Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import SendIcon from "@material-ui/icons/Send";
import { useInvitationApi } from "@/data/invitation";
import axios from "axios";
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
        {!Boolean(successMessage) && (
          <TextField
            onKeyPress={e => { if (e.key === "Enter") { apiInvitationCreate(); } }}
            error={Boolean(emailError)}
            helperText={emailError}
            value={email}
            onChange={(e) => { setEmail(e.currentTarget.value); }}
            label="メールアドレス" variant="outlined" color="primary"
          />
        )}
        {Boolean(successMessage) && (
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
        {!Boolean(successMessage) && (
          <LoadingButton
            onClick={apiInvitationCreate}
            color="primary"
            variant="contained"
            loading={invitationCreateLoading}>
            申請<SendIcon />
          </LoadingButton>
        )}
        {Boolean(successMessage) && (
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