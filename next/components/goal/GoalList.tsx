import React, { useState, useEffect } from "react";
import CreateGoal from "@/components/goal/CreateGoal";
import GoalItem from "@/components/goal/GoalItem";
import AddIcon from "@mui/icons-material/Add";
import { apiGoalReadResponseGoalsType } from "@/types/api/goal/read/response";
import {
  IconButton,
  Dialog,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useGoalApi } from "@/data/goal";
import axios from "axios";
export default function GoalList() {
  const { goalRead, goalReadLoading } = useGoalApi();
  const [createGoalDialog, setCreateGoalDialog] = useState<boolean>(false);
  const [goals, setGoals] = useState<apiGoalReadResponseGoalsType[]>([]);

  const apiGoalRead = async () => {
    try {
      const res = await goalRead({
        date: ""
      });
      setGoals(res.data.goals);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラーが発生しました");
      }
    }
  };
  useEffect(() => {
    apiGoalRead();
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
        {goalReadLoading && !goals.length && (
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              p: "30px"
            }}>
            <CircularProgress />
          </CardContent>
        )}
        {!goalReadLoading && !goals.length && (
          <CardContent
            sx={{
              textAlign: "center",
              p: "20px !important"
            }}>
            登録されている目標はありません
          </CardContent>
        )}
        {!!goals.length && (
          <CardContent sx={{ p: "0 !important" }}>
            {goals.map((goal, index) => (
              <GoalItem
                goalRead={apiGoalRead}
                goal={goal}
                key={index.toString()}
              />
            ))}
          </CardContent>
        )}
      </Card>
      <Dialog open={createGoalDialog} onClose={() => { setCreateGoalDialog(false); }}>
        {createGoalDialog && (
          <CreateGoal
            onCloseMyself={() => {
              setCreateGoalDialog(false);
              apiGoalRead();
            }}
            focusGoal={null}
          />
        )}
      </Dialog>
      {/* <pre>{JSON.stringify(goals, null, 2)}</pre> */}
    </>
  );
}