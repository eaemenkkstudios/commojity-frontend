import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import { randomizeArray } from 'utils/random';

export interface IDataset {
  label: string;
  value: number;
}

export interface IData {
  min: number;
  max: number;
  noRangeUpdate?: boolean;
  data: IDataset[];
  stat: number;
}

export interface IDatasets {
  grains: IData;
  inputs: IData;
  maintenance: IData;
  harvest: IData;
  contracts: IData;
  transport: IData;
  route: IData;
  price: IData;
}

export const defaultArray: IDataset[] = [
  {
    label: 'Jan',
    value: 0,
  },
  {
    label: 'Fev',
    value: 0,
  },
  {
    label: 'Mar',
    value: 0,
  },
  {
    label: 'Abr',
    value: 0,
  },
  {
    label: 'Mai',
    value: 0,
  },
  {
    label: 'Jun',
    value: 0,
  },
  {
    label: 'Jul',
    value: 0,
  },
  {
    label: 'Ago',
    value: 0,
  },
  {
    label: 'Set',
    value: 0,
  },
  {
    label: 'Out',
    value: 0,
  },
  {
    label: 'Nov',
    value: 0,
  },
  {
    label: 'Dez',
    value: 0,
  },
];

// Context
export interface IDatasetsContextData {
  datasets: IDatasets;
  setDatasets: (datasets: IDatasets) => void;

  randomizeData: () => void;
}

// Context
export const DatasetsContext = createContext<IDatasetsContextData>(
  {} as IDatasetsContextData,
);

// Provider
export const DatasetsProvider: React.FC = ({ children }) => {
  // Context states
  const [datasets, setDatasets] = useState<IDatasets>({
    grains: { min: 100, max: 1000, data: [...defaultArray], stat: 0 },
    inputs: { min: 1, max: 10, data: [...defaultArray], stat: 0 },
    maintenance: { min: 10, max: 100, data: [...defaultArray], stat: 0 },
    harvest: {
      min: 0,
      max: 100,
      noRangeUpdate: true,
      data: [...defaultArray],
      stat: 0,
    },
    contracts: { min: 1, max: 5, data: [...defaultArray], stat: 0 },
    transport: { min: 1, max: 5, data: [...defaultArray], stat: 0 },
    route: {
      min: 0,
      max: 100,
      noRangeUpdate: true,
      data: [...defaultArray],
      stat: 0,
    },
    price: { min: 5, max: 20, data: [...defaultArray], stat: 0 },
  });

  const randomizeData = useCallback(() => {
    setDatasets(data => ({
      grains: {
        ...data.grains,
        data: randomizeArray(
          data.grains.data,
          data.grains.min,
          data.grains.max,
        ),
      },
      inputs: {
        ...data.inputs,
        data: randomizeArray(
          data.inputs.data,
          data.inputs.min,
          data.inputs.max,
        ),
      },
      maintenance: {
        ...data.maintenance,
        data: randomizeArray(
          data.maintenance.data,
          data.maintenance.min,
          data.maintenance.max,
        ),
      },
      harvest: {
        ...data.harvest,
        data: randomizeArray(
          data.harvest.data,
          data.harvest.min,
          data.harvest.max,
        ),
      },
      contracts: {
        ...data.contracts,
        data: randomizeArray(
          data.contracts.data,
          data.contracts.min,
          data.contracts.max,
        ),
      },
      transport: {
        ...data.transport,
        data: randomizeArray(
          data.transport.data,
          data.transport.min,
          data.transport.max,
        ),
      },
      route: {
        ...data.route,
        data: randomizeArray(data.route.data, data.route.min, data.route.max),
      },
      price: {
        ...data.price,
        data: randomizeArray(data.price.data, data.price.min, data.price.max),
      },
    }));
  }, []);

  useEffect(() => {
    randomizeData();
  }, [randomizeData]);

  return (
    <DatasetsContext.Provider
      value={{
        datasets,
        setDatasets,

        randomizeData,
      }}
    >
      {children}
    </DatasetsContext.Provider>
  );
};

// Hook
export function useDatasets(): IDatasetsContextData {
  // Get data from context
  const context = useContext(DatasetsContext);

  // If user is not using context provider (DEV purposes only)
  if (!context)
    throw new Error('useDatasets must be used within a DatasetsProvider');

  return context;
}
