import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToBot } from '../services/geminiService';
import type { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial bot message when the chat is opened for the first time.
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ sender: 'bot', text: 'Hello! I am CG-Bot, your friendly guide to Chhattisgarh. How can I help you plan your trip today?' }]);
        }
    }, [isOpen, messages.length]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponse = await sendMessageToBot(input);
            const botMessage: ChatMessage = { sender: 'bot', text: botResponse };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { sender: 'bot', text: error instanceof Error ? error.message : 'Sorry, something went wrong.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-brand-secondary text-brand-dark rounded-full p-4 shadow-lg hover:bg-brand-light transform hover:scale-110 transition-all duration-300 z-30"
                aria-label="Toggle Chatbot"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </button>

            <div className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-brand-primary rounded-lg shadow-2xl z-30 transform transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="p-4 bg-brand-dark rounded-t-lg flex justify-between items-center">
                    <h3 className="font-serif text-lg text-brand-light">Chat with CG-Bot</h3>
                    <button onClick={() => setIsOpen(false)} className="text-brand-accent/70 hover:text-brand-accent text-2xl leading-none">&times;</button>
                </div>
                <div className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-brand-secondary/50 scrollbar-track-brand-primary/50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-brand-secondary text-brand-dark' : 'bg-brand-primary/80 text-brand-accent'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                            <div className="max-w-xs lg:max-w-sm px-4 py-2 rounded-lg bg-brand-primary/80 text-brand-accent">
                                <span className="animate-pulse">...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-dark">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-grow p-2 bg-brand-dark/50 border-2 border-brand-primary rounded-l-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none text-brand-accent"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-brand-secondary text-brand-dark font-bold p-2 rounded-r-lg hover:bg-brand-light disabled:bg-gray-500" disabled={isLoading}>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Chatbot;