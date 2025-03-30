import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PlotProvider } from './PlotContext.tsx';
import { PlotRouter } from './PlotRouter.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlotProvider>
      <PlotRouter />
    </PlotProvider>
  </StrictMode>
);
