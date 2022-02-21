export interface apiTaskReadResponseType {
    tasks: apiTaskReadResponseTaskType[]
    date: string
}
export interface apiTaskReadResponseTaskType {
    id: number;
    name: string;
    default_minute: number;
    sort_key: number;
    status: number;
    work: apiTaskReadResponseTaskWorkType;
}
export interface apiTaskReadResponseTaskWorkType {
    id: number;
    minute: number;
}