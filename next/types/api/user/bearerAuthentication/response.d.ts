export interface apiUserBearerAuthenticationResponseType {
    id: number
    email: string
    name: string
    token: string
    user_img: string
    // email: string
    // id: number
    // name: string
    // room_id: number
    // room_img: string
    // room_name: string
    // user_img: string
    // user_room_id: number
    // room_inviting_users: apiUserBearerAuthenticationResponseUserType[]
    // room_joined_users: apiUserBearerAuthenticationResponseUserType[]
    // rooms: apiUserBearerAuthenticationResponseRoomType[]
    // invited_rooms: apiUserBearerAuthenticationResponseInvitedRoomType[]
}
export interface apiUserBearerAuthenticationResponseInvitedRoomType {
    invitation_id: number
    invitation_status: number
    inviting_users: apiUserBearerAuthenticationResponseUserType[]
    joined_users: apiUserBearerAuthenticationResponseUserType[]
    name: string
    room_id: number
    room_img: string
    room_name: string
}
export interface apiUserBearerAuthenticationResponseUserType {
    id: number
    name: string
}
export interface apiUserBearerAuthenticationResponseRoomType {
    invitation_id: number
    room_id: number
    room_img: string
    room_name: string
}