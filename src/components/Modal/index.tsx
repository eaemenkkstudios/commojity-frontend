import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-dragdata';

import Button from 'components/Button';

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
} from './styles';

export interface IModalRef {
  show: (modalTitle: string) => void;
  hide: () => void;
}

const Modal = forwardRef<IModalRef>((_, ref) => {
  const theme = useContext(ThemeContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [points, setPoints] = useState([
    {
      label: 'Jan',
      value: 1,
    },
    {
      label: 'Fev',
      value: 15,
    },
    {
      label: 'Mar',
      value: 3,
    },
    {
      label: 'Abr',
      value: 0.6,
    },
    {
      label: 'Mai',
      value: 25,
    },
    {
      label: 'Jun',
      value: 6,
    },
    {
      label: 'Jul',
      value: 2,
    },
    {
      label: 'Ago',
      value: 1,
    },
    {
      label: 'Set',
      value: 10,
    },
    {
      label: 'Out',
      value: 0,
    },
    {
      label: 'Nov',
      value: 13,
    },
    {
      label: 'Dez',
      value: 1,
    },
  ]);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [title, setTitle] = useState('');

  const handleOpen = useCallback((modalTitle: string) => {
    setIsModalVisible(true);
    setTitle(modalTitle);
  }, []);

  const handleClose = useCallback(() => setIsModalVisible(false), []);

  useLayoutEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref({
          show: (modalTitle: string) => handleOpen(modalTitle),
          hide: () => handleClose(),
        });
      } else {
        ref.current = {
          show: (modalTitle: string) => handleOpen(modalTitle),
          hide: () => handleClose(),
        };
      }
    }
  }, [ref, handleOpen, handleClose]);

  useEffect(() => {
    const pointValues = points.map(point => point.value);
    setMax(Math.max(...pointValues) + 5);
    setMin(Math.min(...pointValues) - 5);
  }, [points]);

  if (!isModalVisible) return null;

  return (
    <>
      <Backdrop onClick={handleClose} />
      <Container>
        <Header>
          <Title>{title}</Title>
          <ButtonsContainer>
            <Button color={theme.purple} margin="0 10px" invert noPadding>
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
              onChange={e => setMax(Number(e.target.value))}
            />
            <Label style={{ marginTop: 5 }}>Mínimo</Label>
            <Input
              type="number"
              value={min}
              onChange={e => setMin(Number(e.target.value))}
            />
            <Button color={theme.purple} margin="5px 0 0 0" noPadding>
              Aleatorizar
            </Button>
          </InputsContainer>
          <GraphContainer>
            <Label>Flutuação de preço</Label>
            <Line
              title="Flutuação de preço"
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
                      e.target.style.cursor = 'pointer';
                      const newPoints = [...points];
                      newPoints[index].value = value;
                      setPoints(newPoints);
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

export default Modal;
