import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from 'styled-components';

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
} from './styles';

const Home: React.FC = () => {
  const theme = useContext(ThemeContext);

  const { switchTheme, isDarkTheme } = useThemeSwitch();

  const modalRef = useRef<IModalRef>(null);

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
      <ThemeButton onClick={switchTheme}>
        {isDarkTheme ? '🌞' : '🌚'}
      </ThemeButton>
      <Modal ref={modalRef} />
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
