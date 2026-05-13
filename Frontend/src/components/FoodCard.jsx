export default function FoodCard({ entry, onDelete }) {
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