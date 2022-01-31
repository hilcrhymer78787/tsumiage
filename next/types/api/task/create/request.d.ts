export interface apiTaskCreateRequestType {
    task: apiTaskCreateRequestTaskType
}
export interface apiTaskCreateRequestTaskType {
    task_id: number,
    task_name: string,
    task_default_minute: string,
    task_is_everyday: number,
    task_room_id: number,
}