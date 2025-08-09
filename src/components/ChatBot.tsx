import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm UNIVERA's AI assistant. I can help you find colleges and PGs based on your preferences. Try asking me something like 'Show me engineering colleges in Mumbai' or 'Find PGs near VIT Chennai'.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response (would connect to actual AI service)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateBotResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes("college") && lowercaseQuery.includes("mumbai")) {
      return "I found several top engineering colleges in Mumbai:\n\n• IIT Bombay - Avg Package: ₹20 LPA\n• VJTI - Avg Package: ₹8 LPA\n• SPIT - Avg Package: ₹6 LPA\n\nWould you like more details about any of these colleges?";
    }
    
    if (lowercaseQuery.includes("pg") || lowercaseQuery.includes("accommodation")) {
      return "I can help you find verified PG accommodations! Here are some options:\n\n• Premium PGs with AC: ₹12,000-18,000/month\n• Standard PGs: ₹8,000-12,000/month\n• Budget PGs: ₹5,000-8,000/month\n\nWhich location are you looking for?";
    }
    
    if (lowercaseQuery.includes("placement") || lowercaseQuery.includes("package")) {
      return "Here are colleges with excellent placement records:\n\n• IITs: Average ₹15-25 LPA\n• NITs: Average ₹8-15 LPA\n• Top Private: Average ₹6-12 LPA\n\nWhich field are you interested in?";
    }
    
    return "I understand you're looking for information about colleges or PGs. Could you be more specific? For example:\n\n• 'Show me CSE colleges in Bangalore'\n• 'Find PGs near Anna University'\n• 'Compare placement records'\n• 'What are the fees for MBA courses?'";
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-hero"
        variant="hero"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 h-96 flex flex-col shadow-lg border-primary/20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-card-border bg-gradient-hero text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">UNIVERA Assistant</h3>
                <p className="text-xs text-white/80">Online now</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === "user" && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-card-border">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about colleges or PGs..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;