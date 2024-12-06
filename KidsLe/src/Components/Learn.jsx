// import React, { useState, useEffect, useRef } from 'react';
// import { Send, X } from 'lucide-react';
// import { HiBadgeCheck } from "react-icons/hi";
// import { HiBan } from "react-icons/hi";


// const learningContent = {
//   alphabets: [
//     { letter: 'A', word: 'Apple', videoUrl: '/videos/a-apple.mp4' },
//     { letter: 'B', word: 'Ball', videoUrl: '/videos/b-ball.mp4' },
//     { letter: 'C', word: 'Cat', videoUrl: '/videos/c-cat.mp4' }
//   ],
//   numbers: [
//     { number: '1', word: 'One', videoUrl: '/videos/number-one.mp4' },
//     { number: '2', word: 'Two', videoUrl: '/videos/number-two.mp4' },
//     { number: '3', word: 'Three', videoUrl: '/videos/number-three.mp4' }
//   ]
// };

// const KidsLearningChatbot = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hi there! I'm your learning buddy. Would you like to learn alphabets or numbers?", sender: 'bot' }
//   ]);
//   const [mode, setMode] = useState(null);
//   const [currentLesson, setCurrentLesson] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [learningCompleted, setLearningCompleted] = useState(true);


//   const addMessage = (text, sender) => {
//     setMessages(prev => [...prev, { text, sender }]);
//   };

//   const handleUserInput = (input) => {
//     const userMessage = { text: input, sender: 'user' };
//     setMessages(prev => [...prev, userMessage]);


//     if (learningCompleted) {
//       setMode(null);
//       setLearningCompleted(false);
//       setMessages([
//         { text: "Hi there! I'm your learning buddy. Would you like to learn alphabets or numbers?", sender: 'bot' }
//       ]);
//       return;
//     }

//     // Error handling and specific input processing
//     if (!mode) {
//       if (input.toLowerCase().includes('alphabet')) {
//         setMode('alphabets');
//         addMessage("Great! Let's learn alphabets. I'll show you a letter, its word, and a fun video!", 'bot');
//         setCurrentLesson(learningContent.alphabets[0]);
//         setCurrentIndex(0);
//         addMessage(`Let's start with the letter A! A is for Apple.`, 'bot');
//       } else if (input.toLowerCase().includes('number')) {
//         setMode('numbers');
//         addMessage("Awesome! Let's learn numbers. I'll help you count and show fun videos!", 'bot');
//         setCurrentLesson(learningContent.numbers[0]);
//         setCurrentIndex(0);
//         addMessage(`We'll begin with the number 1! One is a special number.`, 'bot');
//       } else {
//         addMessage("Sorry, I didn't understand. Please say 'alphabets' or 'numbers'.", 'bot');
//       }
//     } else {
//       const currentContent = learningContent[mode];

//       if (input.toLowerCase().includes('next')) {
//         if (currentIndex < currentContent.length - 1) {
//           const nextIndex = currentIndex + 1;
//           setCurrentIndex(nextIndex);
//           setCurrentLesson(currentContent[nextIndex]);
//           addMessage(`Next up: ${mode === 'alphabets' ? 'Letter ' : 'Number '}${currentContent[nextIndex].letter || currentContent[nextIndex].number}!`, 'bot');
//         } else {
//           // Learning completed
//           setLearningCompleted(true);
//           addMessage(`Congratulations! You've completed all ${mode} lessons!`, 'bot');
//           addMessage("Thank you for learning with me today! You're amazing!", 'bot');
//         }
//       } else {
//         addMessage("I didn't understand that. Try saying 'next' or use the buttons.", 'bot');
//       }
//     }
//   };


//   const handleEndLearning = () => {
//     setMode(null);
//     setCurrentLesson(null);
//     setCurrentIndex(0);
//     setLearningCompleted(false);
//     setMessages([
//       { text: "Hi there! I'm your learning buddy. Would you like to learn alphabets or numbers?", sender: 'bot' }
//     ]);
//   };

//   return (
//     <>

//       <div className="p-4 pt-20 bg-sky/70 w-screen mx-auto flex flex-col items-center min-h-screen gap-5 ">
//         <div >

//           <h1 className="text-4xl font-bold rounded-xl animate-bounce bg-sky text-blu mb-4 p-5 shadow shadow-whit">Learning made Easy </h1>

//           <div className='flex flex-col gap-2'>
//             <h3 className='text-2xl mb-2'>Instructions - </h3>

//             <span className='flex gap-4 items-center'> <HiBadgeCheck /> <p> Enter ALPHABETS to learn alphabet</p> </span>

//             <span className='flex gap-4 items-center'> <HiBadgeCheck /> <p>Enter NUMBERS to learn number</p> </span>

//             <span className='flex gap-4 items-center'> <HiBadgeCheck /> <p>Enter NEXT to go to next object</p> </span>

//             <span className='flex gap-4 items-center'> <HiBan /> <p>Keywords other than this will be not responded</p></span>

//           </div>

//         </div>

// {/* chatbot function  */}

// <div className="flex flex-col h-screen bg-blue-50 p-4">
//       <div className="flex-grow overflow-y-auto mb-4 bg-white rounded-lg p-4 shadow-md">
//         {messages.map((msg, index) => (
//           <div 
//             key={index} 
//             className={`mb-2 p-2 rounded-lg max-w-[80%] 
//               ${msg.sender === 'bot' ? 'bg-blue-100 self-start' : 'bg-green-100 self-end ml-auto'}`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       {learningCompleted ? (
//         <div className="mb-4 text-center">
//           <video 
//             src="/videos/thank-you.mp4" 
//             controls 
//             autoPlay
//             className="mx-auto max-w-xs rounded-lg"
//           />
//           <div className="mt-2 text-2xl font-bold flex items-center justify-center">
//             <Award className="mr-2 text-yellow-500" size={32} />
//             Learning Complete! Great Job!
//             <Award className="ml-2 text-yellow-500" size={32} />
//           </div>
//         </div>
//       ) : currentLesson && (
//         <div className="mb-4 text-center">
//           <video 
//             src={currentLesson.videoUrl} 
//             controls 
//             className="mx-auto max-w-xs rounded-lg"
//           />
//           <div className="mt-2 text-2xl font-bold">
//             {mode === 'alphabets' ? `Letter: ${currentLesson.letter}` : `Number: ${currentLesson.number}`}
//             <br />
//             {`${mode === 'alphabets' ? 'Word' : 'Representation'}: ${currentLesson.word}`}
//           </div>
//         </div>
//       )}

//       <div className="flex gap-2">
//         <input 
//           type="text" 
//           placeholder="Type your message or request" 
//           className="flex-grow p-2 border rounded-l-lg"
//           onKeyPress={(e) => e.key === 'Enter' && handleUserInput(e.target.value)}
//         />
//         <button 
//           className="bg-blue-500 text-white p-2 rounded-lg"
//           onClick={() => {
//             const input = document.querySelector('input');
//             handleUserInput(input.value);
//             input.value = '';
//           }}
//         >
//           <Send size={24} />
//         </button>
//         <button 
//           className="bg-red-500 text-white p-2 rounded-lg"
//           onClick={handleEndLearning}
//         >
//           <X size={24} />
//         </button>
//       </div>
//     </div>

//       </div>


//     </>
//   );
// };

// export default KidsLearningChatbot;

import React from 'react'
import { HiBadgeCheck } from "react-icons/hi";
import { HiBan } from "react-icons/hi";
import KidsLearningChatbot from './Learn/KidsLearningChatbot';
import VoiceAIChat from './Learn/VoiceAIChat';



function Learn() {
  return (
    <>

      <div className=" pt-20 bg-sky/70 w-screen mx-auto flex flex-col  min-h-screen gap-10 lg:flex-row lg:justify-center ">


        <div className='p-2 flex flex-col mx-auto  items-start lg:pt-10'>

          <h1 className="text-4xl font-bold rounded-xl animate-bounce bg-sky text-blu mb-4 p-5 shadow shadow-whit">Learning made Easy </h1>

          <div className='flex flex-col gap-2'>
            <h3 className='text-2xl mb-2'>Instructions - </h3>

            <span className='flex gap-4 items-center'> <HiBadgeCheck /> <p> Enter ALPHABETS to learn alphabet</p> </span>

            <span className='flex gap-4 items-center'> <HiBadgeCheck /> <p>Enter NUMBERS to learn number</p> </span>
            <span className='flex gap-4 items-center'> <HiBadgeCheck /> <p>Enter NEXT to go to next object</p> </span>

            <span className='flex gap-4 items-center'> <HiBan /> <p>Keywords other than this will be not responded</p></span>

          </div>

          <VoiceAIChat />

       
        </div>

        <KidsLearningChatbot />

      </div>




    </>
  )
}

export default Learn
