import React, { useState } from 'react';

function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <img
        src="https://picsum.photos/300"
        alt="example image"
        onClick={handleClick}
      />
      {isExpanded && (
        <div className="expanded-image-container">
          <img
            src="https://picsum.photos/600"
            alt="expanded image"
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
}

export default App;