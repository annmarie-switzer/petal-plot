/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { Plot } from './types';

type PlotRecord = Record<string, Plot>;

type PlotContextType = {
  plots: PlotRecord;
  getPlot: (plotId: string) => Plot | undefined;
  upsertPlot: (plot: Plot) => void;
  deletePlot: (plotId: string) => void;
};

const PlotContext = createContext<PlotContextType | null>(null);

export const PlotProvider = ({ children }: { children: React.ReactNode }) => {
  const [plots, setPlots] = useState<PlotRecord>(() => {
    const rawPlots = localStorage.getItem('plots');
    return rawPlots ? JSON.parse(rawPlots) : {};
  });

  const getPlot = (plotId: string) => plots[plotId];

  const upsertPlot = (newPlot: Plot) => {
    const newPlots = {
      ...plots,
      [newPlot.id]: newPlot,
    };

    setPlots(newPlots);
  };

  const deletePlot = (plotId: string) => {
    const newPlots = { ...plots };
    delete newPlots[plotId];
    setPlots(newPlots);
  };

  useEffect(() => {
    localStorage.setItem('plots', JSON.stringify(plots));
  }, [plots]);

  return (
    <PlotContext.Provider value={{ plots, getPlot, upsertPlot, deletePlot }}>
      {children}
    </PlotContext.Provider>
  );
};

export const usePlots = () => {
  const context = useContext(PlotContext);

  if (!context) {
    throw new Error('usePlots must be used within a PlotProvider');
  }

  return context;
};
