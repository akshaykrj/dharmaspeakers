import { supabase } from "@/lib/supabase";

export type Event = {
  id: string;
  type: string;
  title: string;
  speaker: string;
  photoUrl: string;
  date: string;
  timePst: string;
  timeIst: string;
};

export async function getUpcomingEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("id, type, title, speaker, photo_url, date, time_pst, time_ist")
    .eq("published", true)
    .order("event_date", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    type: row.type,
    title: row.title,
    speaker: row.speaker,
    photoUrl: row.photo_url ?? "",
    date: row.date,
    timePst: row.time_pst ?? "",
    timeIst: row.time_ist ?? "",
  }));
}
