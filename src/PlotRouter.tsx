import { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router';
import { Plot } from './components/Plot';
import { Drawer, DrawerPosition } from './components/Drawer/Drawer';
import { usePlots } from './PlotContext';

export const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/404') {
      localStorage.removeItem('lastRoute');
    } else {
      localStorage.setItem('lastRoute', location.pathname);
    }
  }, [location.pathname]);

  return null;
};

export const RedirectToValidRoute = () => {
  const { plots } = usePlots();
  const lastRoute = localStorage.getItem('lastRoute');

  if (lastRoute) {
    return <Navigate to={lastRoute} replace />;
  }

  const firstPlot = Object.values(plots)[0];

  if (firstPlot) {
    return <Navigate to={`/${firstPlot.id}`} replace />;
  }

  return <Navigate to="/new" replace />;
};

export const NewPlotPage = () => {
  return <h1>New Plot</h1>;
};

export const PlotPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPlot } = usePlots();

  const plot = getPlot(id!);

  if (!plot) return <Navigate to="/404" replace />;

  return (
    <>
      <h1>{plot.name}</h1>
      <Plot />
      <Drawer
        defaultPosition={
          (localStorage.getItem('drawerPosition') as DrawerPosition) || 'left'
        }
      />
    </>
  );
};

export const PlotRouter = () => {
  return (
    <BrowserRouter>
      <RouteTracker />
      <Routes>
        <Route index element={<RedirectToValidRoute />} />
        <Route path=":id" element={<PlotPage />} />
        <Route path="/new" element={<NewPlotPage />} />
        <Route path="/404" element={<h1>404</h1>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
