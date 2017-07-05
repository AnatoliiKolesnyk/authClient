import React, { Component } from "react";
import { connect } from "react-redux";

export default (ProtectedComponent) => {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        };

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.push("/");
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.push("/");
            }
        }

        render() {
            return ( <ProtectedComponent { ...this.props } /> );
        }
    }

    const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated });

    return connect(mapStateToProps)(Authentication);
}
