import React from 'react';
import Head from 'next/head';
import { Anchor, Container, List, ListItem, Divider, Space, Title, Paper } from '@mantine/core';
import TranscriptionControls from '../components/Transcription/TranscriptionControls';
import Paragraph from '../components/DesignSystem/Paragraph';

export interface HomePageProps {}

/**
 * Static page for the home page of the Whisper GUI/UI
 */
const HomePage: React.FunctionComponent<HomePageProps> = React.memo(() => (
  <Container pt="lg" pb="xl">
    <Head>
      <title>Whisper Transcription & Dictation Web UI: speech-to-text tool</title>
      <meta
        name="description"
        content="Open source OpenAI Whisper-based transcription front-end. We transcribe text recorded in your browser or from an uploaded audio file using your API key."
      />
    </Head>

    <Title>Whisper transcription & dictation Web UI / Web GUI</Title>
    <Space h="md" />

    <Paper shadow="md" p="md" bg="gray.1">
      <TranscriptionControls />
    </Paper>

    <Space h="xl" />

    <Divider />

    <Title order={2} mt="md" mb="sm">
      What is this Whisper UI?
    </Title>
    <Paragraph>
      Whisper Web UI is a tool that helps you transcribe voice recordings into text using the OpenAI
      Whisper transcription API. OpenAI’s Whisper API is one of quite a few APIs for transcribing
      audio, alongside the Google Cloud Speech-to-Text API, Rep.ai’s voice transcription APIs,
      Amazon Transcribe, and Microsoft Azure Speech-to-Text. It’s among the best for high-quality
      English transcriptions of standard conversational audio, based on{' '}
      <Anchor href="">OpenAI’s benchmarks</Anchor>.
    </Paragraph>

    <Title order={2} mt="md" mb="sm">
      How much does this cost?
    </Title>
    <Paragraph>
      The Whisper Web UI is powered by OpenAI’s Whisper API, which costs{' '}
      <Anchor href="https://openai.com/pricing#audio-models" target="_blank">
        $0.006 per minute of transcription
      </Anchor>
      . You will need your own OpenAI API account and API key that lets OpenAI bill you directly.
    </Paragraph>
    <Paragraph>
      If cost is an issue, there are other tools that let you transcribe Whisper locally on your
      computer, such as{' '}
      <Anchor href="https://apps.apple.com/us/app/aiko/id1672085276" target="_blank">
        Aiko on Mac
      </Anchor>{' '}
      and{' '}
      <Anchor href="https://whishper.net/" target="_blank">
        Whishper, another web UI
      </Anchor>{' '}
      that runs on Linux for advanced users. However, if you’re on a mobile phone or a Windows
      computer, this Web UI often is the easiest and fastest way to transcribe text using the OpenAI
      Whisper API.
    </Paragraph>
    <Paragraph>
      This web UI is provided completely free by Peter, one of the co-founders of{' '}
      <Anchor href="https://wanderlog.com/">Wanderlog, a travel and vacation planner app</Anchor>.
      Wanderlog also has tons of useful info, including the{' '}
      <Anchor href="https://wanderlog.com/list/geoCategory/74991/where-to-eat-best-restaurants-in-san-francisco">
        best restaurants in San Francisco
      </Anchor>
      .
    </Paragraph>

    <Title order={2} mt="md" mb="sm">
      What is the OpenAI Whisper model?
    </Title>
    <Paragraph>
      Whisper, an advanced speech recognition system, was trained on a vast dataset of 680,000 hours
      of diverse speech data from the internet. It’s great at handling different accents, background
      noise, and technical language.
    </Paragraph>
    <Paragraph>
      The system breaks down 30-second audio pieces into text and can handle multiple languages,
      translating them into English. Unlike specialized models, Whisper’s strength lies in its
      adaptability across various speech patterns. With a significant amount of non-English data, it
      excels in translating speech to text, surpassing other top models. It aims to be an
      easy-to-use, highly accurate tool for developers to add voice features to a wide range of
      applications. You can read more about Whisper on OpenAI’s website:
      <Anchor href="https://openai.com/research/whisper" target="_blank">
        https://openai.com/research/whisper
      </Anchor>
    </Paragraph>

    <Title order={2} mt="md" mb="sm">
      What can this be used for?
    </Title>
    <List>
      <ListItem>
        <strong>Dictating notes or emails from lectures:</strong> Whisper often does a better job
        than your computer or phone’s regular transcription library.
      </ListItem>
      <ListItem>
        <strong>Podcast transcription:</strong> Helps create accurate text versions of episodes or
        interviews.
      </ListItem>
      <ListItem>
        <strong>Video subtitles:</strong> Generates precise captions, improving accessibility.
      </ListItem>
      <ListItem>
        <strong>Meeting notes:</strong> Converts discussions into searchable written records.
      </ListItem>
    </List>
    <Title order={2} mt="md" mb="sm">
      Is this safe? What happens to my OpenAI API key?
    </Title>
    <Paragraph>
      All audio and transcriptions are sent securely between your device and OpenAI’s servers. Your
      OpenAI API key will also be safe: it’s stored in your browser and only sent (encrypted, using
      HTTPS) to OpenAI’s servers.
    </Paragraph>

    <Title order={2} mt="md" mb="sm">
      What are future plans for this project?
    </Title>
    <Paragraph>Some future plans are:</Paragraph>
    <List type="ordered" mt="md">
      <ListItem>Allowing file uploading to transcribe text from audio and video files.</ListItem>
      <ListItem>
        Letting you try transcribing your audio using multiple APIs so that you can figure out the
        best API for your use case and audio.
      </ListItem>
      <ListItem>Rank APIs based on perceived quality.</ListItem>
    </List>
  </Container>
));

export default HomePage;
