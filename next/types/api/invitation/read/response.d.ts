export interface apiInvitationResponseType {
  data: {
    fromFriends: apiInvitationResponseFriendType[];
    nowFriends: apiInvitationResponseFriendType[];
    toFriends: apiInvitationResponseFriendType[];
  };
}

export interface apiInvitationResponseFriendType {
  id: number;
  name: string;
  email: string;
  user_img: string;
  invitation_id: number;
}
