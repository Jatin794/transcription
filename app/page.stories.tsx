import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import HomePage, { HomePageProps } from './page';

const defaultProps: HomePageProps = {};

const metadata: Meta = {
  title: 'HomePage',
  component: HomePage,
  args: defaultProps,
};
export default metadata;

const Template: StoryFn<HomePageProps> = (args) => <HomePage {...args} />;

export const Default: StoryFn<HomePageProps> = Template.bind({});
