export interface apiWorkReadAnalyticsResponseType {
    minute: number
    span: string
    tasks: apiWorkReadAnalyticsResponseItemType[]
    users: apiWorkReadAnalyticsResponseItemType[]
}
export interface apiWorkReadAnalyticsResponseItemType {
    minute: number
    name: string
    ratio: number
    datas: apiWorkReadAnalyticsResponseDataType[]
}
export interface apiWorkReadAnalyticsResponseDataType {
    minute: number
    name: string
    ratio: number
}