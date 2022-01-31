export interface apiTaskCreateRequestType {
    task: apiTaskCreateRequestTaskType
}
export interface apiTaskCreateRequestTaskType {
    task_id: number,
    task_name: string,
    task_default_minute: string,
    task_point_per_minute: string,
    task_user_id: number,
}