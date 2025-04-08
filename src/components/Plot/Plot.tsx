import { useState } from 'react';
import './Plot.css';

const COLORS = [
  'var(--red-9)',
  'var(--orange-9)',
  'var(--amber-9)',
  'var(--grass-9)',
  'var(--blue-9)',
  'var(--violet-9)',
  'var(--pink-9)',
  'var(--white)',
];

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
  const [selectedSquares, setSelectedSquares] = useState<Map<number, string>>(
    new Map()
  );

  const handleSquareClick = (squareId: number, shiftKey: boolean) => {
    if (!shiftKey) {
      setSelectedSquares(
        new Map([[squareId, COLORS[Math.floor(Math.random() * COLORS.length)]]])
      );
    } else {
      setSelectedSquares((prev) => {
        const newSelection = new Map(prev);
        if (newSelection.has(squareId)) {
          newSelection.delete(squareId);
        } else {
          newSelection.set(
            squareId,
            COLORS[Math.floor(Math.random() * COLORS.length)]
          );
        }
        return newSelection;
      });
    }
  };

  const handleMouseMove = (squareId: number, shiftKey: boolean) => {
    if (isDragging && shiftKey) {
      setSelectedSquares((prev) => {
        const newSelection = new Map(prev);
        if (!newSelection.has(squareId)) {
          newSelection.set(
            squareId,
            COLORS[Math.floor(Math.random() * COLORS.length)]
          );
        }
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
            className="square"
            style={{ fill: selectedSquares.get(square) }}
            onClick={(e) => handleSquareClick(square, e.shiftKey)}
            onMouseDown={(e) => setIsDragging(e.shiftKey)}
            onMouseMove={(e) => handleMouseMove(square, e.shiftKey)}
          />
        );
      })}
    </svg>
  );
};
