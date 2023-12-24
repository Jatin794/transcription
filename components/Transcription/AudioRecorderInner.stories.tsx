import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AudioRecorderInner, { AudioRecorderInnerProps } from './AudioRecorderInner';
import { makeFakeHandler } from '../libs/makeFakeHandler';

const defaultProps: AudioRecorderInnerProps = {
  initializationError: null,
  togglePauseResume: makeFakeHandler('togglePauseResume'),
  recordingTime: 5,
  isPaused: false,
  recordingBlob: undefined,
  startRecording: makeFakeHandler('startRecording'),
  isRecording: false,
  mediaRecorder: undefined,
  onFinishRecording: makeFakeHandler('onFinishRecording'),
  onDiscardRecording: makeFakeHandler('onDiscardRecording'),
  onSettingsClick: makeFakeHandler('onSettingsClick'),
};

const metadata: Meta = {
  title: 'AudioRecorderInner',
  component: AudioRecorderInner,
  args: defaultProps,
};
export default metadata;

const Template: StoryFn<AudioRecorderInnerProps> = (args) => <AudioRecorderInner {...args} />;

export const Default: StoryFn<AudioRecorderInnerProps> = Template.bind({});

export const WithInitializationError: StoryFn<AudioRecorderInnerProps> = Template.bind({});
WithInitializationError.args = {
  initializationError: 'MediaRecorder API is not available on this browser.',
};

export const Recording: StoryFn<AudioRecorderInnerProps> = Template.bind({});
Recording.args = { isRecording: true };

export const Paused: StoryFn<AudioRecorderInnerProps> = Template.bind({});
Paused.args = { isRecording: true, isPaused: true };
