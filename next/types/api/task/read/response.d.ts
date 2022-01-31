export interface apiTaskReadResponseType {
    tasks: apiTaskReadResponseTaskType[]
}
export interface apiTaskReadResponseTaskType {
    task_id: number;
    name: string;
    task_default_minute: number;
    task_is_everyday: number;
    task_sort_key: number;
    minute: number;
    works: apiTaskReadResponseTaskWorkType[];
}
export interface apiTaskReadResponseTaskWorkType {
    work_id: number;
    work_date: string;
    work_minute: number;
    work_user_id: number;
    work_user_name: string;
    work_user_img: string;
}