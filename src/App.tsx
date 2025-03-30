import { useState } from 'react';
import perennials from './data/perennials.json';
import { Plant } from './types';
import { ThemeToggle } from './components/ThemeToggle';
import { Plot } from './components/Plot';
import { Drawer } from './components/Drawer/Drawer';

function App() {
  const PLANTS = perennials as Plant[];

  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(PLANTS);

  // A plant needs to be assigned to a set of selected squares
  // The plot is all of the plant-squareSelection pairs.
  const [plot, setPlot] = useState<Record<number, Plant>>({});

  // const searchPlants = (query: string) => {
  //   const term = query.toLowerCase().trim();

  //   const filteredPlants: Plant[] = PLANTS.filter((perennial) =>
  //     perennial.name.toLowerCase().includes(term)
  //   );

  //   setFilteredPlants(filteredPlants);
  // };

  // const assignPlant = (plant: Plant) => {
  //   setPlot((prev) => {
  //     const newPlot = { ...prev };

  //     selectedSquares.forEach((square) => {
  //       newPlot[square] = plant;
  //     });

  //     return newPlot;
  //   });

  //   setSelectedSquares(new Set());
  // };

  return (
    <>
      <div className="header">
        <h1>Petal Plot</h1>
        <ThemeToggle />
      </div>
      <Plot />
      <Drawer />
      {/* <div className="drawer">
        <input type="text" onChange={(e) => searchPlants(e.target.value)} />
        <div className="plant-list">
          {filteredPlants.map((plant) => (
            <button key={plant.name} onClick={() => assignPlant(plant)}>
              {plant.name}
            </button>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default App;
