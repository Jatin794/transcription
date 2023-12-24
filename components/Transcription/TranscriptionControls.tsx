'use client';

import React, { useState } from 'react';
import { useMemoizedCallback } from '../hooks/useMemoizedCallback';
import { transcribeAudio } from '../libs/openAIAPI';
import TranscriptionControlsInner from './TranscriptionControlsInner';
import { getOpenAIAPIKeyFromLocalStorage } from '../libs/localStorage';

interface TranscriptionControlsProps {}

/**
 * Client-side React component that has a button to start/stop
 * transcribing and a text area where the transcription will be added
 */
const TranscriptionControls: React.FunctionComponent<TranscriptionControlsProps> = React.memo(
  () => {
    const [transcribedText, setTranscribedText] = useState<string | null>(null);
    const [transcribingAudioSeconds, setTranscribingAudioSeconds] = useState<number | null>(null);

    const handleRecordingComplete = useMemoizedCallback(async (blob: Blob, seconds: number) => {
      const apiKey = getOpenAIAPIKeyFromLocalStorage();
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

export default TranscriptionControls;
