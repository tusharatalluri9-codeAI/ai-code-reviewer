import { useState } from "react";
import { useReviewStore } from "../../store/reviewStore";
import { askFollowUp } from "../../services/aiService";
import type { ChatMessage } from "../../types";

export default function ChatPanel() {
  const { currentReview, code, chatMessages, addChatMessage, clearChat } =
    useReviewStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Why is this a security risk?",
    "Show me a better approach",
    "Explain the performance issue",
    "How would you test this?",
  ];

  async function sendMessage(text: string) {
    if (!text.trim() || !currentReview) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    addChatMessage(userMessage);
    setInput("");
    setLoading(true);

    try {
      const answer = await askFollowUp(text, code, currentReview);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
        timestamp: new Date(),
      };
      addChatMessage(aiMessage);
    } catch {
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I could not process that. Please try again.",
        timestamp: new Date(),
      });
    } finally {
      setLoading(false);
    }
  }

  if (!currentReview) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
        Run a review first to chat about your code
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-white font-semibold">💬 Ask Follow-up</h3>
        <button
          onClick={clearChat}
          className="text-gray-400 hover:text-white text-xs"
        >
          Clear
        </button>
      </div>

      {/* Suggestions */}
      {chatMessages.length === 0 && (
        <div className="p-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-full transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && <span className="text-lg">🤖</span>}
            <div
              className={`max-w-xs rounded-xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && <span className="text-lg">🙋</span>}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <span className="text-lg">🤖</span>
            <div className="bg-gray-700 text-gray-400 rounded-xl px-4 py-2 text-sm italic animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask about your code..."
          className="flex-1 bg-gray-700 text-white text-sm rounded-lg px-4 py-2 outline-none border border-gray-600 focus:border-indigo-500"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
