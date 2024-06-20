export interface Link {
  href: string;
  label: string;
}

export interface DbUser {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  // imageUrl?: string;
  role: "organizer" | "official" | "admin";
}
