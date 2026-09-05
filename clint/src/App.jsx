import React, { useState } from "react";
import { useChat } from "./context/ChatContext";

const App = () => {
  const { myId, messages, sendMessage, editMessage, removeMessage } = useChat();
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  const startEdit = (msg) => {
    setEditingId(msg._id);
    setEditText(msg.text);
  };

  const saveEdit = (id) => {
    if (editText.trim()) editMessage(id, editText.trim());
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center p-3 sm:p-6 text-gray-700">
      {/* Neomorphic Card Container */}
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-[#e0e5ec] shadow-[9px_9px_16px_#a3b1c6,-9px_-9px_16px_#ffffff]">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-300/40 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-bold text-gray-700 tracking-wide">
            Socket Chat
          </h1>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-600">Online</span>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-[55vh] min-h-75 max-h-125 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-gray-400 font-medium px-4 py-2 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff]">
                No messages yet...
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((msg) => {
                const isMine = msg.sender === myId;
                return (
                  <div
                    key={msg._id}
                    className={`${
                      isMine ? "self-end text-violet-700" : "self-start text-gray-700"
                    } bg-[#e0e5ec] text-sm font-medium rounded-2xl px-4 py-3 max-w-[75%] shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] break-words`}
                  >
                    {editingId === msg._id ? (
                      <div className="flex items-center gap-2">
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          autoFocus
                          className="bg-transparent outline-none border-b border-gray-400 flex-1"
                        />
                        <button
                          onClick={() => saveEdit(msg._id)}
                          className="text-emerald-600 text-xs font-semibold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className={msg.isDeleted ? "italic text-gray-400" : ""}>
                          {msg.text}
                        </p>
                        {msg.isEdited && !msg.isDeleted && (
                          <span className="text-[10px] text-gray-400">(edited)</span>
                        )}
                        {isMine && !msg.isDeleted && (
                          <div className="flex gap-3 mt-1 text-[10px] text-gray-400">
                            <button
                              onClick={() => startEdit(msg)}
                              className="hover:text-violet-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeMessage(msg._id)}
                              className="hover:text-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 bg-[#e0e5ec] border-t border-gray-300/40"
        >
          <div className="flex items-center gap-3">
            {/* Inset Shadow for Input Box */}
            <div className="flex-1 rounded-2xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] px-4 py-1.5 transition-all">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message..."
                className="w-full bg-transparent py-2 text-sm sm:text-base text-gray-700 outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Extruded Button with Active Press Effect */}
            <button
              type="submit"
              className="shrink-0 rounded-2xl bg-[#e0e5ec] px-5 sm:px-7 py-3 text-sm font-semibold text-violet-600 shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] hover:text-violet-700 active:shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] transition-all"
            >
              Send
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default App;
