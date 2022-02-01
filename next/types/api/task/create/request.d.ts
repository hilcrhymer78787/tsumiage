export interface apiTaskCreateRequestType {
    task: apiTaskCreateRequestTaskType
}
export interface apiTaskCreateRequestTaskType {
    task_status: number,
    task_id: number,
    task_name: string,
    task_default_minute: number,
    task_point_per_minute: number,
}