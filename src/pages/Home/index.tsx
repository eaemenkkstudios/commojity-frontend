import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import { useTheme } from 'hooks/useTheme';
import { useThemeSwitch } from 'hooks/useThemeSwitch';
import { useDatasets, IDataset, defaultArray } from 'hooks/useDatasets';

import { Button } from 'components/Button';
import { Modal, IModalRef } from 'components/Modal';

import { api } from 'services/api';

import { base64ToEmoji, emojiToBase64, getKeyboardEmojis } from 'utils/emoji';
import { formatCurrency } from 'utils/currency';

import {
  Container,
  Content,
  Title,
  Card,
  Emoji,
  EmojiContent,
  ThemeButton,
  Label,
  GeneVisualization,
  GeneVisualizationContainer,
  TotalProfit,
  TotalProfitAmount,
  TotalProfitLabel,
  Input,
} from './styles';

const Home: React.FC = () => {
  const theme = useTheme();

  const { switchTheme, isDarkTheme } = useThemeSwitch();
  const { datasets, randomizeData } = useDatasets();

  const modalRef = useRef<IModalRef>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [emojiInput, setEmojiInput] = useState('🍕🍔🍟🌭🍿🧂🥓🥚');
  const [refresh, setRefresh] = useState(true);
  const [budget, setBudget] = useState(100000);
  const [profit, setProfit] = useState(0);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [points, setPoints] = useState<IDataset[]>([...defaultArray]);
  const [stats, setStats] = useState({
    contracts: 0,
    inputs: 0,
    maintenance: 0,
    transport: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getGenePerformance = useCallback(async () => {
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post<{
        fitness: number;
        months: number[];
        stats: {
          contracts: number;
          inputs: number;
          maintenance: number;
          transport: number;
        };
      }>('/fitness', {
        gene: emojiToBase64(emojiInput),
        scenario: {
          budget,
          grains: datasets.grains.data.map(valueArr => valueArr.value),
          inputs: datasets.inputs.data.map(valueArr => valueArr.value),
          maintenance: datasets.maintenance.data.map(
            valueArr => valueArr.value,
          ),
          harvest: datasets.harvest.data.map(valueArr => valueArr.value / 100),
          contracts: datasets.contracts.data.map(valueArr => valueArr.value),
          transport: datasets.transport.data.map(valueArr => valueArr.value),
          route: datasets.route.data.map(valueArr => valueArr.value / 100),
          price: datasets.price.data.map(valueArr => valueArr.value),
        },
      });
      console.log('FITNESS', data);
      setProfit(data.fitness);
      setPoints(prevPoints =>
        prevPoints.map((point, index) => ({
          ...point,
          value: data.months[index],
        })),
      );
      setStats(data.stats);
    } catch (err) {
      setError('Could not load gene fitness');
      console.log('ERR', err);
    }

    setLoading(false);
  }, [emojiInput, datasets, budget]);

  const getBestGene = useCallback(async () => {
    setError('');
    setLoading(true);
    setRefresh(false);

    try {
      const { data } = await api.post<{
        best: {
          gene: string;
          stats: {
            contracts: number;
            inputs: number;
            maintenance: number;
            transport: number;
          };
        };
        fitness: number;
        months: number[];
      }>('/process', {
        scenario: {
          budget,
          grains: datasets.grains.data.map(valueArr => valueArr.value),
          inputs: datasets.inputs.data.map(valueArr => valueArr.value),
          maintenance: datasets.maintenance.data.map(
            valueArr => valueArr.value,
          ),
          harvest: datasets.harvest.data.map(valueArr => valueArr.value / 100),
          contracts: datasets.contracts.data.map(valueArr => valueArr.value),
          transport: datasets.transport.data.map(valueArr => valueArr.value),
          route: datasets.route.data.map(valueArr => valueArr.value / 100),
          price: datasets.price.data.map(valueArr => valueArr.value),
        },
      });
      console.log('process', data);
      setEmojiInput(base64ToEmoji(data.best.gene));
      setProfit(data.fitness);
      setPoints(prevPoints =>
        prevPoints.map((point, index) => ({
          ...point,
          value: data.months[index],
        })),
      );
      setStats(data.best.stats);
    } catch (err) {
      setError('Could not get best gene data');
      console.log('ERR', err);
    }
    setLoading(false);
  }, [datasets, budget]);

  useEffect(() => {
    if (keyboardIsVisible) contentRef.current?.scrollIntoView();
  }, [keyboardIsVisible]);

  useEffect(() => {
    if (refresh) {
      const timer = setTimeout(() => getGenePerformance(), 700);
      return () => clearTimeout(timer);
    }
  }, [getGenePerformance, refresh]);

  useEffect(() => {
    if (loading) modalRef.current?.showLoading();
    else if (error) modalRef.current?.showError(error);
    else modalRef.current?.hide();
  }, [loading, error]);

  return (
    <Container>
      <Modal ref={modalRef} />
      <ThemeButton onClick={switchTheme}>
        {isDarkTheme ? '🌞' : '🌚'}
      </ThemeButton>
      <Content onClick={() => setKeyboardIsVisible(false)}>
        <Title>commojity</Title>
      </Content>
      <Content
        style={{ backgroundColor: theme.cards }}
        horizontal
        onClick={() => setKeyboardIsVisible(false)}
      >
        <EmojiContent>
          <Button onClick={() => modalRef.current?.show('Preço', 'price')}>
            $ Preço
          </Button>
          <Emoji>🏢</Emoji>
        </EmojiContent>
        <EmojiContent>
          <Button
            style={{ marginBottom: 48 }}
            onClick={() => modalRef.current?.show('Viagem', 'route')}
            arrow
          >
            ✈ Viagem
          </Button>
        </EmojiContent>
        <EmojiContent>
          <Button
            color={theme.green}
            overlayValue={Number((stats.contracts * 100).toFixed(2))}
            onClick={() => modalRef.current?.show('Contratos', 'contracts')}
          >
            📝 Contratos
          </Button>
          <Button
            color={theme.green}
            overlayValue={Number((stats.transport * 100).toFixed(2))}
            onClick={() => modalRef.current?.show('Transporte', 'transport')}
          >
            ⛟ Transporte
          </Button>
          <Emoji>🚚</Emoji>
        </EmojiContent>
        <EmojiContent>
          <Button
            style={{ marginBottom: 48 }}
            onClick={() => modalRef.current?.show('Colheita', 'harvest')}
            arrow
          >
            📦 Colheita
          </Button>
        </EmojiContent>
        <EmojiContent>
          <Button onClick={() => modalRef.current?.show('Grãos', 'grains')}>
            🌾 Grãos
          </Button>
          <Button
            color={theme.green}
            overlayValue={Number((stats.inputs * 100).toFixed(2))}
            onClick={() => modalRef.current?.show('Insumos', 'inputs')}
          >
            💧 Insumos
          </Button>
          <Button
            color={theme.green}
            overlayValue={Number((stats.maintenance * 100).toFixed(2))}
            onClick={() => modalRef.current?.show('Manutenção', 'maintenance')}
          >
            🚜 Manutenção
          </Button>
          <Emoji>🌱</Emoji>
        </EmojiContent>
      </Content>
      <Content
        horizontal
        style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
        ref={contentRef}
      >
        <Card style={{ flex: 0.3 }}>
          <Label>Visualização de gene</Label>
          <GeneVisualizationContainer
            onClick={() => setKeyboardIsVisible(v => !v)}
          >
            <GeneVisualization keyboardIsVisible={keyboardIsVisible}>
              {emojiInput}
            </GeneVisualization>
          </GeneVisualizationContainer>
        </Card>
        <Card style={{ flex: 0.2 }}>
          <Label>Lucro por mês</Label>
          <Line
            title="Lucro por mês"
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
                  min: Math.min(...points.map(point => point.value)) - 5,
                  max: Math.max(...points.map(point => point.value)) + 5,
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
              },
            }}
          />
        </Card>
        <Card style={{ flex: 0.2 }}>
          <Label>Montante (1 ano)</Label>
          <TotalProfit>
            <TotalProfitLabel>
              {formatCurrency(budget * -1, true)}
            </TotalProfitLabel>
            <TotalProfitLabel>
              {formatCurrency(profit + budget, true)}
            </TotalProfitLabel>
            <TotalProfitAmount>
              {formatCurrency(profit, true)}
            </TotalProfitAmount>
          </TotalProfit>
        </Card>
        <Card style={{ flex: 0.15 }}>
          <Label>Orçamento (1 ano)</Label>
          <Input
            type="number"
            min="0"
            value={budget}
            onChange={e => {
              setBudget(Number(e.target.value));
              setRefresh(true);
            }}
          />
          <Button invert noPadding onClick={getBestGene}>
            Iniciar
          </Button>
          <Button noPadding onClick={randomizeData}>
            Aleatorizar
          </Button>
        </Card>
      </Content>
      <Keyboard
        onChange={(input: any) => {
          setEmojiInput(input);
          setRefresh(true);
        }}
        layout={{ default: getKeyboardEmojis(32) }}
        theme={`hg-theme-default ${
          keyboardIsVisible ? 'keyboard' : 'hidden-keyboard'
        }`}
        display={{ '{bksp}': '⭠ apagar' }}
        disableButtonHold
        maxLength={16}
      />
    </Container>
  );
};

export { Home };
