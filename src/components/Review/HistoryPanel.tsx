import { useReviewStore } from "../../store/reviewStore";
import type { CodeReview } from "../../types";

const personaIcons = {
  "senior-dev": "👨‍💻",
  "security-auditor": "🔒",
  "performance-engineer": "⚡",
};

const personaLabels = {
  "senior-dev": "Senior Dev",
  "security-auditor": "Security Auditor",
  "performance-engineer": "Performance",
};

interface HistoryPanelProps {
  onSelectReview: (review: CodeReview) => void;
}

export default function HistoryPanel({ onSelectReview }: HistoryPanelProps) {
  const { reviews } = useReviewStore();

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <span className="text-4xl mb-4">📭</span>
        <p className="text-sm">No reviews yet</p>
        <p className="text-xs mt-1">
          Run your first code review to see history
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-white text-xl font-bold mb-6">Review History</h2>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            onClick={() => onSelectReview(review)}
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-indigo-500 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span>{personaIcons[review.persona]}</span>
                <span className="text-white font-semibold text-sm">
                  {personaLabels[review.persona]}
                </span>
                <span className="text-gray-500 text-xs uppercase bg-gray-700 px-2 py-0.5 rounded-full">
                  {review.language}
                </span>
              </div>
              <span className="text-gray-500 text-xs">
                {new Date(review.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {review.summary}
            </p>
            <div className="flex gap-2">
              {["critical", "warning", "info"].map((severity) => {
                const count = review.issues.filter(
                  (i) => i.severity === severity,
                ).length;
                if (count === 0) return null;
                const colors = {
                  critical: "bg-red-500/10 text-red-400",
                  warning: "bg-yellow-500/10 text-yellow-400",
                  info: "bg-blue-500/10 text-blue-400",
                };
                return (
                  <span
                    key={severity}
                    className={`text-xs px-2 py-1 rounded-full ${colors[severity as keyof typeof colors]}`}
                  >
                    {count} {severity}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
