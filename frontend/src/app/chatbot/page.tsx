"use client";

import React, { useState, useRef, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApi } from "@/hooks/useApi";
import { chatbotApi } from "@/lib/api";
import { Send, Trash2, User, Bot } from "lucide-react";
import type { ChatMessage } from "@/types";

function ChatbotContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { execute: sendMessage, status: sendStatus } = useApi<ChatMessage>(
    (...args: unknown[]) => chatbotApi.sendMessage(args[0] as string)
  );

  const { data: history, status: historyStatus, execute: fetchHistory } = useApi<ChatMessage[]>(() => chatbotApi.getHistory());

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    if (history && history.length > 0) {
      setMessages(history);
    }
  }, [history]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sendStatus === "loading") return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");

    const response = await sendMessage(currentInput);
    if (response) {
      setMessages((prev) => [...prev, response]);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
          <p className="mt-1 text-sm text-gray-500">Ask questions about spending, schemes, and analytics</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleClear} disabled={messages.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Chat
        </Button>
      </div>

      <Card className="flex flex-1 flex-col !p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && historyStatus !== "loading" && (
            <div className="flex h-full items-center justify-center text-gray-500">
              <p>Start a conversation by typing a message below</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`mt-1 text-xs ${message.role === "user" ? "text-primary-200" : "text-gray-500"}`}>
                  {new Date(message.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {message.role === "user" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-700">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {sendStatus === "loading" && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg bg-gray-100 px-4 py-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                </div>
              </div>
            </div>
          )}

          {historyStatus === "loading" && messages.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <Loading size="md" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1"
              disabled={sendStatus === "loading"}
            />
            <Button onClick={handleSend} disabled={!input.trim() || sendStatus === "loading"}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function ChatbotPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="AI Assistant">
        <ChatbotContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
