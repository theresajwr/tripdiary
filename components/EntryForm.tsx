import React, { useState, useRef } from "react";
import { Mood, DiaryEntry } from "../types";
import { MoodSelector } from "./MoodSelector";
import { supabase } from "../supabase";

interface EntryFormProps {
  onAddEntry: (entry: DiaryEntry) => void;
  onCancel: () => void;
}

export const EntryForm: React.FC<EntryFormProps> = ({
  onAddEntry,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<Mood>(Mood.HAPPY);

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Upload image → base64 string
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Submit diary entry
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Judul dan cerita tidak boleh kosong!");
      return;
    }

    // ✅ Ambil kode grup dari localStorage
    const groupCode = localStorage.getItem("groupCode");

    if (!groupCode) {
      alert("Kode grup belum dimasukkan. Masukkan dulu kode grup!");
      return;
    }

    setLoading(true);

    // Entry object lokal
    const newEntry: DiaryEntry = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      title,
      content,
      mood,
      image: image || undefined,
      createdAt: Date.now(),
    };

    // ✅ SIMPAN KE SUPABASE DATABASE
    const { error } = await supabase.from("entries").insert([
      {
        group_code: groupCode,
        title: title,
        content: content,
        mood: mood,
        image: image,
        created_at: new Date(),
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Gagal menyimpan entry: " + error.message);
      return;
    }

    // ✅ Tambahkan juga ke UI biar langsung muncul
    onAddEntry(newEntry);

    // Reset form
    setTitle("");
    setContent("");
    setMood(Mood.HAPPY);
    setImage(null);

    alert("Diary berhasil disimpan 🎉");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-4">
        {/* Mood Selector */}
        <MoodSelector selectedMood={mood} onSelect={setMood} />

        {/* Title */}
        <input
          type="text"
          placeholder="Entry Title..."
          className="w-full text-2xl font-serif border-none focus:ring-0 placeholder-slate-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Content */}
        <textarea
          placeholder="Tell your story..."
          className="w-full h-64 border-none focus:ring-0 resize-none text-slate-700 leading-relaxed placeholder-slate-300"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {/* Preview Image */}
        {image && (
          <div className="relative group">
            <img
              src={image}
              alt="Upload"
              className="w-full h-64 object-cover rounded-2xl"
            />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        )}

        {/* Bottom Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {/* Add Photo */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            Add Photo
          </button>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-slate-500 hover:text-slate-700 font-medium"
            >
              Discard
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-lg shadow-indigo-200 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Entry"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
