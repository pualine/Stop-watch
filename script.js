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

class stopWatch {
  constructor(state) {
    this.state = state;
    this.requestAnimationId = null;
    this.handleClickStart = this.handleClickStart.bind(this);
    document
      .getElementById("start")
      .addEventListener("click", this.handleClickStart);

    this.handleClickStop = this.handleClickStart.bind(this);
    document
      .getElementById("stop")
      .addEventListener("click", this.handleClickStop);

    this.handleClickReset = this.handleClickReset.bind(this);
    document
      .getElementById("reset")
      .addEventListener("click", this.handleClickReset);
    this.tick = this.tick.bind(this);
    this.render();
  }

  static ready() {
    return new stopWatch(State.ready());
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  tick() {
    this.setState({
      difference: new Date(new Date() - this.state.startTime)
    });
    this.requestAnimationId = requestAnimationFrame(this.tick);
  }

  handleClickStart() {
    if (this.state.startTimes) {
      // prevent multi clicks on start
      return;
    }
    this.setState({
      startTime: new Date() - this.state.suspend,
      suspend: 0
    });
    this.requestAnimationId = requestAnimationFrame(this.tick);
  }

  handleClickStop() {
    cancelAnimationFrame(this.requestAnimationId);
    this.setState({
      startTime: null,
      suspend: this.state.difference
    });
  }

  handleClickReset() {
    cancelAnimationFrame(this.requestAnimationId);
    this.setState(State.ready());
  }
  render() {
    const { difference } = this.state;
    const hundredths = (difference
      ? Math.floor(difference.getMilliseconds() / 10)
      : 0
    )
      .toString()
      .padStart(2, "0");
    const seconds = (difference ? Math.floor(difference.getSeconds()) : 0)
      .toString()
      .padStart(2, "0");
    const minutes = (difference ? Math.floor(difference.getMinutes()) : 0)
      .toString()
      .padStart(2, "0");

    // render screen
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("hundredths").textContent = hundredths;
  }
}

const STOPWATCH = stopWatch.ready();
