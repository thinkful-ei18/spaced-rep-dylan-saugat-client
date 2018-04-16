import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './Login/Requires-login';
import { Line, Circle } from 'rc-progress';
import {fetchProtectedData} from '../actions/protected-data';
import  './dashboard.css'
export class Dashboard extends React.Component {

   
    constructor(props){
        super(props)
        this.state = {
            progress: 0
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (
            // <div className="dashboard">
            //     <div className="dashboard-username">
            //         Username: {this.props.username}
            //     </div>
            //     <div className="dashboard-name">Name: {this.props.name}</div>
            //     <div className="dashboard-protected-data">
            //         Protected data: {this.props.protectedData}
            //     </div>
            // </div>
            // <button onClick={}> </button>
            <div className="progress-bar"> <Circle className="progress-bar" percent="20" strokeWidth="4" strokeColor="green" /></div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
