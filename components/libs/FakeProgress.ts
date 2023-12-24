/**
 * FakeProgress.progress keeps track of an incrementally increasing number
 * from 0 to 1 that represents percentage 'progress' over time,
 * e.g. of a loading bar. Progress follows an exponential curve that will reach
 * ~60% at timeMs, with 50% step jitter added at every jitterInterval to
 * add more realism.
 */
export default class FakeProgress {
  timeConstant: number;
  lastProgress: number;
  startTime: number;

  constructor({
    timeMs,
    initialProgress,
  }: {
    /** Time for the exponential progress to reach ~60% */
    timeMs: number;
    initialProgress?: number;
  }) {
    this.timeConstant = timeMs;
    this.lastProgress = initialProgress || 0;
    /** starting time must be set proportionate to whatever progress is set to,
     * meaning in the past if progress is greater than 0 */
    this.startTime = Date.now() - -1 * (Math.log(-this.lastProgress + 1) * this.timeConstant);
  }

  /** Update progress according to the timeConstant */
  getProgress() {
    const timeElapsed = Date.now() - this.startTime;
    const progress = 1 - Math.exp((-1 * timeElapsed) / this.timeConstant);
    const { lastProgress } = this;

    const newProgress = Math.min(
      lastProgress + (progress - lastProgress) * (Math.random() + 0.5),
      1
    );
    this.lastProgress = newProgress;
    return newProgress;
  }
}
