import React from 'react';
import PropType from 'prop-types';

import classnames from 'classnames';

class Graph extends React.Component {
  getChildContext() {
    const {
      height,
      width,
      padding,
    } = this.props;

    return {
      height,
      width,
      padding,
    }
  }

  render() {
    const {
      children,
      height,
      width,
      className,
    } = this.props;

    const viewBox = `0 0 ${width} ${height}`;

    const classes = classnames(className);

    return (
      <svg
        height={height}
        width={width}
        viewBox={viewBox}
        className={classes}
      >
        {children}
      </svg>
    );
  }
};

Graph.childContextTypes = {
  width: PropType.number,
  height: PropType.number,
  padding: PropType.shape({
    top: PropType.number,
    right: PropType.number,
    bottom: PropType.number,
    left: PropType.number,
  }),
};

export default Graph;
