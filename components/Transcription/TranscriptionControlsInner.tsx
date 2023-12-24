import React, { PropsWithChildren } from 'react';
import { Card, Space, Stack, Text, Textarea } from '@mantine/core';
import AudioRecorder from './AudioRecorder';
import FakeProgressBar from './FakeProgressBar';
import { useMemoizedCallback } from '../hooks/useMemoizedCallback';

export interface TranscriptionControlsInnerProps {
  /**
   * If we're currently in the middle of transcribing audio, the length
   * of the audio we're currently transcribing, in seconds. Used to determine
   * how long the loading progress bar will appear for.
   */
  transcribingAudioSeconds: number | null;

  /**
   * If we've transcribed some text already: the text of the transcription.
   * Further transcriptions get added to this text.
   */
  transcribedText: string | null;

  /**
   * If the user manually edited the transcription, this will get called
   * with the edited text.
   */
  onTranscribedTextChange: (transcribedText: string) => unknown;

  /** Called after someone finishes transcribing */
  onRecordingComplete: (blob: Blob, seconds: number) => unknown;
}

/**
 * Component that shows buttons and renders transcribed text for use
 * in transcription
 */
const TranscriptionControlsInner: React.FunctionComponent<TranscriptionControlsInnerProps> =
  React.memo((props: PropsWithChildren<TranscriptionControlsInnerProps>) => {
    const {
      transcribingAudioSeconds,
      transcribedText,
      onTranscribedTextChange,
      onRecordingComplete,
    } = props;

    const handleChange = useMemoizedCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onTranscribedTextChange(event.currentTarget.value);
    }, []);

    // Whisper's API should have a "real time factor" of 0.1, meaning
    // 10 seconds of audio should take 1 second to process.
    // https://stackoverflow.com/a/75793651/309011
    const secondsNeededForTranscription = transcribingAudioSeconds
      ? Math.ceil(transcribingAudioSeconds / 10)
      : null;

    return (
      <>
        <AudioRecorder onRecordingComplete={onRecordingComplete} />

        {transcribedText != null && (
          <>
            <Space h="lg" />
            <Textarea
              placeholder="Transcribed text appears here: edit it if it's incorrect, then copy/paste elsewhere"
              label="Transcribed text"
              value={transcribedText}
              autosize
              minRows={2}
              onChange={handleChange}
            />
          </>
        )}

        {secondsNeededForTranscription != null && (
          <>
            <Space h="lg" />
            <Card shadow="sm">
              <Stack align="stretch">
                <FakeProgressBar
                  seconds={secondsNeededForTranscription}
                  done={transcribingAudioSeconds == null}
                />
                <Text c="dimmed" ta="center">
                  Transcribing{transcribedText != null && ' more text'}: this should take ~
                  {secondsNeededForTranscription} seconds.
                </Text>
              </Stack>
            </Card>
          </>
        )}
      </>
    );
  });

export default TranscriptionControlsInner;
