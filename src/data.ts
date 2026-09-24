import { CastMember, CrewMember } from './types';

export const MOVIE_RELEASE_DATE = '2027-04-07T00:00:00+05:30'; // Target Date 12:00 AM IST

export const CAST_MEMBERS: CastMember[] = [
  {
    id: 'mahesh-babu',
    name: 'Superstar Mahesh Babu',
    role: 'RUDHRA (Main Lead)',
    imageUrl: 'https://i.pinimg.com/736x/f4/30/12/f4301247d0d784471a9f8d540fce6d22.jpg',
  },
  {
    id: 'priyanka-chopra',
    name: 'Priyanka Chopra Jonas',
    role: 'MANDAKINI',
    imageUrl: 'https://i.pinimg.com/736x/4d/74/25/4d7425bd70f94d998b6ca8152718227f.jpg',
  },
  {
    id: 'prithviraj',
    name: 'Prithviraj Sukumaran',
    role: 'KUMBHA',
    imageUrl: 'https://www.pinkvilla.com/images/2026-04/940680669_1ss2.webp',
  },
];

export const CREW_MEMBERS: CrewMember[] = [
  {
    role: 'DIRECTOR & VISIONARY',
    name: 'S. S. Rajamouli',
    notableWork: 'The legendary master of Baahubali 1&2, RRR, Magadheera',
  },
  {
    role: 'SCREENPLAY & STORY',
    name: 'K. V. Vijayendra Prasad',
    notableWork: 'Baahubali Saga, Bajrangi Bhaijaan, RRR',
  },
  {
    role: 'MUSIC & BACKGROUND SCORE',
    name: 'M. M. Keeravani',
    notableWork: 'Academy Award Winner, RRR, Baahubali',
  },
  {
    role: 'PRODUCERS',
    name: 'K. L. Narayana & S. S. Karthikeya',
    notableWork: 'Production Banners: Sri Durga Arts & Showing Business',
  },
];
