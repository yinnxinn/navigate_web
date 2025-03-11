export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  websites: string[];
}

export interface Website {
  id: string;
  title: string;
  url: string;
  description: string;
  group: string;
  createdBy: string;
}