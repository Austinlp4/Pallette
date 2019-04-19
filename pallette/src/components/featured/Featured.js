import React from 'react';
import All from './All';

class Featured extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <All {...this.props} />
      </div>
    );
  }
}

export default Featured;
