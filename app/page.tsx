import { Container, Space, Title } from '@mantine/core';
import TranscriptionControls from '../components/Transcription/TranscriptionControls';

export default function HomePage() {
  return (
    <Container>
      <Title>Whisper Web UI / GUI transcription tool</Title>
      <Space h="md" />
      <TranscriptionControls />
    </Container>
  );
}
