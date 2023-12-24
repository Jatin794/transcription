import React from 'react';
import { Meta, Story } from '@storybook/react';
import AudioRecorder, { AudioRecorderProps } from './AudioRecorder';
import { makeFakeHandler } from '../libs/makeFakeHandler';

const defaultProps: AudioRecorderProps = {
  onRecordingComplete: makeFakeHandler('onRecordingComplete'),
};

const metadata: Meta = {
  title: 'AudioRecorder',
  component: AudioRecorder,
  args: defaultProps,
};
export default metadata;

const Template: Story<AudioRecorderProps> = (args) => <AudioRecorder {...args} />;

export const Default: Story<AudioRecorderProps> = Template.bind({});
