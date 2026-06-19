import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const [sessions, setSessions] = useState([
    { id: 1, title: '🌾 Crop Rotation Methods' },
    { id: 2, title: '💧 Drip Irrigation Setup' },
    { id: 3, title: '💰 Loan Criteria Checklist' },
    { id: 4, title: '🐛 Organic Pest Controls' }
  ]);
  
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your AI farming assistant. Ask me anything about soil health, crop diseases, fertilizers, weather warnings, loans, or auctions.' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const feedEndRef = useRef(null);

  // Auto scroll to latest messages
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleNewChat = () => {
    if (messages.length > 1) {
      // Add previous chat summary to history sidebar
      const firstUserMsg = messages.find(m => m.sender === 'user');
      const newTitle = firstUserMsg ? firstUserMsg.text.substring(0, 25) + '...' : '🌱 New Farm Chat';
      setSessions(prev => [{ id: Date.now(), title: newTitle }, ...prev]);
    }
    setMessages([
      { sender: 'bot', text: 'Started a fresh AI conversation. Ask me about weather updates, seed auctions, loan procedures, or organic fertilizer mixtures!' }
    ]);
    setStatusMsg('');
  };

  const [statusMsg, setStatusMsg] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const userText = userInput;
    const userMessage = { sender: 'user', text: userText };
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    // Mock 3 seconds delay for "Typing..." showing Leaf Logo
    setTimeout(() => {
      const response = getBotResponse(userText);
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
      setIsTyping(false);
    }, 3000);
  };

  const getBotResponse = (input) => {
    const raw = input.toLowerCase().trim();

    if (raw.includes('weather') || raw.includes('rain') || raw.includes('temp')) {
      return (
        <span className="space-y-2 block">
          <span>You can check live weather reports and localized metrics on our <Link to="/WeathUpdates" className="text-yellow-400 underline font-bold">Weather Updates</Link> portal.</span>
          <br />
          <span>To forecast temperature risks and soil hazard trends, explore the <Link to="/weather-risk" className="text-yellow-400 underline font-bold">Weather Risk Advisor</Link>.</span>
        </span>
      );
    }
    if (raw.includes('auction') || raw.includes('bid') || raw.includes('slot')) {
      return (
        <span>
          Verify active bidding times and register a slot on our <Link to="/auction" className="text-yellow-400 underline font-bold">Auction Scheduling</Link> form page. Remaining seats are updated dynamically in real-time.
        </span>
      );
    }
    if (raw.includes('loan') || raw.includes('bank') || raw.includes('finance')) {
      return (
        <span>
          Apply for zero-collateral farming loans with low interest rates directly via our secure <Link to="/loan-form" className="text-yellow-400 underline font-bold">Loan Application</Link> portal. Be sure to upload your PAN card and land records.
        </span>
      );
    }
    if (raw.includes('shop') || raw.includes('buy') || raw.includes('fertilizer') || raw.includes('medicine')) {
      return (
        <span>
          Purchase certified organic fertilizers (Urea, DAP, NPK) and biological pest controls from the <Link to="/shopping" className="text-yellow-400 underline font-bold">Online Shopping Store</Link>. Items can be added to your cart for home delivery.
        </span>
      );
    }
    if (raw.includes('soil') || raw.includes('clay') || raw.includes('nutrient')) {
      return (
        <span>
          <strong>Agronomy Tip:</strong> To optimize soil health, ensure organic carbon levels remain above 0.8%. Apply organic compost or green manure. Use dolomite lime to neutralize acidic fields.
        </span>
      );
    }
    if (raw.includes('wheat') || raw.includes('rice') || raw.includes('maize') || raw.includes('crop')) {
      return (
        <span className="space-y-1 block">
          <span><strong>Wheat:</strong> Thrives in cool growing seasons (15-24°C) with sandy-loam soils.</span>
          <br />
          <span><strong>Rice:</strong> Demands clayey loam beds with standing water pools.</span>
          <br />
          <span><strong>Maize:</strong> Grows best in warm climates (21-27°C) with rich drainage.</span>
        </span>
      );
    }
    if (raw.includes('pest') || raw.includes('bug') || raw.includes('disease') || raw.includes('fungus')) {
      return (
        <span>
          <strong>Disease Control:</strong> For fungal leaf rust, apply organic copper fungicides. For leafhoppers or caterpillars, spray biological Neem Oil (500ml), which you can order directly in our Shop catalog.
        </span>
      );
    }
    if (raw.includes('water') || raw.includes('irrigate') || raw.includes('drip')) {
      return (
        <span>
          <strong>Water Conservation:</strong> Implement drip irrigation pipelines for sugarcane and orchards to minimize evaporation and save up to 40% water. Sprinkler systems are highly advised for wheat fields.
        </span>
      );
    }
    if (raw.includes('scheme') || raw.includes('government') || raw.includes('pm')) {
      return (
        <span>
          <strong>Government Schemes:</strong> The PM-KISAN program offers annual financial assistance of ₹6,000. Apply for a Soil Health Card to get free chemical analysis testing for your farm holdings.
        </span>
      );
    }
    if (raw.includes('about') || raw.includes('system') || raw.includes('logo')) {
      return (
        <span>
          <strong>FarmerWorld</strong> is a unified, smart agricultural ecosystem. We connect modern farmers to dynamic weather alerts, seed auction bookings, bank loans, and a cooperative portal. Explore more details on our <Link to="/about" className="text-yellow-400 underline font-bold">About Us</Link> page.
        </span>
      );
    }

    return (
      <span>
        I apologize, I didn't fully capture that. Try asking about: <strong>soil carbon, wheat vs rice temperatures, loan documentation, weather warnings, or organic crop sprays.</strong>
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto my-6 px-6" data-aos="fade-up">
      <div className="flex h-[78vh] rounded-3xl border border-emerald-500/20 shadow-2xl bg-emerald-950 overflow-hidden">
        
        {/* ChatGPT Style Sidebar */}
        <aside className="w-80 bg-emerald-950 border-r border-emerald-800 flex flex-col justify-between hidden md:flex">
          <div className="p-5 flex-grow overflow-y-auto">
            {/* New Chat Button */}
            <button 
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 border-2 border-emerald-500/30 hover:border-emerald-500 bg-emerald-900/40 hover:bg-emerald-900/80 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 mb-6 cursor-pointer text-sm"
            >
              <span>+</span> New AI Conversation
            </button>

            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400/60 mb-4 px-1">Chat Logs History</h4>
            
            <div className="space-y-2">
              {sessions.map(s => (
                <div 
                  key={s.id} 
                  className="w-full text-left p-3 rounded-xl bg-emerald-900/10 hover:bg-emerald-900/40 text-emerald-100 hover:text-white cursor-pointer text-sm transition-all duration-200 truncate flex items-center gap-2 border border-transparent hover:border-emerald-500/10"
                  onClick={() => {
                    setMessages([
                      { sender: 'bot', text: `Loaded previous conversation session: "${s.title}". How can I help you regarding this topic today?` }
                    ]);
                  }}
                >
                  <span>💬</span> {s.title}
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-5 bg-emerald-950/80 border-t border-emerald-900 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-800 rounded-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#52b788" />
              </svg>
            </div>
            <div>
              <p className="text-white font-extrabold text-sm leading-none">FarmerWorld AI</p>
              <span className="text-emerald-400 text-xs font-medium">Assistant Online</span>
            </div>
          </div>
        </aside>

        {/* Chat Main Window Pane */}
        <div className="flex-grow flex flex-col bg-[#fbfdf9] relative justify-between">
          {/* Header */}
          <div className="p-5 border-b border-emerald-500/10 bg-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#52b788" />
                  <path d="M13.5 13.5C10 13.5 6 17 5.5 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#0f3423] leading-tight">FarmerWorld Agronomist Chat</h3>
                <p className="text-xs text-emerald-950/60 font-medium">Farming diagnostics, loan advice, and real-time scheduling assist</p>
              </div>
            </div>

            {/* Mobile-only New Chat button */}
            <button 
              onClick={handleNewChat}
              className="md:hidden bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs py-2 px-3 rounded-lg border border-emerald-500/10 cursor-pointer"
            >
              + Reset
            </button>
          </div>

          {/* Messages Scroll Feed */}
          <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-gradient-to-b from-white via-[#fbfdf9] to-[#fbfdf9]">
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={index} className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {/* Bot Avatar */}
                  {!isUser && (
                    <div className="p-2.5 bg-emerald-900 rounded-xl flex-shrink-0 shadow-md">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#52b788" />
                        <path d="M13.5 13.5C10 13.5 6 17 5.5 21" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Message bubble */}
                  <div className={`p-4 max-w-[80%] rounded-2xl shadow-sm leading-relaxed ${
                    isUser 
                      ? 'bg-emerald-600 text-white rounded-br-none' 
                      : 'bg-emerald-900 text-white rounded-bl-none border border-emerald-800'
                  }`}>
                    <span className="block text-xs font-bold opacity-60 mb-1">
                      {isUser ? 'You' : 'FarmerWorld AI'}
                    </span>
                    <div className="text-sm font-semibold whitespace-pre-wrap">{msg.text}</div>
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-10 h-10 bg-emerald-100 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-emerald-800 shadow-sm">
                      F
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading / Typing State */}
            {isTyping && (
              <div className="flex items-start gap-4 justify-start">
                <div className="p-2.5 bg-emerald-900 rounded-xl flex-shrink-0 animate-bounce">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#52b788" />
                    <path d="M13.5 13.5C10 13.5 6 17 5.5 21" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="p-4 bg-emerald-900/95 text-white rounded-2xl rounded-bl-none border border-emerald-800 shadow-sm">
                  <span className="block text-xs font-bold opacity-60 mb-1">FarmerWorld AI</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-200">
                    {/* Animated Typing Dots */}
                    <span className="animate-pulse">Typing agronomic report</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-150"></span>
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-225"></span>
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={feedEndRef} />
          </div>

          {/* Inputs Section */}
          <form onSubmit={sendMessage} className="p-4 bg-white border-t border-emerald-500/10 flex items-center gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about soil nitrogen, crop rotation, loan terms..."
              className="flex-grow p-4 border border-emerald-500/20 rounded-2xl focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950 placeholder-emerald-900/40 bg-emerald-50/10"
              disabled={isTyping}
              required
            />
            <button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md cursor-pointer disabled:opacity-50"
              disabled={isTyping}
            >
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;