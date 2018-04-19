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
      <p className="dragon-item">{feedback.feedback}!</p>
    ) : (
      ''
    );
    let mValueJSX = <p className="dragon-item">
        This card is currently at level {this.props.protectedData.mValue}
      </p>;
    console.log('Game feebdack', gameFeedback)
    if (gameFeedback === 'Correct') {
      mValueJSX = <p className="dragon-item">
          This card is currently at level{' '}
          {this.props.protectedData.mValue + 1}
        </p>;
    } else if (gameFeedback === 'Incorrect') {
      mValueJSX = <p className="dragon-item">
        This card is currently at level 1
      </p>;
    }
    return <div className="dashboard">
        <div className="dashboard-question">
          <h4 className="dragon-item">
            {this.props.protectedData.question}
          </h4>
          <p className="dragon">{this.props.protectedData.dragonAnswer}</p>
          {gameFeedback}
          {correctAnswer}
          <p className="dragon-item">Attempts {feedback.attempts}</p>
          <p className="dragon-item">
            Correct Attempts {feedback.correctAttempts}
          </p>
          <p className="dragon-item">
            Percent correct{' '}
            {feedback.attempts === 0
              ? 0
              : feedback.correctAttempts / feedback.attempts * 100}%
          </p>
          {mValueJSX}

          <form onSubmit={e => this.answerSubmitHandler(e, this.props.currentAnswer)}>
            {feedback === this.props.feedback ? null : <input className="answer-input" type="text" name="answer" value={this.props.currentAnswer} onChange={this.handleAnswerInput} />}
            {/* {console.log(this.props.feedback.feedback)} */}
            {this.props.feedback.feedback === 'Correct' || this.props.feedback.feedback === 'Incorrect' ? this.renderNextButton() : <button className="submit-btn" type="submit">
                submit answer
              </button>}
          </form>
        </div>
        <div className="dashboard-bottom">
          <img className="left-dragon" src={dragonImage} alt="dragon" />
          <div className="progress-bar-container">
            <Circle className="progress-" percent={this.props.session.correctAttempts / this.props.session.attempts * 100} strokeWidth="4" strokeColor="green" />
            <h4>{this.props.session.correctAttempts}</h4>
            <h4>{this.props.session.attempts}</h4>
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
