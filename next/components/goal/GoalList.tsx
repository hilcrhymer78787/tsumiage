import React, { useState, useEffect } from "react";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from "@/plugins/axios";
import { apiGoalReadRequestType } from "@/types/api/goal/read/request";
import CreateGoal from "@/components/goal/CreateGoal";
import GoalItem from "@/components/goal/GoalItem";
import AddIcon from "@mui/icons-material/Add";
import { apiGoalReadResponseType } from "@/types/api/goal/read/response";
import { apiGoalReadResponseGoalsType } from "@/types/api/goal/read/response";
import {
    IconButton,
    Dialog,
    Card,
    CardHeader,
    CardContent,
    CircularProgress,
} from "@mui/material";
type Props = {
    // date: string,
}
export default function GoalList (props: Props) {
    const [createGoalDialog, setCreateGoalDialog] = useState(false as boolean);
    const [goals, setGoals] = useState([] as apiGoalReadResponseGoalsType[]);
    const [goalReadLoading, setGoalReadLoading] = useState(false as boolean);

    const goalRead = () => {
        const params: apiGoalReadRequestType = {
            date: "",
        };
        const requestConfig: AxiosRequestConfig = {
            url: "/api/goal/read",
            method: "GET",
            params: params
        };
        setGoalReadLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiGoalReadResponseType>) => {
                setGoals(res.data.goals);
            })
            .finally(() => {
                setGoalReadLoading(false);
            });
    };
    useEffect(() => {
        goalRead();
    }, []);

    return (
        <>
            <Card>
                <CardHeader
                    action={
                        <IconButton onClick={() => { setCreateGoalDialog(true); }}>
                            <AddIcon sx={{ bgcolor: "white", color: "#1976d2" }} />
                        </IconButton>
                    }
                    title={"目標" + (goals.length ? `（${goals.length}件）` : "")}
                />
                {goalReadLoading && !Boolean(goals.length) &&
                    <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: "30px"
                        }}>
                        <CircularProgress />
                    </CardContent>
                }
                {!goalReadLoading && !Boolean(goals.length) &&
                    <CardContent
                        sx={{
                            textAlign: "center",
                            p: "20px !important"
                        }}>
                        登録されている目標はありません
                    </CardContent>
                }
                {Boolean(goals.length) &&
                    <CardContent sx={{ p: "0 !important" }}>
                        {goals.map((goal, index) => (
                            <GoalItem
                                goalRead={goalRead}
                                goal={goal}
                                key={index.toString()}
                            />
                        ))}
                    </CardContent>
                }
            </Card>
            <Dialog open={createGoalDialog} onClose={() => { setCreateGoalDialog(false); }}>
                {createGoalDialog &&
                    <CreateGoal
                        onCloseMyself={() => {
                            setCreateGoalDialog(false);
                            goalRead();
                        }}
                        focusGoal={null}
                    />
                }
            </Dialog>
            {/* <pre>{JSON.stringify(goals, null, 2)}</pre> */}
        </>
    );
}