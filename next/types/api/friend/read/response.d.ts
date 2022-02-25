export interface apiFriendReadResponseType {
    fromFriends: apiFriendReadResponseFriendType[],
    nowFriends: apiFriendReadResponseFriendType[],
    toFriends: apiFriendReadResponseFriendType[],
}
export interface apiFriendReadResponseFriendType {
    id: number,
    name: string,
    email: string,
    user_img: string,
}