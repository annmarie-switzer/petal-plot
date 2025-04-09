import { useNavigate, useParams } from 'react-router';
import { Drawer, DrawerPosition } from './components/Drawer/Drawer';
import { Plot } from './components/Plot/Plot';
import { usePlots } from './PlotContext';

export const PlotPage = () => {
  const { id } = useParams();
  const { plots, deletePlot } = usePlots();
  const navigate = useNavigate();

  const handleDelete = () => {
    const plotIds = Object.keys(plots);
    const currentIndex = plotIds.indexOf(id!);

    // Delete the plot
    deletePlot(id!);

    // Navigate to the previous plot, or the next one if we're at the start
    if (plotIds.length > 1) {
      const targetIndex = Math.max(0, currentIndex - 1);
      navigate(`/${plotIds[targetIndex]}`, { replace: true });
    } else {
      // If this was the last plot
      navigate('/new', { replace: true });
    }
  };

  return (
    <>
      <Plot />
      <Drawer
        defaultPosition={
          (localStorage.getItem('drawerPosition') as DrawerPosition) || 'bottom'
        }
      />
    </>
  );
};
