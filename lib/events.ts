export type Event = {
  type: string;
  title: string;
  speaker: string;
  photoUrl: string;
  date: string;
  timePst: string;
  timeIst: string;
};

export const upcomingEvents: Event[] = [
  {
    type: "DharmaLIVE Webinar",
    title: "Cave or Marketplace? Where Does Spiritual Development Truly Happen",
    speaker: "Rohit Arya",
    photoUrl: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/rohitarya.jpg",
    date: "13 August 2026",
    timePst: "7:00 AM PST",
    timeIst: "7:30 PM IST",
  },
  {
    type: "DharmaLIVE Webinar",
    title: "Why Are We This Way? A Guide to Hindu Shastras",
    speaker: "Ami Ganatra",
    photoUrl: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/ami.webp",
    date: "10 September 2026",
    timePst: "7:00 AM PST",
    timeIst: "7:30 PM IST",
  },
];
