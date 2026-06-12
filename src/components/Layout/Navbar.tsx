interface NavbarProps {
  activeTab: "review" | "history";
  onTabChange: (tab: "review" | "history") => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔍</span>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">
              AI Code Reviewer
            </h1>
            <p className="text-gray-400 text-xs">Powered by Claude AI</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onTabChange("review")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "review"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            Code Review
          </button>
          <button
            onClick={() => onTabChange("history")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "history"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            History
          </button>
        </div>
      </div>
    </nav>
  );
}
