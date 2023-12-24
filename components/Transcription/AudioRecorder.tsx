'use client';

import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { useMemoizedCallback } from '../hooks/useMemoizedCallback';
import AudioRecorderInner from './AudioRecorderInner';
import { getOpenAIAPIKeyFromLocalStorage } from '../libs/localStorage';
import APIKeyModal from './APIKeyModal';
import { useSetState } from '../libs/useSetState';

export interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob, seconds: number) => unknown;
}

enum ShowAPIKeyModalReason {
  /** We're showing the API key modal because the user has yet to set an API key */
  missingAPIKey = 'missingAPIKey',
  /** The user clicked on the "Settings" button */
  clickedSettingsButton = 'clickedSettingsButton',
}

/**
 * Custom audio recorder interface that wraps around the useAudioRecoder
 * library interface
 */
const AudioRecorder: React.FunctionComponent<AudioRecorderProps> = React.memo(
  (props: PropsWithChildren<AudioRecorderProps>) => {
    const { onRecordingComplete } = props;
    const [initializationError, setInitializationError] = useState<string | null>(null);

    const handleNotAllowedOrNotFound = useMemoizedCallback((exception: DOMException) => {
      setInitializationError(exception.message);
    }, []);

    const { recordingBlob, startRecording, stopRecording, ...innerProps } = useAudioRecorder(
      {},
      handleNotAllowedOrNotFound,
      { mimeType: 'audio/webm' }
    );

    const completedRecordingSecondsRef = useRef<number | null>(null);

    const handleFinishRecording = useMemoizedCallback(() => {
      stopRecording();
      completedRecordingSecondsRef.current = innerProps.recordingTime;
    }, []);

    const handleDiscardRecording = useMemoizedCallback(() => {
      stopRecording();
      completedRecordingSecondsRef.current = null;
    }, []);

    const prevRecordingBlobRef = useRef<Blob | null>();
    useEffect(() => {
      if (recordingBlob && prevRecordingBlobRef.current !== recordingBlob) {
        prevRecordingBlobRef.current = recordingBlob;
        if (completedRecordingSecondsRef.current != null) {
          onRecordingComplete(recordingBlob, completedRecordingSecondsRef.current);
          completedRecordingSecondsRef.current = null;
        }
      }
    }, [recordingBlob]);

    const [showAPIKeyModalReason, setShowAPIKeyModalReason] =
      useState<ShowAPIKeyModalReason | null>(null);
    const handleCloseAPIKeyModal = useSetState(setShowAPIKeyModalReason, null);
    const handleOpenAPIKeyModal = useSetState(
      setShowAPIKeyModalReason,
      ShowAPIKeyModalReason.clickedSettingsButton
    );

    const handleStartRecording = useMemoizedCallback(() => {
      const apiKey = getOpenAIAPIKeyFromLocalStorage();
      if (!apiKey) setShowAPIKeyModalReason(ShowAPIKeyModalReason.missingAPIKey);
      else startRecording();
    }, []);

    return (
      <>
        <AudioRecorderInner
          initializationError={initializationError}
          {...innerProps}
          startRecording={handleStartRecording}
          onFinishRecording={handleFinishRecording}
          onDiscardRecording={handleDiscardRecording}
          onSettingsClick={handleOpenAPIKeyModal}
        />

        <APIKeyModal
          opened={showAPIKeyModalReason != null}
          onClose={handleCloseAPIKeyModal}
          showAPIKeyNeededAlert={showAPIKeyModalReason === ShowAPIKeyModalReason.missingAPIKey}
        />
      </>
    );
  }
);

export default AudioRecorder;
