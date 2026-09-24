export interface CastMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  imageUrl: string;
}

export interface CrewMember {
  role: string;
  name: string;
  notableWork: string;
}

export interface Diya {
  id: string;
  wish: string;
  sender: string;
  x: number; // percentage width
  y: number; // percentage height
  scale: number;
  speed: number;
}

export interface LoreChapter {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  iconName: string;
  bgUrl: string;
}
