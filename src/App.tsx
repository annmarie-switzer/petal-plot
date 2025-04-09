import { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router';
import { Layout } from './Layout';
import { NewPlotPage } from './NewPlotPage';
import { PlotProvider, usePlots } from './PlotContext';
import { PlotPage } from './PlotPage';

const RouteValidator = () => {
  const { id } = useParams();
  const { plots } = usePlots();
  const location = useLocation();

  // Track valid routes
  useEffect(() => {
    if (plots[id!]) {
      localStorage.setItem('lastValidRoute', location.pathname);
    }
  }, [location.pathname, plots, id]);

  // If this is a valid plot, render the PlotPage
  if (id && plots[id]) {
    return <PlotPage />;
  }

  // Otherwise, redirect to last valid route or /new
  const lastValidRoute = localStorage.getItem('lastValidRoute') || '/new';
  return <Navigate to={lastValidRoute} replace />;
};

export const App = () => {
  return (
    <BrowserRouter>
      <PlotProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/new" element={<NewPlotPage />} />
            <Route path=":id" element={<RouteValidator />} />
            <Route path="*" element={<RouteValidator />} />
          </Route>
        </Routes>
      </PlotProvider>
    </BrowserRouter>
  );
};
