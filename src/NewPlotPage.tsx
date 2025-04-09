import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePlots } from './PlotContext';

export const NewPlotPage = () => {
  const navigate = useNavigate();

  const { upsertPlot } = usePlots();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [plotName, setPlotName] = useState('');

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };

  return (
    <div>
      <h1>New Plot</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          upsertPlot({
            id: slugify(plotName),
            name: plotName,
            width: dimensions.width,
            height: dimensions.height,
            plants: {},
          });
          navigate(`/${slugify(plotName)}`);
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={plotName}
            onChange={(e) => setPlotName(e.target.value)}
          />
        </label>
        <label>
          Width:
          <input
            type="number"
            value={dimensions.width}
            onChange={(e) =>
              setDimensions({ ...dimensions, width: +e.target.value })
            }
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={dimensions.height}
            onChange={(e) =>
              setDimensions({ ...dimensions, height: +e.target.value })
            }
          />
        </label>
        <button type="submit">Create Plot</button>
      </form>
    </div>
  );
};
