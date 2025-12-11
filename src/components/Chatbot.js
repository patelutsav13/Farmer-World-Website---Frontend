// import React, { useState } from 'react';
// import '../styles/index.css';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! I am your farming assistant. Ask me anything about farming.' }]);
//   const [userInput, setUserInput] = useState('');

//   const sendMessage = () => {
//     if (!userInput.trim()) return;
//     const userMessage = { sender: 'user', text: userInput };
//     const botResponse = getBotResponse(userInput);
//     setMessages([...messages, userMessage, { sender: 'bot', text: botResponse }]);
//     setUserInput('');
//   };

//   const getBotResponse = (input) => {
//     input = input.toLowerCase();
//     if (input.includes('weather')) return 'You can check the weather in your area from the Weather section.';
//     if (input.includes('loan')) return 'You can check the Banking section for loan applications and peer-to-peer lending options.';
//     if (input.includes('shoping')) return 'You can Buy Farming Components From  Online Shoping Section section.';
//     return 'I’m not sure about that. Try asking about weather, crops, loans, or farming techniques.';
//   };

//   return (
//     <main className="p-5">
//       <section id="chat-container">
//         <div id="chatbox">
//           {messages.map((msg, index) => (
//             <p key={index} className={msg.sender}>{`${msg.sender === 'user' ? 'You' : 'Bot'}: ${msg.text}`}</p>
//           ))}
//         </div>
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder="Type your question..."
//           className="form-section"
//         />
//         <button onClick={sendMessage} className="cta-button">Send</button>
//       </section>
//     </main>
//   );
// };

// export default Chatbot;





import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: <>Hello! I am your farming assistant. Ask me anything about farming.</> }
  ]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = () => {
    if (!userInput.trim()) return;
    const userMessage = { sender: 'user', text: userInput };
    const botResponse = getBotResponse(userInput);
    setMessages([...messages, userMessage, { sender: 'bot', text: botResponse }]);
    setUserInput('');
  };

  const getBotResponse = (input) => {
    input = input.toLowerCase();
    if (input.includes('weather')) {
      return (
        <>
          You can check the weather in your area from the <Link to="/WeathUpdates" className="chat-link">Weather Updates</Link> section.
          You can predict weather from the <Link to="/weather-risk" className="chat-link">Weather Risks</Link> section.
        </>
      );
    }
    if (input.includes('auction')) {
      return (
        <>
          You can book appointment for auction <Link to="/auction" className="chat-link">Auction Appointment </Link> section.
        </>
      );
    }
    if (input.includes('loan')) {
      return (
        <>
          You can apply for loan from <Link to="/loan-form" className="chat-link">Loan Form</Link> section for loan applications and peer-to-peer lending options.
        </>
      );
    }
    if (input.includes('shoping') || input.includes('shopping')) {
      return (
        <>
          You can buy farming components from the <Link to="/shopping" className="chat-link">Online Shopping</Link> section.
        </>
      );
    }
    return 'I’m not sure about that. Try asking about weather, crops, loans, or farming techniques.';
  };

  return (
    <main className="p-5">
      <section id="chat-container" className="chat-container">
        <div id="chatbox" className="chatbox">
          {messages.map((msg, index) => (
            <p key={index} className={`chat-message ${msg.sender}`}>
              <span className="sender">{msg.sender === 'user' ? 'You' : 'Bot'}</span>: {msg.text}
            </p>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your question..."
            className="form-section"
          />
          <button onClick={sendMessage} className="cta-button">Send</button>
        </div>
      </section>
    </main>
  );
};

export default Chatbot;