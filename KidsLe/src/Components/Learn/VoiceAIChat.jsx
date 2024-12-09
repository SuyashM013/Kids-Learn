

// import OpenAI from "openai";
// const openai = new OpenAI();
// const completion = await openai.chat.completions.create({
//     model: "gpt-4o",
//     messages: [
//         {"role": "user", "content": "write a haiku about ai"}
//     ]
// });



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VoiceAssistant = () => {
//   const [transcript, setTranscript] = useState('');
//   const [response, setResponse] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);

//   useEffect(() => {
//     const SpeechRecognition = 
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (SpeechRecognition) {
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.lang = 'en-US';
//       recognitionInstance.continuous = false;
//       recognitionInstance.interimResults = false;

//       recognitionInstance.onresult = (event) => {
//         const speechToText = event.results[0][0].transcript;
//         setTranscript(speechToText);
//         fetchAIResponse(speechToText);
//       };

//       recognitionInstance.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setIsListening(false);
//         setResponse('Sorry, could not understand your question.');
//         speakResponse('Sorry, could not understand your question.');
//       };

//       recognitionInstance.onend = () => {
//         setIsListening(false);
//       };

//       setRecognition(recognitionInstance);
//     } else {
//       alert('Speech recognition is not supported in this browser.');
//     }
//   }, []);

//   const startListening = () => {
//     if (recognition) {
//       setIsListening(true);
//       setTranscript('');
//       setResponse('');
//       recognition.start();
//     }
//   };

//   const fetchAIResponse = async (question) => {
//     try {
//       const res = await axios.post(
//         'https://api.openai.com/v1/chat/completions',
//         {
//           model: "gpt-3.5-turbo",
//           messages: [
//             {
//               role: "system", 
//               content: "Provide concise, clear answers in 1-2 sentences."
//             },
//             {
//               role: "user", 
//               content: question
//             }
//           ],
//           max_tokens: 50,
//           temperature: 0.7
//         },
//         {
//           headers: {
//             'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       const aiResponse = res.data.choices[0]?.message?.content.trim();
//       setResponse(aiResponse || 'Sorry, I could not understand the question.');
//       speakResponse(aiResponse || 'Sorry, I could not understand the question.');
//     } catch (error) {
//       console.error('Error fetching AI response:', error);
//       setResponse('Sorry, something went wrong.');
//       speakResponse('Sorry, something went wrong.');
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
//       <h1 className="text-3xl font-bold text-purple mb-4">Voice Assistant</h1>
//       <button
//         onClick={startListening}
//         className={`px-6 py-3 rounded-lg text-white text-lg font-semibold transition-all duration-200 ${
//           isListening ? 'bg-red-500' : 'bg-green-500 hover:bg-green-600'
//         }`}
//       >
//         {isListening ? 'Listening...' : 'Tap to Speak'}
//       </button>
//       <p className="mt-4 text-xl text-gray-700">Your Question: {transcript}</p>
//       <p className="mt-4 text-xl text-green-600 font-medium">Answer: {response}</p>
//     </div>
//   );
// };


// export default VoiceAssistant;

import "regenerator-runtime/runtime"
import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import "regzenerator-runtime";

function VoiceAIChat() {

  const { listening, trascript } = useSpeechRecognition()

  return (
    <div className="mt-20 bg-re h-96 text-center">

      {
        listening ? (
          <p> Go Ahead  I'm listening</p>
        ) : (
          <p>Tap the microphone to ask me anything</p>
        )}


      <button className="bg-yello p-3 m-3 " onClick={() => {
        SpeechRecognition.startListening()
      }}> Ask Me anything</button>

      {console.log(trascript)}
      {trascript && <p>{trascript}</p>}

      




    </div>
  )
}

export default VoiceAIChat

