import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessage } from "../actions";

class Feature extends Component {
    componentWillMount() {
        this.props.fetchMessage();
    }

    renderMessage() {
        if (this.props.message) {
            return (<div><strong>{ this.props.message }</strong></div>);
        }
    }

    render() {
        return (
            <div>
                <h1>This is feature</h1>
                {this.renderMessage()}
            </div>
        );
    }
}

const mapStateToProps = ({ message }) => ({ message });

export default connect(mapStateToProps, {fetchMessage})(Feature);
