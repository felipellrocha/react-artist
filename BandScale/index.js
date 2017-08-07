import React from 'react';
import PropType from 'prop-types';

import {
  scaleBand,
} from 'd3-scale';

import styles from './index.css';

class Scale extends React.Component {

  constructor(props) {
    super(props);

    this.scale = scaleBand()
      .paddingInner([0.1])
      .paddingOuter([0.3]);
  }

  render() {
    const {
      data,

      keyGetter,

      handleMouseOver,
    } = this.props;

    const {
      padding,
    } = this.context;

    const width = this.props.width || this.context.width;
    const height = this.props.height || this.context.height;

    this.scale.domain(data.map(keyGetter)).range([0, width]);
    const bandwidth = this.scale.bandwidth();

    const x = 0;
    const y = this.context.height - padding.bottom;

    const translate = `translate(${x} ${y})`;

    return (
      <g
        className={styles.component}
        transform={translate}
      >
        <line
          x1={0}
          y1={0}
          x2={width}
          y2={0}
          className='divider'
        />
        {data.map((item, i) => {
          const key = keyGetter(item);

          return (
            <line
              key={key}
              x1={this.scale(key) + (bandwidth / 2)}
              y1={0}
              x2={this.scale(key) + (bandwidth / 2)}
              y2={height}

              className='indicator'

              onMouseOver={handleMouseOver.bind(item)}
            />
          );
        })}
      </g>
    );
  };
};

Scale.contextTypes = {
  width: PropType.number,
  height: PropType.number,
  padding: PropType.shape({
    top: PropType.number,
    right: PropType.number,
    bottom: PropType.number,
    left: PropType.number,
  }),
};

Scale.defaultProps = {
  x: 0,
  y: 0,
  keyGetter: item => item.key,

  handleMouseOver: event => { },
};

export default Scale;
