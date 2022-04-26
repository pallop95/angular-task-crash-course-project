export interface ResponseLogin {
  isSuccess: boolean;
  role: Role;
  detail: Detail;
}

export interface Role {
  id: string;
  name: string;
}

export interface Detail {
  userId: string;
  username: string;
  email: string;
}
