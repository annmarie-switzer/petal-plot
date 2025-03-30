import { BrowserRouter, Route, Routes } from 'react-router';
import { Plot } from './components/Plot';
import { Drawer } from './components/Drawer/Drawer';
import { usePlots } from './PlotContext';

const Element = () => (
  <>
    <div className="header">
      <h1>Petal Plot</h1>
    </div>
    <Plot />
    <Drawer defaultPosition="left" />
  </>
);

export const PlotRouter = () => {
  const { plots } = usePlots();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Element />} />
        {Object.values(plots).map((plot) => (
          <Route path={`/${plot.id}`} element={<h1>{plot.id}</h1>} />
        ))}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
