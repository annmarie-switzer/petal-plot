import { Cross2Icon } from '@radix-ui/react-icons';
import { NavLink, Outlet } from 'react-router';
import { ThemeToggle } from './components/ThemeToggle';
import { usePlots } from './PlotContext';

export const Layout = () => {
  const { plots, deletePlot } = usePlots();

  return (
    <>
      <div id="navbar">
        <h1>Petal Plot</h1>
        <nav>
          {Object.entries(plots).map(([id, plot]) => (
            <NavLink to={`/${id}`} title={plot.name} key={id}>
              <span>{plot.name}</span>
              <button onClick={() => deletePlot(id)}>
                <Cross2Icon />
              </button>
            </NavLink>
          ))}
          <NavLink to={`/new`}>New Plot</NavLink>
        </nav>
        <ThemeToggle />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};
