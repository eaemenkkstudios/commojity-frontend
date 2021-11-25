import { forwardRef, useCallback, useLayoutEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-dragdata';

import { Button } from 'components/Button';

import { randomizeArray } from 'utils/random';

import { useTheme } from 'hooks/useTheme';
import { IDatasets, IDataset, useDatasets } from 'hooks/useDatasets';

import {
  Container,
  Backdrop,
  Header,
  Body,
  Title,
  Label,
  Input,
  InputsContainer,
  GraphContainer,
  ButtonsContainer,
  Loader,
} from './styles';

export interface IModalRef {
  show: (modalTitle: string, modalKey: keyof IDatasets) => void;
  showError: (errorMsg: string) => void;
  showLoading: () => void;
  hide: () => void;
}

const Modal = forwardRef<IModalRef>((_, ref) => {
  const theme = useTheme();

  const { datasets, setDatasets } = useDatasets();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState<keyof IDatasets>('' as keyof IDatasets);
  const [points, setPoints] = useState<IDataset[]>([]);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [title, setTitle] = useState('');

  const handleOpen = useCallback(
    (modalTitle: string, modalKey: keyof IDatasets) => {
      setIsModalVisible(true);
      setKey(modalKey);
      setPoints(datasets[modalKey].data);
      setMax(datasets[modalKey].max);
      setMin(datasets[modalKey].min);
      setTitle(modalTitle);
    },
    [datasets],
  );

  const handleOpenError = useCallback((errorMsg: string) => {
    setIsModalVisible(true);
    setError(errorMsg);
  }, []);

  const handleOpenLoading = useCallback(() => {
    setIsModalVisible(true);
    setLoading(true);
  }, []);

  const handleClose = useCallback(() => {
    setError('');
    setTitle('');
    setLoading(false);
    setIsModalVisible(false);
  }, []);

  useLayoutEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref({
          show: (modalTitle: string, modalKey: keyof IDatasets) =>
            handleOpen(modalTitle, modalKey),
          showError: (errorMsg: string) => handleOpenError(errorMsg),
          showLoading: () => handleOpenLoading(),
          hide: () => handleClose(),
        });
      } else {
        ref.current = {
          show: (modalTitle: string, modalKey: keyof IDatasets) =>
            handleOpen(modalTitle, modalKey),
          showError: (errorMsg: string) => handleOpenError(errorMsg),
          showLoading: () => handleOpenLoading(),
          hide: () => handleClose(),
        };
      }
    }
  }, [ref, handleOpen, handleClose]);

  const randomize = useCallback(
    () => setPoints(prevPoints => randomizeArray(prevPoints, min, max)),
    [max, min],
  );

  const handleSave = useCallback(() => {
    setDatasets({
      ...datasets,
      [key]: {
        min,
        max,
        data: points,
      },
    });
    handleClose();
  }, [min, max, points]);

  if (!isModalVisible) return null;

  if (loading)
    return (
      <>
        <Backdrop />
        <Container style={{ background: 'transparent' }}>
          <Loader />
        </Container>
      </>
    );

  if (error)
    return (
      <>
        <Backdrop onClick={handleClose} />
        <Container>
          <Title style={{ marginBottom: 8 }}>Oops...</Title>
          <Label style={{ marginBottom: 32 }}>{error}</Label>
          <Button
            style={{ width: 'auto' }}
            onClick={handleClose}
            color={theme.purple}
            noPadding
          >
            Ok
          </Button>
        </Container>
      </>
    );

  return (
    <>
      <Backdrop onClick={handleClose} />
      <Container>
        <Header>
          <Title>{title}</Title>
          <ButtonsContainer>
            <Button
              onClick={handleSave}
              color={theme.purple}
              margin="0 10px"
              invert
              noPadding
            >
              Salvar
            </Button>
            <Button onClick={handleClose} color={theme.purple} noPadding>
              Cancelar
            </Button>
          </ButtonsContainer>
        </Header>
        <Body>
          <InputsContainer>
            <Label>Máximo</Label>
            <Input
              type="number"
              value={max}
              onChange={e =>
                !datasets[key].noRangeUpdate && setMax(Number(e.target.value))
              }
              disabled={datasets[key].noRangeUpdate}
            />
            <Label style={{ marginTop: 5 }}>Mínimo</Label>
            <Input
              type="number"
              value={min}
              onChange={e =>
                !datasets[key].noRangeUpdate && setMin(Number(e.target.value))
              }
              disabled={datasets[key].noRangeUpdate}
              min="0"
            />
            <Button
              color={theme.purple}
              margin="5px 0 0 0"
              noPadding
              onClick={randomize}
            >
              Aleatorizar
            </Button>
          </InputsContainer>
          <GraphContainer>
            <Label>
              {datasets[key].noRangeUpdate
                ? 'Flutuação de chance'
                : 'Flutuação de preço'}
            </Label>
            <Line
              title={
                datasets[key].noRangeUpdate
                  ? 'Flutuação de chance'
                  : 'Flutuação de preço'
              }
              data={{
                labels: points.map(point => point.label),
                datasets: [
                  {
                    data: points.map(point => point.value),
                    borderColor: theme.purple,
                    tension: 0.4,
                    pointBackgroundColor: theme.purple,
                    pointRadius: 5,
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    min,
                    max,
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  // @ts-ignore
                  tooltips: {
                    callbacks: {
                      label: (tooltipItem: any) => tooltipItem.yLabel,
                    },
                  },
                  // @ts-ignore
                  dragData: {
                    round: 1,
                    showTooltip: true,
                    onDrag(
                      e: any,
                      _datasetIndex: number,
                      _index: number,
                      _value: number,
                    ) {
                      e.target.style.cursor = 'grabbing';
                    },
                    onDragEnd(
                      e: any,
                      _datasetIndex: number,
                      index: number,
                      value: number,
                    ) {
                      e.target.style.cursor = 'default';
                      setPoints(prevPoints => {
                        const newPoints = [...prevPoints];
                        newPoints[index].value = value;
                        return newPoints;
                      });
                    },
                  },
                },
              }}
            />
          </GraphContainer>
        </Body>
      </Container>
    </>
  );
});

export { Modal };
