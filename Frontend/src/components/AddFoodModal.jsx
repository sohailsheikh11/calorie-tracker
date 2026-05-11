import { MEAL_TYPES } from "../MEALTYPE";
import { useState } from "react";
import { API_BASE } from "../MEALTYPE";

function AddFoodModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    mealType: "Breakfast",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.calories) {
      setError("Name and calories are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          calories: Number(form.calories),
          protein: Number(form.protein) || 0,
          carbs: Number(form.carbs) || 0,
          fat: Number(form.fat) || 0,
          quantity: Number(form.quantity) || 1,
        }),
      });
      if (!res.ok) throw new Error("Failed to add food");
      const data = await res.json();
      onAdd(data);
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md p-6 space-y-5 animate-[slideUp_0.25s_ease]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white tracking-tight">Log Food</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white text-2xl leading-none">×</button>
        </div>

        {error && (
          <div className="text-xs text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">{error}</div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Food name"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <input
            name="calories"
            type="number"
            value={form.calories}
            onChange={handleChange}
            placeholder="Calories (kcal)"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-green-500 transition-colors"
          />
          <input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            min="1"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-green-500 transition-colors"
          />
          <input
            name="protein"
            type="number"
            value={form.protein}
            onChange={handleChange}
            placeholder="Protein (g)"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
          />
          <input
            name="carbs"
            type="number"
            value={form.carbs}
            onChange={handleChange}
            placeholder="Carbs (g)"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <input
            name="fat"
            type="number"
            value={form.fat}
            onChange={handleChange}
            placeholder="Fat (g)"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <select
            name="mealType"
            value={form.mealType}
            onChange={handleChange}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors appearance-none"
          >
            {MEAL_TYPES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-black rounded-xl py-3 text-sm tracking-wide transition-colors"
        >
          {loading ? "Adding…" : "Add to Log"}
        </button>
      </div>
    </div>
  );
}

export default AddFoodModal;