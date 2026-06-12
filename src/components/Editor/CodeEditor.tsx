import Editor from "@monaco-editor/react";
import { useReviewStore } from "../../store/reviewStore";
import type { Language, ReviewPersona } from "../../types";

const languages: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

const personas: {
  value: ReviewPersona;
  label: string;
  icon: string;
  desc: string;
}[] = [
  {
    value: "senior-dev",
    label: "Senior Dev",
    icon: "👨‍💻",
    desc: "Bugs, best practices, readability",
  },
  {
    value: "security-auditor",
    label: "Security Auditor",
    icon: "🔒",
    desc: "Vulnerabilities & security risks",
  },
  {
    value: "performance-engineer",
    label: "Performance",
    icon: "⚡",
    desc: "Bottlenecks & optimizations",
  },
];

interface CodeEditorProps {
  onReview: () => void;
}

export default function CodeEditor({ onReview }: CodeEditorProps) {
  const {
    code,
    language,
    persona,
    isLoading,
    setCode,
    setLanguage,
    setPersona,
  } = useReviewStore();

  return (
    <div className="flex flex-col h-full">
      {/* Persona Selection */}
      <div className="p-4 border-b border-gray-700">
        <p className="text-gray-400 text-xs uppercase font-semibold mb-3">
          Review Persona
        </p>
        <div className="flex gap-2">
          {personas.map((p) => (
            <button
              key={p.value}
              onClick={() => setPersona(p.value)}
              className={`flex-1 p-3 rounded-lg border text-left transition-all ${
                persona === p.value
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-gray-700 hover:border-gray-500"
              }`}
            >
              <div className="text-lg mb-1">{p.icon}</div>
              <div className="text-white text-xs font-semibold">{p.label}</div>
              <div className="text-gray-400 text-xs">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-3">
        <p className="text-gray-400 text-xs uppercase font-semibold">
          Language:
        </p>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-gray-700 text-white text-sm rounded-lg px-3 py-1.5 border border-gray-600 outline-none"
        >
          {languages.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language === "cpp" ? "cpp" : language}
          value={code}
          onChange={(val) => setCode(val || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 16 },
          }}
        />
      </div>

      {/* Review Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onReview}
          disabled={isLoading || !code.trim()}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span>
              Analyzing code...
            </>
          ) : (
            <>✨ Review Code</>
          )}
        </button>
      </div>
    </div>
  );
}
