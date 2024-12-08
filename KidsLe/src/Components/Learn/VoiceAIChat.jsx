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
//       fetchAIResponse(speechToText); // Send voice input to AI
//     };
//     recognition.onend = () => {
//       setIsListening(false);
//     };
//   };

//   const fetchAIResponse = async (question) => {
//     try {
//       const res = await axios.post('https://api.openai.com/v1/completions', {
//         prompt: `Answer this for a child: ${question}`,
//         model: 'text-davinci-003',
//         max_tokens: 50,
//       }, {
//         headers: {
//           Authorization: `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`,
//         },
//       });

//       const aiResponse = res.data.choices[0].text.trim();
//       setResponse(aiResponse);
//       speakResponse(aiResponse); // Speak out the AI response
//     } catch (error) {
//       console.error('Error fetching AI response:', error);
//     }
//   };

//   const speakResponse = (text) => {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'en-US';
//     synth.speak(utterance);
//   };

//   return (
//     <div className="min-h-screen bg-back  flex flex-col items-center justify-center p-4">
//       <h1 className="text-3xl font-bold text-purpl mb-4">Ask Me Anything!</h1>
//       <button
//         onClick={startListening}
//         className={`px-6 py-3 rounded-lg text-white text-lg font-semibold transition-all duration-200 ${
//           isListening ? 'bg-re' : 'bg-gree hover:bg-gree/50'
//         }`}
//       >
//         {isListening ? 'Listening...' : 'Tap to Speak'}
//       </button>
//       <p className="mt-4 text-xl text-gray-700">Your Question: {transcript}</p>
//       <p className="mt-4 text-xl text-green-600 font-medium">AI Answer: {response}</p>
//     </div>
//   );
// };

// export default VoiceAssistant;
import React, { useState } from 'react';
import axios from 'axios';

const VoiceAssistant = () => {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';

  const startListening = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      fetchAIResponse(speechToText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  
  const fetchAIResponse = async (question) => {
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: `Answer this for a child: ${question}`,
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      );

      const aiResponse = res.data.choices[0]?.text.trim();
      setResponse(aiResponse || 'Sorry, I could not understand the question.');
      speakResponse(aiResponse || 'Sorry, I could not understand the question.');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('Sorry, something went wrong.');
      speakResponse('Gand marao');
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
      <h1 className="text-3xl font-bold text-purpl mb-4">Ask Me Anything!</h1>
      <button
        onClick={startListening}
        className={`px-6 py-3 rounded-lg text-white text-lg font-semibold transition-all duration-2000 ${
          isListening ? 'bg-re' : 'bg-gree hover:bg-gree/60'
        }`}
      >
        {isListening ? 'Listening...' : 'Tap to Speak'}
      </button>
      <p className="mt-4 text-xl text-try">Your Question: {transcript}</p>
      <p className="mt-4 text-xl text-gree font-medium">AI Answer: {response}</p>
    </div>
  );
};

export default VoiceAssistant;
