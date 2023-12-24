import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import APIKeyModalInner, { APIKeyModalInnerProps } from './APIKeyModalInner';
import { makeFakeHandler } from '../libs/makeFakeHandler';

const defaultProps: APIKeyModalInnerProps = {
  apiKey: '',
  opened: true,
  onClose: makeFakeHandler('onClose'),
  onAPIKeyChange: makeFakeHandler('onAPIKeyChange'),
  showAPIKeyNeededAlert: false,
};

const metadata: Meta = {
  title: 'APIKeyModalInner',
  component: APIKeyModalInner,
  args: defaultProps,
};
export default metadata;

const Template: StoryFn<APIKeyModalInnerProps> = (args) => <APIKeyModalInner {...args} />;

export const Default: StoryFn<APIKeyModalInnerProps> = Template.bind({});

export const WithAPIKeyNeededAlert: StoryFn<APIKeyModalInnerProps> = Template.bind({});
WithAPIKeyNeededAlert.args = { showAPIKeyNeededAlert: true };
