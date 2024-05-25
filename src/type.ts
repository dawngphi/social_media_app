// data type user when login with google
// {"userInfo": {"idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkYzRlMTA5ODE1ZjQ2OTQ2MGU2M2QzNGNkNjg0MjE1MTQ4ZDdiNTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDAxNDQ0Njk2MTktcDFqbjNhbTZlcHU0cjJndHVqa2U2b2hrNGZndHZoN3IuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDAxNDQ0Njk2MTktbDE4NTNnZWdnNjdhb2cxMHR1cGwzZGhwY2hpdnM4MGkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTA3NDYzMzQzMDg0MDA4NjMxMzMiLCJlbWFpbCI6Im5oZW9uaGVvbmhlbzEyMzEyM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik5oZW8gTmhlbyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJblB5TjlROEpWOUw0aWxBUWhfNXpWOXlmVERBMTZYS194Q3NBZUZ2ZEg9czk2LWMiLCJnaXZlbl9uYW1lIjoiTmhlbyIsImZhbWlseV9uYW1lIjoiTmhlbyIsImxvY2FsZSI6InZpIiwiaWF0IjoxNzA3NDg5MDA5LCJleHAiOjE3MDc0OTI2MDl9.nGPlYmG52jCL2xsxIVsYhMGonqUOlX89CVH_9BLGe7MpC5wvUVgimAMLwE1SZNSxSBC1iSsoPGKEeEmXPT9ZnJ0mgHzcQKTraoxkU3thvn-NJgtTkFNSkvMf4lyerbbekSyfJSe4lzQ9zCaZGX8fK4ZjovXcIwu8zEZmPMNjGu3wWax_e78AHvF93dNTd_sBmxk_KRo27n8UF_MY8yMPH_WcdSVuSndM_kTxLE5y0PjJp1pJG6OonMs2Bu8VURuKB7_2Cyy6_-3DN2yHtNwe2A8plu70wMV5irOu7pBXnj5gm4vxJmN7YrS3hbHv5fGpsYp4vZO0kOjDtWtJIK_yug", "scopes": ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"], "serverAuthCode": null, "user": {"email": "nheonheonheo123123@gmail.com", "familyName": "Nheo", "givenName": "Nheo", "id": "110746334308400863133", "name": "Nheo Nheo", "photo": "https://lh3.googleusercontent.com/a/ACg8ocInPyN9Q8JV9L4ilAQh_5zV9yfTDA16XK_xCsAeFvdH=s96-c"}}}
export interface GoogleSigninUser {
  idToken?: string;
  scopes: string[];
  serverAuthCode: string | null;
  user: {
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    name: string;
    photo: string;
  };
}

export interface Author {
  _id: string;
  userName: string;
  fullName: string;
  avatar: string;
}

export interface Media {
  _id: string;
  link: string;
  post_id: string;
  orientation: number;
  width: number;
  height: number;
  __v: number;
}

export interface Comment {
  _id: string;
  create_by: Author;
  comment: string;
  post_id: string;
  reply_to: string | null;
  status: number;
  __v: number;
  repplies: Comment[];
  createdAt: string;
  isMine: boolean;
}

export interface Post {
  reposter: Reposter;
  _id: string;
  isRepost: boolean;
  body: string;
  author: Author;
  status: number;
  privacy: number;
  createdAt: Date;
  updatedAt: string;
  __v: number;
  media: Media[];
  comments: Comment[];
  reactions: any[]; // Chưa biết cụ thể kiểu dữ liệu của mảng này
  isMine: boolean;
  isLiked: boolean;
}
export interface PostResponse {
  posts: Post[];
  nextPage: number;
  prevPage: number;
}
export interface Reposter {
  _id: string;
  userName: string;
  fullName: string;
  avatar: string;
}
export type Notification = {
  _id: string;
  user: string;
  content: string;
  type: number;
  isRead: boolean;
  data: {
      id: string;
      image?: string; // Optional field
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};