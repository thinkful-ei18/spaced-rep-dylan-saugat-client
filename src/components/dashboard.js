import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './Login/Requires-login';
import { Field } from 'redux-form';
import { Line, Circle } from 'rc-progress';
import {
  fetchProtectedData,
  verifyAnswerStatus
} from '../actions/protected-data';
import { setAnswer } from '../actions/game';
import './dashboard.css';
export class Dashboard extends React.Component {

    state = {
        currentProgress: 0
    }

  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  answerSubmitHandler = (e, answer) => {
    e.preventDefault();
    this.props.dispatch(
      verifyAnswerStatus({
        answer: this.props.currentAnswer,
        id: this.props.protectedData.id
      })
    );
    this.handleProgressBar();
  };

  handleAnswerInput = (e) => {
    this.props.dispatch(setAnswer(e.target.value))
  }

  handleProgressBar = () => {
    //   if(this.state.feedback.correctAttempts){
    //       return correctAttempts
    //   }

    let currentProgress = this.state.currentProgress;
    
    if(this.props.feedback){
        console.log('hello')
        this.setState({currentProgress: currentProgress+=10})
    }
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="dashboard-name">Name: {this.props.name}</div>
        <div className="dashboard-protected-data">
          <h4>{this.props.protectedData.question}</h4>
          {console.log(this.props.protectedData.id)}
          {this.props.feedback? console.log(this.props.feedback.feedback): null}
          <form onSubmit={e => this.answerSubmitHandler(e, this.props.currentAnswer)}>
            <input
              type="text"
              name="answer"
              value={this.props.currentAnswer}
              onChange={this.handleAnswerInput}
            />
            <button type="submit">submit answer</button>
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
    currentAnswer: state.game.answer
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
