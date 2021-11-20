import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';
import { Line } from 'react-chartjs-2';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import { useThemeSwitch } from 'hooks/useThemeSwitch';

import Button from 'components/Button';
import Modal, { IModalRef } from 'components/Modal';

import api from 'services/api';

import { base64ToEmoji, emojiToBase64 } from 'utils/emoji';

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
  TotalProfit,
  TotalProfitAmount,
  TotalProfitLabel,
  Input,
} from './styles';

const Home: React.FC = () => {
  const theme = useContext(ThemeContext);

  const { switchTheme, isDarkTheme } = useThemeSwitch();

  const modalRef = useRef<IModalRef>(null);

  const [emojiInput, setEmojiInput] = useState('');
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [points, _setPoints] = useState([
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

  const getGene = useCallback(async () => {
    try {
      const { data } = await api.get('/23525');
      console.log('Data', data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // getGene();
    console.log('BASE64', emojiToBase64('🍕🍔🍟'));
    console.log('EMOJI', base64ToEmoji(emojiToBase64('🍕🍔🍟')));
  }, [getGene]);

  return (
    <Container>
      <Modal ref={modalRef} />
      <ThemeButton onClick={switchTheme}>
        {isDarkTheme ? '🌞' : '🌚'}
      </ThemeButton>
      <Content>
        <Title>commojity</Title>
      </Content>
      <Content style={{ backgroundColor: theme.cards }} horizontal>
        <EmojiContent>
          <Emoji>🏢</Emoji>
        </EmojiContent>
        <EmojiContent>
          <Button
            style={{ marginBottom: 48 }}
            onClick={() => modalRef.current?.show('Viagem')}
          >
            Viagem
          </Button>
        </EmojiContent>
        <EmojiContent>
          <Button
            color={theme.green}
            overlayValue={28}
            onClick={() => modalRef.current?.show('Contratos')}
          >
            Contratos
          </Button>
          <Button
            color={theme.green}
            overlayValue={21}
            onClick={() => modalRef.current?.show('Transporte')}
          >
            Transporte
          </Button>
          <Emoji>🚚</Emoji>
        </EmojiContent>
        <EmojiContent>
          <Button
            style={{ marginBottom: 48 }}
            onClick={() => modalRef.current?.show('Colheita')}
          >
            Colheita
          </Button>
        </EmojiContent>
        <EmojiContent>
          <Button onClick={() => modalRef.current?.show('Grãos')}>Grãos</Button>
          <Button
            color={theme.green}
            overlayValue={39}
            onClick={() => modalRef.current?.show('Insumos')}
          >
            Insumos
          </Button>
          <Button
            color={theme.green}
            overlayValue={12}
            onClick={() => modalRef.current?.show('Manutenção')}
          >
            Manutenção
          </Button>
          <Emoji>🌱</Emoji>
        </EmojiContent>
      </Content>
      <Content
        horizontal
        style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <Card style={{ flex: 0.3 }}>
          <Label>Visualização de gene</Label>
          <GeneVisualization onClick={() => setKeyboardIsVisible(v => !v)}>
            {emojiInput}
          </GeneVisualization>
        </Card>
        <Card style={{ flex: 0.3 }}>
          <Label>Lucro por mês</Label>
          <div>
            <Line
              title="Lucro por mês"
              data={{
                labels: [...points.map(point => point.label)],
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
                    min: Math.max(
                      Math.min(...points.map(point => point.value)) - 5,
                      0,
                    ),
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
          </div>
        </Card>
        <Card style={{ flex: 0.2 }}>
          <Label>Lucro total (1 ano)</Label>
          <TotalProfit>
            <TotalProfitLabel>$ 250.000</TotalProfitLabel>
            <TotalProfitLabel>-$ 120.000</TotalProfitLabel>
            <TotalProfitAmount>$130.000</TotalProfitAmount>
          </TotalProfit>
        </Card>
        <Card style={{ flex: 0.15 }}>
          <Label>Orçamento (1 ano)</Label>
          <Input type="number" min="0" />
          <Button invert noPadding>
            Iniciar
          </Button>
          <Button noPadding>Aleatorizar</Button>
        </Card>
      </Content>
      {keyboardIsVisible && (
        <Keyboard
          onChange={(input: any) => setEmojiInput(input)}
          layout={{
            default: [
              '🍕 🍔 🍟 🌭 🍿 🧂 🥓 🥚 🍳 🧇 🥞 🧈 🍞 {bksp}',
              '🥐 🥨 🥯 🥖 🫓 🧀 🥗 🥙 🥪 🌮 🌯 🫔 🥫 🍖 🍗 🥩',
              '🍠 🥟 🥠 🥡 🍱 🍘 🍙 🍚 🍛 🍜 🦪 🍣 🍤 🍥 🥮 🍢',
              '🧆 🥘 🍲 🫕 🍝 🥣 🥧 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🍫',
              '🍬 🍭 🍡 🎈 🎆 🎇 🧨 🎉 🎊 🎃 🎄 🎋 🎍 🎎 🎏 🎐',
              '🎑 🧧 🎀 🎁 🎫 🎠 🎡 🎢 🎪 🎭 🎨 🧵 🪡 🧶 🪢 🛒',
              '👓 🦺 🥽 🥼 🧥 👔 👕 👖 🩳 🧣 🧤 🧦 👗 🥻 👘 👚',
              '🩲 🩱 👙 👛 👜 👝 😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊',
              '😋 😎 😍 😘 🥰 😗 😙 🥲 😚 🙂 🤗 🤩 🤔 🤨 😐 😑',
              '😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 🥱 😴 😌 😛 😜 😝',
              '🤤 😒 😓 😔 😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢 😭 😦',
              '😧 😨 🐒 🦍 🦧 🐩 🐕 🐈 🐅 🐆 🐎 🦌 🦬 🦏 🦛 🐂',
              '🐃 🐄 🐖 🐏 🐑 🐐 🐪 🐫 🦙 🦘 🦥 🦨 🦡 🐘 🦣 🐁',
              '🐀 🦔 🐇 🦫 🦎 🐊 🐢 🐍 🐉 🦕 🦖 🦦 🦭 🦈 🐬 🐳',
              '🐋 🐟 🐠 🐡 🦐 🦑 🐙 🦞 🦀 🐚 🦆 🐓 🦃 🦅 🦢 🦜',
              '🦩 🦚 🦉 🦤 🐦 🐧 🐥 🦇 🦋 🐌 🐛 🦟 🪰 🪱 🦗 🐝',
              '🪲 🐞 🦂',
            ],
          }}
          theme="hg-theme-default" // keyboard"
        />
      )}
    </Container>
  );
};

export default Home;
