import React, { useEffect, useState } from "react";
import { DiaryEntry } from "../types";
import { supabase } from "../supabase";

interface DiaryListProps {
  entries: DiaryEntry[]; // masih dipakai untuk fallback/local
  groupCode: string;
}

export const DiaryList: React.FC<DiaryListProps> = ({ groupCode }) => {
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  // ✅ Fetch entries dari Supabase berdasarkan kode grup
  const fetchEntries = async () => {
    if (!groupCode) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("group_code", groupCode)
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      alert("Gagal load diary: " + error.message);
      return;
    }

    if (data) {
      // Convert Supabase data → DiaryEntry format
      const formatted: DiaryEntry[] = data.map((item: any) => ({
        id: item.id,
        date: new Date(item.created_at).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        title: item.title,
        content: item.content,
        mood: item.mood,
        image: item.image || undefined,
        createdAt: new Date(item.created_at).getTime(),
      }));

      setEntries(formatted);
    }
  };

  // ✅ Auto load setiap groupCode berubah
  useEffect(() => {
    fetchEntries();
  }, [groupCode]);

  // UI Loading
  if (loading) {
    return (
      <div className="text-center py-10 text-slate-400">
        Loading diary entries...
      </div>
    );
  }

  // UI Jika belum ada kode grup
  if (!groupCode) {
    return (
      <div className="text-center py-10 text-slate-400">
        Masukkan kode grup dulu untuk melihat diary 📌
      </div>
    );
  }

  // UI Jika belum ada entry
  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        Belum ada diary entry untuk grup ini ✨
      </div>
    );
  }

  // UI List Entries
  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 space-y-3 animate-in fade-in duration-500"
        >
          {/* Mood + Date */}
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span className="text-lg">{entry.mood}</span>
            <span>{entry.date}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-serif text-slate-800">
            {entry.title}
          </h2>

          {/* Content */}
          <p className="text-slate-600 leading-relaxed whitespace-pre-line">
            {entry.content}
          </p>

          {/* Image */}
          {entry.image && (
            <img
              src={entry.image}
              alt="Diary"
              className="w-full h-64 object-cover rounded-2xl mt-4"
            />
          )}
        </div>
      ))}
    </div>
  );
};
