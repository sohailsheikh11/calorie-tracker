import { useState, useEffect } from "react";
import FoodImageUpload from "./FoodImageUpload";
import { MEAL_TYPES } from "./MEALTYPE";
import AddFoodModal from "./components/AddFoodModal";
import { API_BASE } from "./MEALTYPE";


const DAILY_GOAL = 2000;

const MACRO_COLORS = {
  protein: "#f97316",
  carbs: "#3b82f6",
  fat: "#a855f7",
};

function MacroBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-mono uppercase tracking-widest">
        <span style={{ color }}>{label}</span>
        <span className="text-zinc-400">{value}g</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function CalorieRing({ consumed, goal }) {
  const pct = Math.min(consumed / goal, 1);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  const over = consumed > goal;

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#27272a" strokeWidth="10" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke={over ? "#ef4444" : "#22c55e"}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          className="transition-all duration-700"
        />
      </svg>
      <div className="text-center z-10">
        <div className={`text-2xl font-black font-mono ${over ? "text-red-400" : "text-green-400"}`}>
          {consumed}
        </div>
        <div className="text-xs text-zinc-500 font-mono tracking-wider">/ {goal} kcal</div>
      </div>
    </div>
  );
}

function FoodCard({ entry, onDelete }) {
  return (
    <div className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl px-4 py-3 transition-all duration-200">
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{
          backgroundColor:
            entry.mealType === "Breakfast"
              ? "#facc15"
              : entry.mealType === "Lunch"
              ? "#22c55e"
              : entry.mealType === "Dinner"
              ? "#3b82f6"
              : "#f97316",
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-white text-sm truncate">{entry.food_name}</span>
          <span className="text-xs text-zinc-500 font-mono">{entry.meal_type}</span>
        </div>
        <div className="flex gap-3 mt-0.5 text-xs font-mono text-zinc-500">
          <span>P {entry.protein ?? 0}g</span>
          <span>C {entry.carbs ?? 0}g</span>
          <span>F {entry.fat ?? 0}g</span>
          {entry.quantity && <span>×{entry.quantity}</span>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-black text-white font-mono text-sm">{entry.calories}</span>
        <button
          onClick={() => onDelete(entry._id)}
          className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all duration-200 text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}



export default function CalorieTracker() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [date] = useState(new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));

  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:3000/food");

      
      const data = await res.json();

      console.log("this is the data", data);
      setEntries(Array.isArray(data) ? data : []);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setEntries((e) => e.filter((x) => x._id !== id));
    } catch {}
  };

  const handleAdd = (newEntry) => {
    setEntries((e) => [newEntry, ...e]);
  };

  const filtered = filter === "All" ? entries : entries.filter((e) => e.meal_type === filter);

  console.log("these are the enteries",entries);

  const totalCalories = entries.reduce((s, e) => s + (Number(e.calories) || 1),0);
  const totalProtein = entries.reduce((s, e) => s + (parseFloat(e.protein) || 0), 0);

  console.log("total protein", totalProtein);
  const totalCarbs = entries.reduce((s, e) => s + (parseFloat(e.carbs) || 0), 0);
  const totalFat = entries.reduce((s, e) => s + (parseFloat(e.fat) || 0), 0);
  const remaining = DAILY_GOAL - totalCalories;

  useEffect(()=>{
    console.log("these are total protein",totalProtein);
    console.log("these are total carbs",totalCarbs);
  },[])

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&display=swap');
        * { font-family: 'Syne', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur border-b border-zinc-900">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase">{date}</div>
            <h1 className="text-xl font-black tracking-tight leading-none mt-0.5">
              Calorie <span className="text-green-400">Tracker</span>
            </h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-black px-4 py-2 rounded-xl transition-colors"
          >
            <span className="text-lg leading-none">+</span> Log Food
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* Summary Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center gap-6">
            <CalorieRing consumed={totalCalories} goal={DAILY_GOAL} />
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-zinc-800/60 rounded-xl py-2 px-1">
                  <div className="text-lg font-black text-green-400 font-mono">{totalCalories}</div>
                  <div className="text-xs text-zinc-500 font-mono">eaten</div>
                </div>
                <div className="bg-zinc-800/60 rounded-xl py-2 px-1">
                  <div className={`text-lg font-black font-mono ${remaining < 0 ? "text-red-400" : "text-white"}`}>
                    {Math.abs(remaining)}
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">{remaining < 0 ? "over" : "left"}</div>
                </div>
                <div className="bg-zinc-800/60 rounded-xl py-2 px-1">
                  <div className="text-lg font-black text-zinc-300 font-mono">{DAILY_GOAL}</div>
                  <div className="text-xs text-zinc-500 font-mono">goal</div>
                </div>
              </div>
              <div className="space-y-2">
                <MacroBar label="Protein" value={totalProtein} max={150} color={MACRO_COLORS.protein} />
                <MacroBar label="Carbs" value={totalCarbs} max={250} color={MACRO_COLORS.carbs} />
                <MacroBar label="Fat" value={totalFat} max={65} color={MACRO_COLORS.fat} />
              </div>
            </div>
          </div>
        </div>

        {/* Meal Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["All", ...MEAL_TYPES].map((m) => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={`flex-shrink-0 text-xs font-black px-4 py-2 rounded-full border transition-all duration-200 ${
                filter === m
                  ? "bg-green-500 border-green-500 text-black"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Food List */}
        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-zinc-600 text-xs font-mono mt-3">Loading entries…</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <div className="text-4xl">🥗</div>
              <div className="text-zinc-500 text-sm">
                {filter === "All" ? "No food logged today. Start tracking!" : `No ${filter} entries yet.`}
              </div>
            </div>
          ) : (
            filtered.map((entry, i) => (
              <div key={entry._id ?? i} className="fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                <FoodCard entry={entry} onDelete={handleDelete} />
              </div>
            ))
          )}
        </div>

        {/* Meal Breakdown */}
        {entries.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Meal Breakdown</h3>
            <div className="space-y-3">
              {MEAL_TYPES.map((meal) => {
                const mealEntries = entries.filter((e) => e.meal_type === meal);
                const mealCals = mealEntries.reduce((s, e) => s + parseFloat(e.calories) || 1,0);
                const pct = DAILY_GOAL > 0 ? (mealCals / DAILY_GOAL) * 100 : 0;
                const color =
                  meal === "Breakfast" ? "#facc15" : meal === "Lunch" ? "#22c55e" : meal === "Dinner" ? "#3b82f6" : "#f97316";
                return (
                  <div key={meal} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span style={{ color }}>{meal}</span>
                      <span className="text-zinc-400">{mealCals} kcal · {mealEntries.length} items</span>
                    </div>
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {showModal && (
        <AddFoodModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}

      <FoodImageUpload enteries={entries} setEnteries={setEntries}/>
    </div>
  );
}