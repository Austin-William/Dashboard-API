import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

  render() {
    return (
      <Button
        href={this.props.href}
        variant={this.props.variant}
        className={this.props.className}
        class={this.props.class}
        size={this.props.size}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
        style={this.props.style}
        clientId={this.props.clientId}
        onScroll={this.props.onScroll}
        onSuccess={this.props.onSuccess}
        onFailure={this.props.onFailure}
        cookiePolicy={this.props.cookiePolicy}
        isSignedIn={this.props.isSignedIn}
      >
        {this.props.children}
      </Button>
    );
  }
}

export default ButtonComponent;
