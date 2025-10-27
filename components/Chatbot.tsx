import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { sendMessageToChatbot } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hi! I'm your Chhattisgarh tour guide. How can I help you plan your trip today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToChatbot(userInput);
      const botMessage: ChatMessage = { sender: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'bot', text: "Sorry, I'm having a little trouble right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-secondary text-brand-dark rounded-full p-4 shadow-lg hover:bg-brand-light transform transition-all duration-300 hover:scale-110"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          )}
        </button>
      </div>

      <div
        className={`fixed bottom-24 right-6 z-30 w-full max-w-sm h-[60vh] bg-brand-primary/80 backdrop-blur-md rounded-xl shadow-2xl flex flex-col transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="p-4 bg-brand-primary rounded-t-xl">
          <h3 className="text-lg font-bold text-brand-light text-center">Your Chhattisgarh Guide</h3>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-brand-secondary/50 scrollbar-track-brand-primary/50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-brand-secondary text-brand-dark' : 'bg-brand-dark/50 text-brand-accent'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="max-w-[80%] p-3 rounded-lg bg-brand-dark/50 text-brand-accent">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-primary/50">
          <div className="flex items-center bg-brand-dark/50 rounded-lg">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about your trip..."
              className="flex-1 p-3 bg-transparent border-none focus:ring-0 focus:outline-none text-brand-accent placeholder-brand-accent/60"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading} className="p-3 text-brand-secondary hover:text-brand-light disabled:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
