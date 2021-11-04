import React, { useCallback, useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';

import { useThemeSwitch } from 'hooks/useThemeSwitch';

import Button from 'components/Button';

import api from 'services/api';

import { Container, Content, Title, Card, Emoji, EmojiContent } from './styles';

const Home: React.FC = () => {
  const theme = useContext(ThemeContext);

  const { switchTheme, isDarkTheme } = useThemeSwitch();

  const getGene = useCallback(async () => {
    try {
      const { data } = await api.get('/gene?g=🍔🍕');
      console.log('Data', data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getGene();
  }, [getGene]);

  return (
    <Container>
      <button
        onClick={switchTheme}
        style={{
          border: 0,
          cursor: 'pointer',
          background: 'transparent',
          padding: 10,
          marginLeft: 'auto',
        }}
      >
        {isDarkTheme ? '🌞' : '🌚'}
      </button>
      <Content>
        <Title>commojity</Title>
      </Content>
      <Content style={{ backgroundColor: theme.cards }} horizontal>
        <EmojiContent>
          <Emoji>🏢</Emoji>
        </EmojiContent>
        <EmojiContent>
          <Button style={{ marginBottom: 48 }}>Viagem</Button>
        </EmojiContent>
        <EmojiContent>
          <Button color={theme.green} overlayValue={28}>
            Contratos
          </Button>
          <Button color={theme.green} overlayValue={21}>
            Transporte
          </Button>
          <Emoji>🚚</Emoji>
        </EmojiContent>
        <EmojiContent>
          <Button style={{ marginBottom: 48 }}>Colheita</Button>
        </EmojiContent>
        <EmojiContent>
          <Button>Grãos</Button>
          <Button color={theme.green} overlayValue={39}>
            Insumos
          </Button>
          <Button color={theme.green} overlayValue={12}>
            Manutenção
          </Button>
          <Emoji>🌱</Emoji>
        </EmojiContent>
      </Content>
      <Content horizontal style={{ justifyContent: 'space-between' }}>
        <Card style={{ flex: 0.3 }}>Visualização de gene</Card>
        <Card style={{ flex: 0.3 }}>Lucro por mês</Card>
        <Card style={{ flex: 0.2 }}>Lucro total (1 ano)</Card>
        <Card style={{ flex: 0.15 }}>Orçamento (1 ano)</Card>
      </Content>
    </Container>
  );
};

export default Home;
