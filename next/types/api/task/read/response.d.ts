export interface apiTaskReadResponseType {
    tasks: apiTaskReadResponseTaskType[]
}
export interface apiTaskReadResponseTaskType {
    id: number;
    name: string;
    default_minute: number;
    sort_key: number;
    status: number;
    // works: apiTaskReadResponseTaskWorkType[];
}
export interface apiTaskReadResponseTaskWorkType {
    work_id: number;
    work_date: string;
    work_minute: number;
    work_user_id: number;
    work_user_name: string;
    work_user_img: string;
}