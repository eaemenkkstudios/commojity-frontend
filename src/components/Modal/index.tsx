import {
  forwardRef,
  useCallback,
  useContext,
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
  show: (id?: string) => void;
  hide: () => void;
}

const Modal = forwardRef<IModalRef>((_, ref) => {
  const theme = useContext(ThemeContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpen = useCallback(() => setIsModalVisible(true), []);

  const handleClose = useCallback(() => setIsModalVisible(false), []);

  useLayoutEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref({
          show: () => handleOpen(),
          hide: () => handleClose(),
        });
      } else {
        ref.current = {
          show: () => handleOpen(),
          hide: () => handleClose(),
        };
      }
    }
  }, [ref, handleOpen, handleClose]);

  if (!isModalVisible) return null;

  return (
    <>
      <Backdrop onClick={handleClose} />
      <Container>
        <Header>
          <Title>Insumos</Title>
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
            <Input />
            <Label style={{ marginTop: 5 }}>Mínimo</Label>
            <Input />
            <Button color={theme.purple} margin="5px 0 0 0" noPadding>
              Aleatorizar
            </Button>
          </InputsContainer>
          <GraphContainer>
            <Label>Flutuação de preço</Label>
            <Line
              title="Flutuação de preço"
              data={{
                labels: [
                  'Jan',
                  'Fev',
                  'Mar',
                  'Abr',
                  'Mai',
                  'Jun',
                  'Jul',
                  'Ago',
                  'Set',
                  'Out',
                  'Nov',
                  'Dez',
                ],
                datasets: [
                  {
                    data: [1, 2, 3, 4, 16, 6, 7, 8, 9, 10, 5, 0.1],
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
                    grid: {
                      display: false,
                    },
                  },
                },
                // @ts-ignore
                dragData: true,
                onDragStart(e: any) {
                  console.log(e);
                },
                onDrag(e: any, datasetIndex: any, index: any, value: any) {
                  console.log(datasetIndex, index, value);
                },
                onDragEnd(e: any, datasetIndex: any, index: any, value: any) {
                  console.log(datasetIndex, index, value);
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
