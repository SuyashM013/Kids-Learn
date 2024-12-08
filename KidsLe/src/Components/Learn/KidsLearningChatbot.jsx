


import React, { useState, useRef, useEffect } from 'react';
import { Send, X, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import "../custom-scrollbar.css"; // Import the custom scrollbar CSS
import { FaAward } from "react-icons/fa6";


import A from '@/assets/Video-project/Alphabets/A.mp4'
import B from '@/assets/Video-project/Alphabets/B.mp4'
import C from '@/assets/Video-project/Alphabets/C.mp4'
import D from '@/assets/Video-project/Alphabets/D.mp4'
import E from '@/assets/Video-project/Alphabets/E.mp4'
import F from '@/assets/Video-project/Alphabets/F.mp4'
import G from '@/assets/Video-project/Alphabets/G.mp4'
import H from '@/assets/Video-project/Alphabets/H.mp4'
import I from '@/assets/Video-project/Alphabets/I.mp4'
// import J from '@/assets/Video-project/Alphabets/J.mp4'
import K from '@/assets/Video-project/Alphabets/K.mp4'
import L from '@/assets/Video-project/Alphabets/L.mp4'
import M from '@/assets/Video-project/Alphabets/M.mp4'
import N from '@/assets/Video-project/Alphabets/N.mp4'
import O from '@/assets/Video-project/Alphabets/O.mp4'
import P from '@/assets/Video-project/Alphabets/P.mp4'
import Q from '@/assets/Video-project/Alphabets/Q.mp4'
import R from '@/assets/Video-project/Alphabets/R.mp4'
import S from '@/assets/Video-project/Alphabets/S.mp4'
import T from '@/assets/Video-project/Alphabets/T.mp4'
// import U from '@/assets/Video-project/Alphabets/U.mp4'
// import V from '@/assets/Video-project/Alphabets/V.mp4'
// import W from '@/assets/Video-project/Alphabets/W.mp4'
// import X1 from '@/assets/Video-project/Alphabets/X.mp4'
// import Y from '@/assets/Video-project/Alphabets/Y.mp4'
// import Z from '@/assets/Video-project/Alphabets/Z.mp4'


const learningContent = {
  alphabets: [
    { letter: 'A', word: 'Apple', videoUrl: A },
    { letter: 'B', word: 'Ball', videoUrl: B },
    { letter: 'C', word: 'Cat', videoUrl:  C },
    { letter: 'D', word: 'Cat', videoUrl:  D },
    { letter: 'E', word: 'Cat', videoUrl:  E },
    { letter: 'F', word: 'Cat', videoUrl:  F},
    { letter: 'G', word: 'Cat', videoUrl:  G },
    { letter: 'H', word: 'Cat', videoUrl: H  },
    { letter: 'I', word: 'Cat', videoUrl: I  },
    // { letter: 'J', word: 'Cat', videoUrl:  J },
    { letter: 'K', word: 'Cat', videoUrl: K  },
    { letter: 'L', word: 'Cat', videoUrl: L  },
    { letter: 'M', word: 'Cat', videoUrl: M  },
    { letter: 'N', word: 'Cat', videoUrl: N  },
    { letter: 'O', word: 'Cat', videoUrl: O  },
    { letter: 'P', word: 'Cat', videoUrl: P  },
    { letter: 'Q', word: 'Cat', videoUrl: Q  },
    { letter: 'R', word: 'Cat', videoUrl: R  },
    { letter: 'S', word: 'Cat', videoUrl: S  },
    { letter: 'T', word: 'Cat', videoUrl: T  }
    // { letter: 'U', word: 'Cat', videoUrl: U  },
    // { letter: 'V', word: 'Cat', videoUrl: V  },
    // { letter: 'W', word: 'Cat', videoUrl: W  },
    // { letter: 'X', word: 'Cat', videoUrl: X1  },
    // { letter: 'Y', word: 'Cat', videoUrl: Y  },
    // { letter: 'Z', word: 'Cat', videoUrl: Z  },
  ],

  numbers: [
    { number: '1', word: 'One', videoUrl: '/videos/number-one.mp4' },
    { number: '2', word: 'Two', videoUrl: '/videos/number-two.mp4' },
    { number: '3', word: 'Three', videoUrl: '/videos/number-three.mp4' }
  ]
};

const KidsLearningChatbot = () => {

  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your learning buddy. Would you like to learn alphabets or numbers?", sender: 'bot' }
  ]);
  const [mode, setMode] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learningCompleted, setLearningCompleted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const handleUserInput = (input) => {
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    if (learningCompleted) {
      setMode(null);
      setLearningCompleted(false);
      setMessages([
        { text: "Hi there! I'm your learning buddy. Would you like to learn alphabets or numbers?", sender: 'bot' }
      ]);
      return;
    }

    if (!mode) {
      if (input.toLowerCase().includes('alphabet')) {
        setMode('alphabets');
        addMessage("Great! Let's learn alphabets. I'll show you a letter, its word, and a fun video!", 'bot');
        setCurrentLesson(learningContent.alphabets[0]);
        setCurrentIndex(0);
        addMessage(`Let's start with the letter A! A is for Apple.`, 'bot');
      } else if (input.toLowerCase().includes('number')) {
        setMode('numbers');
        addMessage("Awesome! Let's learn numbers. I'll help you count and show fun videos!", 'bot');
        setCurrentLesson(learningContent.numbers[0]);
        setCurrentIndex(0);
        addMessage(`We'll begin with the number 1! One is a special number.`, 'bot');
      } else {
        addMessage("Sorry, I didn't understand. Please say 'alphabets' or 'numbers'.", 'bot');
      }
    }
  };

  const handleNextLesson = () => {
    const currentContent = learningContent[mode];
    if (currentIndex < currentContent.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentLesson(currentContent[nextIndex]);
      addMessage(`Next up: ${mode === 'alphabets' ? 'Letter ' : 'Number '}${currentContent[nextIndex].letter || currentContent[nextIndex].number}!`, 'bot');
    } else {
      setLearningCompleted(true);
      addMessage(`Congratulations! You've completed all ${mode} lessons!`, 'bot');
      addMessage("Thank you for learning with me today! You're amazing!", 'bot');
    }
  };

  const handlePreviousLesson = () => {
    const currentContent = learningContent[mode];
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentLesson(currentContent[prevIndex]);
      addMessage(`Back to: ${mode === 'alphabets' ? 'Letter ' : 'Number '}${currentContent[prevIndex].letter || currentContent[prevIndex].number}!`, 'bot');
    }
  };

  const handleEndLearning = () => {
    setMode(null);
    setCurrentLesson(null);
    setCurrentIndex(0);
    setLearningCompleted(false);
    setMessages([
      { text: "Hi there! I'm your learning buddy. Would you like to learn alphabets or numbers?", sender: 'bot' }
    ]);
  };

  return (
    <div className=" mx-auto flex items-center flex-col min-h-screen gap-5 p-4">
      <div className="flex flex-col h-96  bg-sky/50  p-4">

        {/* Add custom-scrollbar class */}
        <div className="flex-grow overflow-y-scroll custom-scrollbar mb-4 bg-whit/60 rounded-lg p-4 shadow-xl   ">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg max-w-[80%] 
              ${msg.sender === "bot"
                  ? "bg-orang/70 self-start"
                  : "bg-gree/70 self-end ml-auto"}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {learningCompleted ? (
        <div className="mb-4 text-center">
          <video
            src="/videos/thank-you.mp4"
            // controls
            preload='auto'
            autoPlay
            className="mx-auto max-w-xs rounded-lg"
          />
          <div className="mt-2 text-2xl font-bold flex items-center justify-center">
            <FaAward className="mr-2 text-yello bg-re rounded-full" size={34} />
            Learning Complete! Great Job!
            <FaAward className="ml-2 text-yello bg-re rounded-full" size={34} />
          </div>
        </div>
      ) : currentLesson && mode && (
        <div className="mb-4 text-center w-auto">
          <div className="flex  justify-center items-center space-x-4">
            <button
              onClick={handlePreviousLesson}
              disabled={currentIndex === 0}
              className="bg-blu/50 text-white p-4 rounded-lg disabled:opacity-50"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="text-center">
              <video
                src={currentLesson.videoUrl}
                controls
                autoPlay
                preload='auto'
                className="mx-auto max-w-lg rounded-lg"
              />
              <div className="mt-3 text-2xl font-bold">
                {mode === 'alphabets' ? `Letter: ${currentLesson.letter}` : `Number: ${currentLesson.number}`}
                <br />

                {`${mode === 'alphabets' ? 'Word' : 'Representation'}: ${currentLesson.word}`}
              </div>
            </div>

            <button
              onClick={handleNextLesson}
              className="bg-blu/50 text-white p-4 rounded-lg disabled:opacity-50"
            >
              <ChevronRight size={28} />
            </button>

          </div>
        </div>
      )}

      <div className="flex w-full gap-2">
        <input
          type="text"
          placeholder="Type your message or request"
          className="flex-grow p-2 border rounded-l-lg shadow-md hover:shadow-xl"
          onKeyPress={(e) => e.key === 'Enter' && handleUserInput(e.target.value)}
        />
        <button
          className="bg-gree/90 text-white p-2 rounded-lg hover:shadow-xl"
          onClick={() => {
            const input = document.querySelector('input');
            handleUserInput(input.value);
            input.value = '';
          }}
        >
          <Send size={24} />
        </button>
        <button
          className="bg-re/80 text-white p-2 rounded-lg hover:shadow-xl"
          onClick={handleEndLearning}
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default KidsLearningChatbot;