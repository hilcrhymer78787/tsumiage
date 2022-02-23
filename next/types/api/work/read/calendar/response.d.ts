export interface apiWorkReadCalendarResponseType {
    calendars: apiWorkReadCalendarResponseCalendarType[]
    analytics: apiWorkReadCalendarResponseAnalyticsType
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
export interface apiWorkReadCalendarResponseAnalyticsType {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        borderColor: string,
    }[],
}