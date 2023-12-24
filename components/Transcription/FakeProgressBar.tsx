import React from 'react';
import { Progress } from '@mantine/core';
import FakeProgress from '../libs/FakeProgress';

export interface FakeProgressBarProps {
  seconds: number;
  done: boolean;
}

type State = {
  percent: number;
};

/** A fake progress bar which will inch towards 100 unevenly until we finish */
export default class FakeProgressBar extends React.PureComponent<FakeProgressBarProps, State> {
  updateInterval: ReturnType<typeof setInterval> | null = null;
  fakeProgress: any;

  constructor(props: FakeProgressBarProps) {
    super(props);
    this.state = {
      percent: props.done ? 100 : 0,
    };
  }

  componentDidMount() {
    this.fakeProgress = new FakeProgress({
      timeMs: this.props.seconds * 1000,
    });

    this.updateInterval = setInterval(() => {
      this.setState({ percent: this.fakeProgress.getProgress() * 100 });
    }, 500);
  }

  componentWillUnmount() {
    if (this.updateInterval !== null) clearInterval(this.updateInterval);
  }

  render() {
    const { percent } = this.state;
    const { seconds, done, ...restProps } = this.props;
    return (
      <Progress
        {...restProps}
        value={percent}
        animated
        styles={{ section: { transition: 'all 1s ease-in-out' } }}
      />
    );
  }
}
