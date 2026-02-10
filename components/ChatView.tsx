
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { products } from '../constants';
import { SendIcon, UserCircleIcon } from './Icons';

type Message = {
  author: 'user' | 'supermin';
  text: string;
};

// --- Sub-Components ---

// Component for the initial name input screen
interface NameInputViewProps {
  tempName: string;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const NameInputView: React.FC<NameInputViewProps> = ({ tempName, onNameChange, onSubmit }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <img src="https://ik.imagekit.io/hrctvvb3m/Untitled%20design.jpg" alt="Cafe JSR Logo" className="h-24 w-24 rounded-full object-cover mb-4 animate-bobbing" />
    <h2 className="text-2xl font-bold text-gray-800">Chat dengan Supermin!</h2>
    <p className="mt-2 text-gray-600">Sebelum mulai, boleh tahu nama Anda?</p>
    <form onSubmit={onSubmit} className="mt-6 w-full max-w-sm">
      <input
        type="text"
        value={tempName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Masukkan nama Anda di sini..."
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-forest text-gray-900"
        required
        autoFocus
      />
      <button type="submit" className="mt-4 w-full bg-green-forest text-white py-3 rounded-lg font-semibold hover:bg-green-forest/90 transition-colors">
        Mulai Chat
      </button>
    </form>
  </div>
);

// Component for the main chat interface
interface ChatInterfaceViewProps {
  messages: Message[];
  isLoading: boolean;
  input: string;
  onInputChange: (value: string) => void;
  onSendMessage: (e?: React.FormEvent) => void;
}

const ChatInterfaceView: React.FC<ChatInterfaceViewProps> = ({ messages, isLoading, input, onInputChange, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-stone-100">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.author === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.author === 'supermin' && (
              <img src="https://ik.imagekit.io/hrctvvb3m/Untitled%20design.jpg" alt="Supermin" className="h-8 w-8 rounded-full flex-shrink-0" />
            )}
            <div className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md break-words ${msg.author === 'user' ? 'bg-green-forest text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
            {msg.author === 'user' && (
              <UserCircleIcon className="h-8 w-8 text-gray-400 flex-shrink-0" />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-2 justify-start">
            <img src="https://ik.imagekit.io/hrctvvb3m/Untitled%20design.jpg" alt="Supermin" className="h-8 w-8 rounded-full" />
            <div className="px-4 py-2 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-sm">
              <div className="flex items-center justify-center space-x-1">
                <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={onSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Ketik pesan Anda..."
            className="flex-grow px-4 py-2 bg-stone-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-forest text-gray-900"
            disabled={isLoading}
          />
          <button type="submit" className="bg-green-forest text-white rounded-full p-3 hover:bg-green-forest/90 transition-colors disabled:bg-gray-400" disabled={isLoading || !input.trim()}>
            <SendIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};


// --- Main Component ---

export const ChatView: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);

  const initializeChat = useCallback((name: string) => {
    setMessages([{
        author: 'supermin',
        text: `Halo ${name}! Selamat datang di Cafe JSR. Saya Supermin, asisten AI Anda. Ada yang bisa saya bantu? Tanyakan apa saja tentang produk kami!`
    }]);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const productListString = products.map(p => `- ${p.name}: ${p.description} (Harga: Rp${p.price})`).join('\n');
    const systemInstruction = `You are Supermin, a friendly, cheerful, and knowledgeable AI assistant for Cafe JSR. Your goal is to help customers with their questions.
    You are an expert on our products: healthy snacks 'Plizstop' and herbal drinks 'Wedhang'.
    All products are 100% natural, gluten-free, and contain no MSG.
    The customer's name is ${name}. Always be polite and address them kindly.
    Keep your answers concise and helpful, using Indonesian language.
    Here is the list of our products for your reference:
    ${productListString}
    Do not mention that you have a list of products, just use the information to answer questions.
    `;

    const newChat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: systemInstruction,
        },
    });
    setChat(newChat);
  }, []);

  const handleNameSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = tempName.trim();
    if (trimmedName) {
      setUserName(trimmedName);
      initializeChat(trimmedName);
    }
  }, [tempName, initializeChat]);

  const handleSendMessage = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: Message = { author: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: currentInput });
      const aiResponse: Message = { author: 'supermin', text: response.text };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: Message = { author: 'supermin', text: "Maaf, sepertinya ada sedikit gangguan. Coba tanyakan lagi nanti ya." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, chat]);

  return (
    <div className="h-[calc(100vh-128px)]">
      {!userName ? (
        <NameInputView 
          tempName={tempName} 
          onNameChange={setTempName} 
          onSubmit={handleNameSubmit} 
        />
      ) : (
        <ChatInterfaceView 
          messages={messages}
          isLoading={isLoading}
          input={input}
          onInputChange={setInput}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};
