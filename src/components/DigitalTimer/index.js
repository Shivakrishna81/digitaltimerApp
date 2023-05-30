import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isPause: false, timeLimit: 25, timeLimitSec: 0}

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  onDecreaseTime = () => {
    const {timeLimit} = this.state

    if (timeLimit > 1) {
      this.setState(prevState => ({
        timeLimit: prevState.timeLimit - 1,
      }))
    }
  }

  onIncreaseTime = () => {
    this.setState(prevState => ({
      timeLimit: prevState.timeLimit + 1,
    }))
  }

  renderTimeIncreaseDecrease = () => {
    const {timeLimit, timeLimitSec} = this.state
    const isButtonDisabled = timeLimitSec > 0

    return (
      <div className="idc">
        <p>Set Timer limit</p>
        <div className="cont">
          <button
            type="button"
            onClick={this.onDecreaseTime}
            disabled={isButtonDisabled}
          >
            -
          </button>

          <p className="button">{timeLimit}</p>

          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTime}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onClickReset = () => {
    clearInterval(this.intervalId)
    this.setState({isPause: false, timeLimit: 25, timeLimitSec: 0})
  }

  incrementTimeLimitSec = () => {
    const {timeLimit, timeLimitSec} = this.state
    const isTimerCompleted = timeLimitSec === timeLimit + 60

    if (isTimerCompleted) {
      clearInterval(this.intervalId)
      this.setState({isPause: false})
    } else {
      this.setState(prevState => ({
        timeLimitSec: prevState.timeLimitSec + 1,
      }))
    }
  }

  onStartOrPause = () => {
    const {isPause, timeLimit, timeLimitSec} = this.state
    const isTimerCompleted = timeLimitSec === timeLimit * 60

    if (isTimerCompleted) {
      this.setState({timeLimitSec: 0})
    }
    if (isPause) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.incrementTimeLimitSec, 1000)
    }
    this.setState(prevState => ({
      isPause: !prevState.isPause,
    }))
  }

  getElapsedTimeInSec = () => {
    const {timeLimit, timeLimitSec} = this.state
    const remainingSec = timeLimit * 60 - timeLimitSec
    const minutes = Math.floor(remainingSec / 60)
    const seconds = Math.floor(remainingSec % 60)
    const zeroMin = minutes > 9 ? minutes : `0${minutes}`
    const zeroSec = seconds > 9 ? seconds : `0${seconds}`

    return `${zeroMin}:${zeroSec}`
  }

  render() {
    const {isPause} = this.state
    const status = isPause ? 'Running' : 'Paused'

    return (
      <div className="container">
        <h1>Digital Timer</h1>
        <div className="container2">
          <div className="container3">
            <h1>{this.getElapsedTimeInSec()}</h1>
            <p>{status}</p>
          </div>
          <div>
            <div className="cont">
              {isPause ? (
                <div className="cont">
                  <button type="button" onClick={this.onStartOrPause}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                      className="btn-img"
                    />
                    <p>Pause</p>
                  </button>
                </div>
              ) : (
                <div className="cont">
                  <button type="button" onClick={this.onStartOrPause}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                      className="btn-img"
                    />
                    <p>Start</p>
                  </button>
                </div>
              )}
              <div className="cont">
                <button type="button" onClick={this.onClickReset}>
                  <img
                    className="btn-img"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>
                <p>Reset</p>
              </div>
            </div>
            {this.renderTimeIncreaseDecrease()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
