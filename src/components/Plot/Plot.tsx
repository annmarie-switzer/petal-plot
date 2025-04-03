import { useState } from 'react';
import './Plot.css';

export const Plot = () => {
  const DIMENSIONS = {
    width: 32,
    height: 8,
  };

  const CELL_SIZE = 20; // Size of each square in pixels
  const GRID_GAP = 1; // Gap between squares in pixels

  const width = DIMENSIONS.width * 2;
  const height = DIMENSIONS.height * 2;

  const svgWidth = width * (CELL_SIZE + GRID_GAP);
  const svgHeight = height * (CELL_SIZE + GRID_GAP);

  const squares = Array.from({ length: width * height }, (_, i) => i);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedSquares, setSelectedSquares] = useState<Set<number>>(
    new Set()
  );

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

  const getSquareCoordinates = (index: number) => {
    const x = (index % width) * (CELL_SIZE + GRID_GAP);
    const y = Math.floor(index / width) * (CELL_SIZE + GRID_GAP);
    return { x, y };
  };

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      onMouseUp={() => setIsDragging(false)}
      className="grid"
    >
      {squares.map((square) => {
        const { x, y } = getSquareCoordinates(square);
        return (
          <rect
            key={square}
            x={x}
            y={y}
            width={CELL_SIZE}
            height={CELL_SIZE}
            className={
              selectedSquares.has(square) ? 'square selected' : 'square'
            }
            // style={{
            //   fill: plot[square]?.color,
            // }}
            onClick={(e) => handleSquareClick(square, e.shiftKey)}
            onMouseDown={(e) => setIsDragging(e.shiftKey)}
            onMouseMove={(e) => handleMouseMove(square, e.shiftKey)}
          />
        );
      })}
    </svg>
  );
};
