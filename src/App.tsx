import { CSSProperties, useState } from 'react';
import './App.css';

function App() {
  const DIMENSIONS = {
    width: 32,
    height: 8,
  };

  const width = DIMENSIONS.width * 2;
  const height = DIMENSIONS.height * 2;

  const squares = Array.from({ length: width * height }, (_, i) => i);

  const [selectedSquares, setSelectedSquares] = useState<Set<number>>(
    new Set()
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleSquareClick = (squareId: number, shiftKey: boolean) => {
    if (!shiftKey) {
      setSelectedSquares(new Set([squareId]));
    } else {
      setSelectedSquares((prev) => {
        const newSelection = new Set(prev);

        if (newSelection.has(squareId)) {
          newSelection.delete(squareId);
        } else {
          newSelection.add(squareId);
        }

        return newSelection;
      });
    }
  };

  const handleMouseMove = (squareId: number, shiftKey: boolean) => {
    if (isDragging && shiftKey) {
      setSelectedSquares((prev) => {
        const newSelection = new Set(prev);
        newSelection.add(squareId);
        return newSelection;
      });
    }
  };

  const style = {
    '--width': width,
    '--height': height,
  } as CSSProperties;

  return (
    <>
      <div
        style={style}
        className="grid"
        onMouseUp={() => setIsDragging(false)}
      >
        {squares.map((square) => (
          <div
            key={square}
            className={`${
              selectedSquares.has(square) ? 'square selected' : 'square'
            }`}
            onClick={(e) => handleSquareClick(square, e.shiftKey)}
            onMouseDown={(e) => setIsDragging(e.shiftKey)}
            onMouseMove={(e) => handleMouseMove(square, e.shiftKey)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
