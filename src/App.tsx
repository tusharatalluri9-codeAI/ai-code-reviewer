import { useState } from "react";
import type { CodeReview } from "./types";
import Navbar from "./components/Layout/Navbar";
import CodeEditor from "./components/Editor/CodeEditor";
import ReviewResults from "./components/Review/ReviewResults";
import ChatPanel from "./components/Review/ChatPanel";
import HistoryPanel from "./components/Review/HistoryPanel";
import { useReviewStore } from "./store/reviewStore";
import { reviewCode } from "./services/aiService";

export default function App() {
  const [activeTab, setActiveTab] = useState<"review" | "history">("review");
  const [setSelectedReview] = useState<CodeReview | null>(null);

  const {
    code,
    language,
    persona,
    currentReview,
    setLoading,
    setError,
    addReview,
    setCurrentReview,
  } = useReviewStore();

  async function handleReview() {
    setLoading(true);
    setError(null);
    try {
      const review = await reviewCode(code, language, persona);
      addReview(review);
      setCurrentReview(review);
    } catch (err) {
      setError("Failed to review code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectReview(review: CodeReview) {
    setSelectedReview(review);
    setCurrentReview(review);
    setActiveTab("review");
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "history" ? (
        <HistoryPanel onSelectReview={handleSelectReview} />
      ) : (
        <div
          className="flex flex-1 overflow-hidden"
          style={{ height: "calc(100vh - 65px)" }}
        >
          {/* Left — Code Editor */}
          <div className="w-1/2 border-r border-gray-700 flex flex-col bg-gray-850">
            <CodeEditor onReview={handleReview} />
          </div>

          {/* Right — Results + Chat */}
          <div className="w-1/2 flex flex-col">
            {currentReview ? (
              <>
                <div className="flex-1 overflow-y-auto border-b border-gray-700">
                  <ReviewResults review={currentReview} />
                </div>
                <div className="h-80">
                  <ChatPanel />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                <span className="text-6xl">🔍</span>
                <p className="text-lg font-medium text-gray-400">
                  Ready to review your code
                </p>
                <p className="text-sm">
                  Select a persona, paste your code, and click Review
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
