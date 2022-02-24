import { analyticsType } from '@/types/common/analyticsType'
export interface apiGoalReadResponseType {
    goals: apiGoalReadResponseGoalsType[]
}
export interface apiGoalReadResponseGoalsType {
    id: number,
    minute: number,
    task_id: number,
    user_id: number,
    start_date: string,
    end_date: string,
    task_name: string,
    deadline_day_count: number,
    state: number,
    sum_minute: number,
    analytics: analyticsType
}
