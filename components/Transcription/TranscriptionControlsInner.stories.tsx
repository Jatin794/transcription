import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TranscriptionControlsInner, {
  TranscriptionControlsInnerProps,
} from './TranscriptionControlsInner';
import { makeFakeHandler } from '../libs/makeFakeHandler';

const defaultProps: TranscriptionControlsInnerProps = {
  transcribingAudioSeconds: null,
  transcribedText: null,
  onTranscribedTextChange: makeFakeHandler('onTranscribedTextChange'),
  onRecordingComplete: makeFakeHandler('onRecordingComplete'),
};

const metadata: Meta = {
  title: 'TranscriptionControlsInner',
  component: TranscriptionControlsInner,
  args: defaultProps,
};
export default metadata;

const Template: StoryFn<TranscriptionControlsInnerProps> = (args) => (
  <TranscriptionControlsInner {...args} />
);

export const Default: StoryFn<TranscriptionControlsInnerProps> = Template.bind({});

export const Transcribing: StoryFn<TranscriptionControlsInnerProps> = Template.bind({});
Transcribing.args = { transcribingAudioSeconds: 15 };

export const Transcribed: StoryFn<TranscriptionControlsInnerProps> = Template.bind({});
Transcribed.args = {
  transcribingAudioSeconds: null,
  transcribedText:
    'This is some example text that has successfully been transcribed by the transcription APIs after recording.',
};

export const TranscribedButTranscribingMore: StoryFn<TranscriptionControlsInnerProps> =
  Template.bind({});
TranscribedButTranscribingMore.args = {
  transcribingAudioSeconds: 15,
  transcribedText:
    'This is some example text that has successfully been transcribed by the transcription APIs after recording.',
};
