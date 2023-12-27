'use client';

import React, { useState } from 'react';
import { useMemoizedCallback } from '../hooks/useMemoizedCallback';
import { transcribeAudio } from '../libs/openAIAPI';
import TranscriptionControlsInner from './TranscriptionControlsInner';
import { OpenAIAPIKeyProvider, useOpenAIAPIKeySetterAndGetter } from '../libs/localStorage';

interface TranscriptionControlsProps {}

/**
 * Client-side React component that has a button to start/stop
 * transcribing and a text area where the transcription will be added
 */
const TranscriptionControls: React.FunctionComponent<TranscriptionControlsProps> = React.memo(
  function TranscriptionControls() {
    const [transcribedText, setTranscribedText] = useState<string | null>(null);
    const [transcribingAudioSeconds, setTranscribingAudioSeconds] = useState<number | null>(null);

    const { apiKey } = useOpenAIAPIKeySetterAndGetter();

    const handleRecordingComplete = useMemoizedCallback(async (blob: Blob, seconds: number) => {
      if (!apiKey) return;

      setTranscribingAudioSeconds(seconds);
      const text = await transcribeAudio(blob, apiKey);
      setTranscribedText((prevText) => `${prevText ?? ''} ${text.text}`.trim());
      setTranscribingAudioSeconds(null);
    }, []);

    return (
      <TranscriptionControlsInner
        transcribingAudioSeconds={transcribingAudioSeconds}
        transcribedText={transcribedText}
        onTranscribedTextChange={setTranscribedText}
        onRecordingComplete={handleRecordingComplete}
      />
    );
  }
);

interface TranscriptionControlsWithProviderProps {}

const TranscriptionControlsWithProvider: React.FunctionComponent<TranscriptionControlsWithProviderProps> =
  React.memo(function TranscriptionControlsWithProvider() {
    return (
      <OpenAIAPIKeyProvider>
        <TranscriptionControls />
      </OpenAIAPIKeyProvider>
    );
  });

export default TranscriptionControlsWithProvider;
