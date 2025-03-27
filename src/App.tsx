import { useState } from 'react';
import perennials from './data/perennials.json';
import { Plant } from './types';
import './App.css';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const DIMENSIONS = {
    width: 32,
    height: 8,
  };

  const PLANTS = perennials as Plant[];

  const CELL_SIZE = 20; // Size of each square in pixels
  const GRID_GAP = 1; // Gap between squares in pixels

  const width = DIMENSIONS.width * 2;
  const height = DIMENSIONS.height * 2;

  const svgWidth = width * (CELL_SIZE + GRID_GAP);
  const svgHeight = height * (CELL_SIZE + GRID_GAP);

  const squares = Array.from({ length: width * height }, (_, i) => i);

  const [selectedSquares, setSelectedSquares] = useState<Set<number>>(
    new Set()
  );
  const [isDragging, setIsDragging] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(PLANTS);

  // A plant needs to be assigned to a set of selected squares
  // The plot is all of the plant-squareSelection pairs.
  const [plot, setPlot] = useState<Record<number, Plant>>({});

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

  const searchPlants = (query: string) => {
    const term = query.toLowerCase().trim();

    const filteredPlants: Plant[] = PLANTS.filter((perennial) =>
      perennial.name.toLowerCase().includes(term)
    );

    setFilteredPlants(filteredPlants);
  };

  const assignPlant = (plant: Plant) => {
    setPlot((prev) => {
      const newPlot = { ...prev };

      selectedSquares.forEach((square) => {
        newPlot[square] = plant;
      });

      return newPlot;
    });

    setSelectedSquares(new Set());
  };

  return (
    <>
      <h1>Petal Plot</h1>
      <ThemeToggle />
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
              style={{
                fill: plot[square]?.color,
              }}
              onClick={(e) => handleSquareClick(square, e.shiftKey)}
              onMouseDown={(e) => setIsDragging(e.shiftKey)}
              onMouseMove={(e) => handleMouseMove(square, e.shiftKey)}
            />
          );
        })}
      </svg>
      <div className="drawer">
        <pre>{JSON.stringify(plot, null, 2)}</pre>
        <input type="text" onChange={(e) => searchPlants(e.target.value)} />
        <div className="plant-list">
          {filteredPlants.map((plant) => (
            <button key={plant.name} onClick={() => assignPlant(plant)}>
              {plant.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
