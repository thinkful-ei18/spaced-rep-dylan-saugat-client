import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './Login/Requires-login';
import { Circle } from 'rc-progress';
import {
  fetchProtectedData,
  verifyAnswerStatus
} from '../actions/protected-data';
import { setAnswer, resetGame } from '../actions/game';
import './dashboard.css';
import dragonImage from './images/dragon.svg';
export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  answerSubmitHandler = (e, answer) => {
    e.preventDefault();
    this.props
      .dispatch(
        verifyAnswerStatus({
          answer: this.props.currentAnswer
        })
      )
      .then(() => this.props.dispatch(resetGame()))
      .catch(err => console.log(err));
  };

  handleAnswerInput = e => {
    this.props.dispatch(setAnswer(e.target.value));
  };

  renderNextButton() {
    return (
      <button
      className="submit-btn"
        type="button"
        autoFocus
        onClick={() => this.props.dispatch(fetchProtectedData())}
      >
        NEXT!
      </button>
    );
  }

  render() {
    const feedback = this.props.feedback.feedback
      ? this.props.feedback
      : this.props.protectedData;
    const correctAnswer = this.props.feedback.answer ? (
      <p className="dragon-item">The answer is {feedback.answer}</p>
    ) : (
      ''
    );
    const gameFeedback = feedback.feedback ? (
      <p className="dragon-item answer-status">{feedback.feedback}!</p>
    ) : (
      ''
    );
    let mValueJSX = <p className="dragon-item">
        This card is currently at level: {this.props.protectedData.mValue}
      </p>;
    if (feedback.feedback === 'Correct') {
      mValueJSX = <p className="dragon-item">
          This card is currently at level:{' '}
          {this.props.protectedData.mValue + 1}
        </p>;
    } else if (feedback.feedback === 'Incorrect') {
      mValueJSX = <p className="dragon-item">
        This card is currently at level: 1
      </p>;
    }
    return <div className="dashboard" role="main">
        <div className="dashboard-question">
          <h1 className="dragon-item">
            {this.props.protectedData.question}
          </h1>
          <p className="dragon">{this.props.protectedData.dragonAnswer}</p>
          {gameFeedback}
          {correctAnswer}
          <p className="dragon-item">
            Attempts on this word: {feedback.attempts}
          </p>
          <p className="dragon-item">
            Correct Attempts on this word: {feedback.correctAttempts}
          </p>
          <p className="dragon-item">
            Percent correct:{' '}
            {feedback.attempts === 0
              ? 0
              : Math.floor(feedback.correctAttempts / feedback.attempts * 100)}%
          </p>
          {mValueJSX}

          <form onSubmit={e => this.answerSubmitHandler(e, this.props.currentAnswer)}>
            {feedback === this.props.feedback ? null : <label htmlFor="answer" className="dragon-item answer-label">
                Answer<input autoFocus className="answer-input" type="text" name="answer" title="answer" value={this.props.currentAnswer} onChange={this.handleAnswerInput} />
              </label>}
            {this.props.feedback.feedback === 'Correct' || this.props.feedback.feedback === 'Incorrect' ? this.renderNextButton() : <button className="submit-btn" type="submit">
                submit answer
              </button>}
          </form>
        </div>
        <div className="dashboard-bottom">
          <img className="left-dragon" src={dragonImage} alt="dragon" />
          <div className="progress-bar-container">
            <Circle className="progress-bar" percent={Math.floor(this.props.session.correctAttempts / this.props.session.attempts * 100)} strokeWidth="4" strokeColor="black" />
            <p className="dragon-item btm-dash-item">
              Correct attempts this session:{' '}
              {this.props.session.correctAttempts}
            </p>
            <p className="dragon-item btm-dash-item">
              Attempts this session: {this.props.session.attempts}
            </p>
            <p className="dragon-item btm-dash-item">
              Session percent:{' '}
              {this.props.session.attempts === 0
                ? 0
                : this.props.session.correctAttempts /
                  this.props.session.attempts *
                  100}%
            </p>
          </div>
          <img src={dragonImage} alt="dragon" />
        </div>
      </div>;
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
    feedback: state.protectedData.feedback,
    loadingStatus: state.protectedData.loading,
    currentAnswer: state.game.answer,
    session: state.protectedData.session
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
