export interface apiWorkCreateRequestType {
    date: string,
    task_id: number,
    works: {
        work_user_id: number,
        work_minute: number,
    }[],
}