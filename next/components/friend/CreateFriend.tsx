import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { api } from '@/plugins/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { CardContent } from '@mui/material';
import { apiInvitationCreateRequestType } from '@/types/api/invitation/create/request';
import { apiInvitationCreateResponseType } from '@/types/api/invitation/create/response';
import SendIcon from '@material-ui/icons/Send';
import { errorType } from "@/types/api/error";
export default function CreateFriend() {
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [emailError, setEmailError] = React.useState<string>('');
    const [invitationCreateLoading, setInvitationCreateLoading] = React.useState<boolean>(false);
    const invitationCreate = () => {
        if (validation()) {
            return;
        }
        const apiParam: apiInvitationCreateRequestType = {
            email: email
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/invitation/create`,
            method: "POST",
            data: apiParam
        };
        setInvitationCreateLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiInvitationCreateResponseType>) => {
                setSuccessMessage(res.data.successMessage);
            })
            .catch((err: AxiosError<errorType>) => {
                if (err.response?.data?.errorMessage) {
                    setEmailError(err.response.data.errorMessage);
                }
            })
            .finally(() => {
                setInvitationCreateLoading(false);
            });
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
            <CardHeader title="友達申請"/>
            <CardContent sx={{ p: '30px 15px', }} >
                {!Boolean(successMessage) &&
                    <TextField
                        onKeyPress={e => { if (e.key === 'Enter') { invitationCreate(); } }}
                        error={Boolean(emailError)}
                        helperText={emailError}
                        value={email}
                        onChange={(e) => { setEmail(e.currentTarget.value); }}
                        label="メールアドレス" variant="outlined" color="primary"
                    />
                }
                {Boolean(successMessage) &&
                    <Typography
                        sx={{
                            color: '#1976d2',
                            textAlign: 'center'
                        }}>{successMessage}
                    </Typography>
                }
            </CardContent>

            <CardActions disableSpacing>
                <div></div>
                {!Boolean(successMessage) &&
                    <LoadingButton
                        onClick={invitationCreate}
                        color="primary"
                        variant="contained"
                        loading={invitationCreateLoading}>
                        申請<SendIcon />
                    </LoadingButton>
                }
                {Boolean(successMessage) &&
                    <LoadingButton
                        onClick={() => {
                            setEmail('');
                            setSuccessMessage('');
                        }}
                        color="inherit"
                        variant="contained"
                        loading={invitationCreateLoading}>
                        続けて申請
                    </LoadingButton>
                }
            </CardActions>
        </Card>
    );
}
