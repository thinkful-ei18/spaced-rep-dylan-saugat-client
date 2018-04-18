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
import dragonImage from './images/dragon.svg'
export class Dashboard extends React.Component {
  state = {
    currentProgress: 0
  };

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
      <button type="button" onClick={() => this.props.dispatch(fetchProtectedData())}>
        NEXT!
      </button>
    );
  }

  // handleProgressBar = () => {
  //   let currentProgress = this.state.currentProgress;

  //   if (this.props.feedback.feedback === 'Correct') {
  //     this.setState({ currentProgress: (currentProgress += 10) });
  //   }
  // };

//   dragonItemStyleHandler = () => {
 
//       if(this.props.feedback.feedback === 'Correct'){
//           dragonItemStyle.borderRight = '4px solid green'
//       }
//       else if (this.props.feedback.feedback === 'Incorrect'){
//         dragonItemStyle.borderRight = '4px solid red'
//       }
//       return dragonItemStyle
//   }

  render() {
      const feedback = this.props.feedback.feedback ? this.props.feedback : this.props.protectedData;

       const dragonItemStyle = {
        'borderRight': '4px solid blue'
      }
    return <div className="dashboard">

        <div className="dashboard-question">
          <h4 className="dragon-item" style={dragonItemStyle}>{this.props.protectedData.question}</h4>
          <h5 className="dragon">{this.props.protectedData.dragonAnswer}</h5>
          <h5 className="dragon-item" style={dragonItemStyle} >Attempts {feedback.attempts}</h5>
          <h5 className="dragon-item" style={dragonItemStyle}>
            Correct Attempts {feedback.correctAttempts}
          </h5>
          <h5 className="dragon-item" style={dragonItemStyle} >
            Percent correct{' '}
            {feedback.attempts === 0? 0 :feedback.correctAttempts /
              feedback.attempts *
              100}%
          </h5>
          <h5>{feedback.feedback}</h5>
          {/* {console.log(this.props.protectedData.id)} */}
          <form onSubmit={e => this.answerSubmitHandler(e, this.props.currentAnswer)}>
            <input className="answer-input" type="text" name="answer" value={this.props.currentAnswer} onChange={this.handleAnswerInput} />
            {/* {console.log(this.props.feedback.feedback)} */}
            {this.props.feedback.feedback === 'Correct' || this.props.feedback.feedback === 'Incorrect' ? this.renderNextButton() : <button className="submit-btn" type="submit">
                submit answer
              </button>}
          </form>
        </div>
        <img className="left-dragon" src={dragonImage} alt="dragon"/>
        <div className="progress-bar-container">

          <Circle className="progress-" percent={this.props.session.correctAttempts / this.props.session.attempts * 100} strokeWidth="4" strokeColor="green" />
          <h4>{this.props.session.correctAttempts}</h4>
          <h4>{this.props.session.attempts}</h4>
        </div>
        <img src={dragonImage} alt="dragon"/>
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
