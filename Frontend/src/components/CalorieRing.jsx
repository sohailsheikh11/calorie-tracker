export default function CalorieRing({ consumed, goal }) {
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