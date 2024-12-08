

// import React, { useState } from 'react';
// import axios from 'axios';

// const VoiceAssistant = () => {
//   const [transcript, setTranscript] = useState('');
//   const [response, setResponse] = useState('');
//   const [isListening, setIsListening] = useState(false);

//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();
//   recognition.lang = 'en-US';

//   const startListening = () => {
//     setIsListening(true);
//     recognition.start();

//     recognition.onresult = (event) => {
//       const speechToText = event.results[0][0].transcript;
//       setTranscript(speechToText);
//       fetchAIResponse(speechToText);
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };
//   };

  
//   const fetchAIResponse = async (question) => {
//     try {
//       const res = await axios.post(
//         'https://api.openai.com/v1/completions',
//         {
//           model: 'text-davinci-003',
//           prompt: `Answer this for a child: ${question}`,
//           max_tokens: 50,
//         },
//         {
//           headers: {
//             Authorization: `Bearer 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`,
//           },
//         }
//       );

//       const aiResponse = res.data.choices[0]?.text.trim();
//       setResponse(aiResponse || 'Sorry, I could not understand the question.');
//       speakResponse(aiResponse || 'Sorry, I could not understand the question.');
//     } catch (error) {
//       console.error('Error fetching AI response:', error);
//       setResponse('Sorry, something went wrong.');
//       speakResponse('Gand marao');
//     }
//   };

//   const speakResponse = (text) => {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'en-US';
//     synth.speak(utterance);
//   };

//   return (
//     <div className="min-h-screen bg-sky flex flex-col items-center justify-center p-4">
//       <h1 className="text-3xl font-bold text-purpl mb-4">Ask Me Anything!</h1>
//       <button
//         onClick={startListening}
//         className={`px-6 py-3 rounded-lg text-white text-lg font-semibold transition-all duration-2000 ${
//           isListening ? 'bg-re' : 'bg-gree hover:bg-gree/60'
//         }`}
//       >
//         {isListening ? 'Listening...' : 'Tap to Speak'}
//       </button>
//       <p className="mt-4 text-xl text-try">Your Question: {transcript}</p>
//       <p className="mt-4 text-xl text-gree font-medium">AI Answer: {response}</p>
//     </div>
//   );
// };

// export default VoiceAssistant;


// import OpenAI from "openai";
// const openai = new OpenAI();
// const completion = await openai.chat.completions.create({
//     model: "gpt-4o",
//     messages: [
//         {"role": "user", "content": "write a haiku about ai"}
//     ]
// });



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VoiceAssistant = () => {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = 
      window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = 'en-US';
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;

      recognitionInstance.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript(speechToText);
        fetchAIResponse(speechToText);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setResponse('Sorry, could not understand your question.');
        speakResponse('Sorry, could not understand your question.');
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      setTranscript('');
      setResponse('');
      recognition.start();
    }
  };

  const fetchAIResponse = async (question) => {
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system", 
              content: "Provide concise, clear answers in 1-2 sentences."
            },
            {
              role: "user", 
              content: question
            }
          ],
          max_tokens: 50,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = res.data.choices[0]?.message?.content.trim();
      setResponse(aiResponse || 'Sorry, I could not understand the question.');
      speakResponse(aiResponse || 'Sorry, I could not understand the question.');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('Sorry, something went wrong.');
      speakResponse('Sorry, something went wrong.');
    }
  };

  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-sky flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-purple mb-4">Voice Assistant</h1>
      <button
        onClick={startListening}
        className={`px-6 py-3 rounded-lg text-white text-lg font-semibold transition-all duration-200 ${
          isListening ? 'bg-red-500' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isListening ? 'Listening...' : 'Tap to Speak'}
      </button>
      <p className="mt-4 text-xl text-gray-700">Your Question: {transcript}</p>
      <p className="mt-4 text-xl text-green-600 font-medium">Answer: {response}</p>
    </div>
  );
};

export default VoiceAssistant;