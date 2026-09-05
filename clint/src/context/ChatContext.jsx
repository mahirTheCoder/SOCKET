import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import * as api from "../api/api";

const SOCKET_URL = "http://localhost:8000";

// No login — but we still need SOME way to know "this message is mine".
// So each browser generates one random id the very first time it opens
// the app, and keeps reusing it from localStorage forever after.
const getMyId = () => {
  let id = localStorage.getItem("chat_client_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chat_client_id", id);
  }
  return id;
};

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const myId = useMemo(getMyId, []);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  // Connect once, load message history once.
  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("message-updated", (msg) => {
      setMessages((prev) => prev.map((m) => (m._id === msg._id ? msg : m)));
    });

    socket.on("message-deleted", (msg) => {
      setMessages((prev) => prev.map((m) => (m._id === msg._id ? msg : m)));
    });

    api.getMessages().then((res) => setMessages(res.data || []));

    return () => {
      socket.off("receive-message");
      socket.off("message-updated");
      socket.off("message-deleted");
      socket.disconnect();
    };
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const res = await api.sendMessage(myId, text);
    socketRef.current?.emit("send-message", res.data);
  };

  const editMessage = async (messageId, text) => {
    if (!text.trim()) return;
    const res = await api.editMessage(messageId, text);
    socketRef.current?.emit("edit-message", res.data);
  };

  const removeMessage = async (messageId) => {
    const res = await api.deleteMessage(messageId);
    socketRef.current?.emit("delete-message", res.data);
  };

  const value = { myId, messages, sendMessage, editMessage, removeMessage };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside a ChatProvider");
  return ctx;
};
