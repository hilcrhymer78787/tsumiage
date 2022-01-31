export interface apiWorkReadCalendarResponseType {
    calendars: apiWorkReadCalendarResponseCalendarType[]
}
export interface apiWorkReadCalendarResponseCalendarType {
    date: string
    minute: number
    users: apiWorkReadCalendarResponseCalendarUserType[]
}
export interface apiWorkReadCalendarResponseCalendarUserType {
    id: number
    minute: number
    name: string
}