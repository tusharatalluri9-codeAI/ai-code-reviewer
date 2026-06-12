import type { CodeReview } from "../../types";
import Editor from "@monaco-editor/react";

interface ReviewResultsProps {
  review: CodeReview;
}

const severityColors = {
  critical: "bg-red-500/10 border-red-500/30 text-red-400",
  warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
};

const severityIcons = {
  critical: "🔴",
  warning: "🟡",
  info: "🔵",
};

const typeIcons = {
  bug: "🐛",
  security: "🔒",
  performance: "⚡",
  style: "🎨",
};

export default function ReviewResults({ review }: ReviewResultsProps) {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto h-full">
      {/* Summary */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          📋 Summary
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {review.summary}
        </p>
      </div>

      {/* Issues */}
      <div>
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          🔍 Issues Found
          <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
            {review.issues.length}
          </span>
        </h3>
        <div className="flex flex-col gap-2">
          {review.issues.map((issue, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 border ${severityColors[issue.severity]}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span>{severityIcons[issue.severity]}</span>
                <span>{typeIcons[issue.type]}</span>
                <span className="font-semibold text-sm capitalize">
                  {issue.type}
                </span>
                {issue.line && (
                  <span className="ml-auto text-xs opacity-70">
                    Line {issue.line}
                  </span>
                )}
              </div>
              <p className="text-sm mb-2">{issue.message}</p>
              <p className="text-xs opacity-80">💡 {issue.suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Improved Code */}
      <div>
        <h3 className="text-white font-semibold mb-3">✅ Improved Code</h3>
        <div className="rounded-xl overflow-hidden border border-gray-700">
          <Editor
            height="300px"
            language={review.language}
            value={review.improvedCode}
            theme="vs-dark"
            options={{
              readOnly: true,
              fontSize: 13,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 12 },
            }}
          />
        </div>
      </div>
    </div>
  );
}
