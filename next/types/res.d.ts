export type ApiErrType = {
    error: string
    error_description: string
}
export type ApiResType = {
    hotels: HotelType[]
    pagingInfo: PagingInfoType
}
export type HotelType = {
    hotel: [
        { hotelBasicInfo: HotelBasicInfoType },
        { hotelRatingInfo: HotelRatingInfoType },
    ]
}
export type HotelBasicInfoType = {
    access: string
    address1: string
    address2: string
    dpPlanListUrl: string
    faxNo: string
    hotelImageUrl: string
    hotelInformationUrl: string
    hotelKanaName: string
    hotelMapImageUrl: string
    hotelMinCharge: number
    hotelName: string
    hotelNo: number
    hotelSpecial: string
    hotelThumbnailUrl: string
    latitude: number
    longitude: number
    nearestStation: string
    parkingInformation: string
    planListUrl: string
    postalCode: string
    reviewAverage: number
    reviewCount: number
    reviewUrl: string
    roomImageUrl: null
    roomThumbnailUrl: null
    telephoneNo: string
    userReview: string
}
export type HotelRatingInfoType = {
    bathAverage: number
    equipmentAverage: number
    locationAverage: number
    mealAverage: number
    roomAverage: number
    serviceAverage: number
}
export type PagingInfoType = {
    first: number
    last: number
    page: number
    pageCount: number
    recordCount: number
}