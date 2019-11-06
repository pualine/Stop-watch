class State {
  constructor(startTimes, difference, suspend) {
    this.startTimes = startTimes;
    this.difference = difference;
    this.suspend = suspend;
  }
  static ready() {
    return new State(null, 0, 0);
  }
}
