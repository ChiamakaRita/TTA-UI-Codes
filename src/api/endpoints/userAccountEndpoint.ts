import requests from "../main/apiConfig";
import {
  LoginPayload,
  OrganisationUserData,
  UpdateUserData,
  UserData,
  RegisterData,
  PasswordReset,
} from "../models/userAccount";

export const UserAccount = {
  login: (payload: LoginPayload) =>
    requests.post<UserData>("/users/authenticate", payload),

  register: (user: RegisterData) =>
    requests.post<UserData>("/users/register", user),

  myAccount: (userId: string) => requests.get<UserData>(`/users/${userId}`),

  update: (updateUser: UpdateUserData) =>
    requests.put<UserData>(`/users/${updateUser.userId}`, updateUser),

  usersInOrganisation: (id: number) =>
    requests.get<UserData[]>(`/users/organisations/${id}`),

  modifyRole: (id: string, payload: string[]) =>
    requests.patch<UserData>(`/users/${id}/modify-role`, payload),

  addUserToOrg: (payload: OrganisationUserData) =>
    requests.post<UserData>("/users/add-user-to-org", payload),

  addNewsLetterSubscriber: (emailAddress: string) =>
    requests.post<number>("/newsLetter", { emailAddress }),

  forgotPassword: (username: string) =>
    requests.get<void>(`/users/forgot-password/${username}`),

  resetPassword: (payload: PasswordReset) =>
    requests.post<void>("/users/reset-password", payload),
};
