
import React, { useState, useEffect } from 'react';

const TypingDiv = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
    const fullText =`
Powered by velocity 402 Auth
  `;
  const typingSpeed = isDeleting ? 50 : 150; // Faster when deleting

  useEffect(() => {
    const handleTyping = () => {
      const currentText = isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1);

      setText(currentText);

      // Determine when to switch modes
      if (!isDeleting && currentText === fullText) {
        // Pause at the end of the sentence
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1); // Increment loop count
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <div style={{
      fontSize: '1.25rem', // Medium font
      fontFamily: 'arial',
      borderRight: '3px solid orange',
      paddingRight: '5px',
      display: 'inline-block',
      color:'white'
    }}>
      {text}
    </div>
  );
};

export default TypingDiv;