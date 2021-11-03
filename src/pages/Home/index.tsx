import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { useThemeSwitch } from 'hooks/useThemeSwitch';

import { Container, Content, Title, Button, Card } from './styles';

const Home: React.FC = () => {
  const theme = useContext(ThemeContext);

  const { switchTheme, isDarkTheme } = useThemeSwitch();

  return (
    <Container>
      <button
        onClick={switchTheme}
        style={{
          border: 0,
          cursor: 'pointer',
          background: 'transparent',
          padding: 10,
        }}
      >
        {isDarkTheme ? '🌞' : '🌚'}
      </button>
      <Content>
        <Title>commojity</Title>
      </Content>
      <Content style={{ backgroundColor: theme.cards }}>
        <Button>Grãos</Button>
        <Button color={theme.green}>Insumos</Button>
        <Button color={theme.green}>Manutenção</Button>
        <Button color={theme.green}>Transportação</Button>
        <Button>Colheita</Button>
        <Button>Trajeto</Button>
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
