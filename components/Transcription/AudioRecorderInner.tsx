import React, { PropsWithChildren } from 'react';
import { Alert, Button, Group, Text } from '@mantine/core';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSquare, faPause, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import RecordingCircleIcon from './RecordingCircleIcon';

export interface AudioRecorderInnerProps
  extends Omit<ReturnType<typeof useAudioRecorder>, 'stopRecording'> {
  /** If we were unable to initialize the MediaRecorder API, the error we got */
  initializationError: string | null;

  /** Called by the button that finishes/saves recording */
  onFinishRecording: () => unknown;

  /** Called by the button that finishes/saves recording */
  onDiscardRecording: () => unknown;

  /** Called if anyone clicks the settings button */
  onSettingsClick: () => unknown;
}

/**
 * Custom audio recorder interface that wraps around
 */
const AudioRecorderInner: React.FunctionComponent<AudioRecorderInnerProps> = React.memo(
  (props: PropsWithChildren<AudioRecorderInnerProps>) => {
    const {
      initializationError,
      isRecording,
      isPaused,
      togglePauseResume,
      recordingTime,
      startRecording,
      onFinishRecording,
      onDiscardRecording,
      onSettingsClick,
    } = props;
    if (initializationError) {
      return (
        <Alert color="red" title="We can't record audio for transcription">
          {initializationError}
        </Alert>
      );
    }

    const minutes = Math.floor(recordingTime / 60);
    const seconds = recordingTime % 60;
    const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

    if (isRecording) {
      return (
        <Group>
          <Button
            leftSection={<FontAwesomeIcon icon={faSquare} />}
            variant="filled"
            onClick={onFinishRecording}
          >
            Stop recording and transcribe
          </Button>
          {isPaused ? (
            <Button
              leftSection={<FontAwesomeIcon icon={faPlay} />}
              variant="default"
              onClick={togglePauseResume}
            >
              Resume
            </Button>
          ) : (
            <Button
              leftSection={<FontAwesomeIcon icon={faPause} />}
              variant="default"
              onClick={togglePauseResume}
            >
              Pause
            </Button>
          )}
          <Button
            leftSection={<FontAwesomeIcon icon={faTrash} />}
            variant="light"
            color="red"
            onClick={onDiscardRecording}
          >
            Cancel transcription
          </Button>
          <Text>
            {minutes}:{secondsStr}
          </Text>
        </Group>
      );
    }

    return (
      <Group justify="space-between">
        <Button leftSection={<RecordingCircleIcon />} variant="default" onClick={startRecording}>
          Start transcribing/recording audio
        </Button>
        <Button
          leftSection={<FontAwesomeIcon icon={faGear} />}
          variant="default"
          onClick={onSettingsClick}
        >
          Settings
        </Button>
      </Group>
    );
  }
);

export default AudioRecorderInner;
