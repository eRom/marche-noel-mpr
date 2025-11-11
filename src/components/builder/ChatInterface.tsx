"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/builder";
import { Send, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  messages: ChatMessage[];
  isLoading?: boolean;
}

export default function ChatInterface({
  onSendMessage,
  messages,
  isLoading = false,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <h2 className="text-xl font-semibold">Personnalisez avec le chat</h2>

      {/* Zone de messages */}
      <div
        className="bg-muted/30 flex-1 space-y-4 overflow-y-auto rounded-lg border p-4"
        role="log"
        aria-label="Historique de la conversation"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 0 ? (
          <div className="text-muted-foreground flex h-full items-center justify-center text-center">
            <p>
              Commencez à personnaliser la décoration en décrivant vos
              modifications souhaitées.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <time
                  className="mt-1 block text-xs opacity-70"
                  dateTime={message.timestamp.toISOString()}
                >
                  {message.timestamp.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Génération en cours...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ex: Ajoute une fresque murale sur le grand mur du fond..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-label="Saisissez votre demande de modification"
          aria-describedby="chat-instructions"
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          aria-label="Envoyer le message"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">Envoyer</span>
        </Button>
      </form>
      <p id="chat-instructions" className="sr-only">
        Saisissez votre demande et appuyez sur Entrée pour envoyer
      </p>
    </div>
  );
}
