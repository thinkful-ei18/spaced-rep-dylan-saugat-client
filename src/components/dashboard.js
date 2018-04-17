import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './Login/Requires-login';
import { Field } from 'redux-form';
import { Circle } from 'rc-progress';
import {
  fetchProtectedData,
  verifyAnswerStatus
} from '../actions/protected-data';
import { setAnswer } from '../actions/game';
import './dashboard.css';
export class Dashboard extends React.Component {
  state = {
    currentProgress: 0
  };

  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  answerSubmitHandler = (e, answer) => {
      console.log("Running answer submit handler")
    e.preventDefault();
    e.target.value = ''
    this.props
      .dispatch(
        verifyAnswerStatus({
          answer: this.props.currentAnswer
        })
      )
      .then(() => this.handleProgressBar())
      .catch(err => console.log(err));
  };

  handleAnswerInput = e => {
    this.props.dispatch(setAnswer(e.target.value));
  };

  renderNextButton() {
    return (
      <button type="button" onClick={() => this.props.dispatch(fetchProtectedData())}>
        NEXT!
      </button>
    );
  }

  handleProgressBar = () => {
    let currentProgress = this.state.currentProgress;

    if (this.props.feedback.feedback === 'Correct') {
      this.setState({ currentProgress: (currentProgress += 10) });
    }
  };

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="dashboard-name">hello</div>
        <div className="dashboard-protected-data">
          <h4>{this.props.protectedData}</h4>
          {/* {console.log(this.props.protectedData.id)} */}
          <form
            onSubmit={e =>
              this.answerSubmitHandler(e, this.props.currentAnswer)

            }
          >
            <input
              type="text"
              name="answer"
              value={this.props.currentAnswer}
              onChange={this.handleAnswerInput}
            />
            {/* {console.log(this.props.feedback.feedback)} */}
            {this.props.feedback.feedback === 'Correct' ||
            this.props.feedback.feedback === 'Incorrect' ? (
              this.renderNextButton()
            ) : (
              <button type="submit">submit answer</button>
            )}
          </form>
        </div>

        <div className="progress-bar">
          {' '}
          <Circle
            className="progress-bar"
            percent={this.state.currentProgress}
            strokeWidth="4"
            strokeColor="green"
          />
        </div>
      </div>
    );
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
    currentAnswer: state.game.answer
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
