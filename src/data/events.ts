export type Event = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: Event[] = [
  { id: 1, title: 'KBTU Hackathon', date: '2026-11-14', place: 'KBTU, Almaty', seats: 120 },
  { id: 2, title: 'Kaspi Seller Meetup', date: '2026-11-20', place: 'Kaspi Hub, Almaty', seats: 60 },
  { id: 3, title: 'React Native Workshop', date: '2026-11-25', place: 'IT Park, Almaty', seats: 40 },
  { id: 4, title: 'Startup Pitch Night', date: '2026-12-02', place: 'Almaty Tech Garden', seats: 80 },
  { id: 5, title: 'Open Source Day', date: '2026-12-10', place: 'KBTU, Almaty', seats: 50 },
];
