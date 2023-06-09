import { CreateOrganisation } from "./organisation";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  countryCode: string;
  organisation: CreateOrganisation;
}

export interface OrganisationUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  countryCode: string;
  organisationId: number;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UpdateUserData {
  userId: string;
  firstName: string;
  email: string;
  lastName: string;
  phone: string;
  countryCode: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  roles: string[];
  recordId: number;
  positionInOrganisation: number;
  organisationId: number;
  token: string;
}

export interface PasswordReset {
  resetToken: string;
  userGuid: string;
  expiryDate: string;
  newPassword: string;
}
