export type Notice = {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: string;
  posted_at: string;
};

export type EventItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  event_date: string;
  venue: string;
  organizer: string;
  image_url: string | null;
};

export type Club = {
  id: string;
  name: string;
  category: string;
  description: string;
  meeting_day: string | null;
  contact: string | null;
};

export type Contact = {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string | null;
  email: string | null;
  category: string;
  priority: number;
};

export type CampusLocation = {
  id: string;
  name: string;
  block: string;
  floor: string | null;
  room: string | null;
  category: string;
  description: string | null;
  landmark: string | null;
};
