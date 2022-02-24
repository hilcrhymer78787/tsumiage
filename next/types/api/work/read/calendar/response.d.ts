import {analyticsType} from '@/types/common/analyticsType'
export interface apiWorkReadCalendarResponseType {
    calendars: apiWorkReadCalendarResponseCalendarType[]
    analytics: analyticsType
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