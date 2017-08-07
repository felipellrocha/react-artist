import React from 'react';
import PropType from 'prop-types';

import { max } from 'd3-array';
import {
  scaleLinear,
  scaleBand,
} from 'd3-scale';

import styles from './index.css';

class VerticalBar extends React.Component {
  constructor(props) {
    super(props);

    this.scales = {
      x: scaleBand()
        .paddingInner([0.1])
        .paddingOuter([0.3]),
      y: scaleLinear(),
    };
  }

  render() {
    const {
      data,

      valueGetter,
      keyGetter,

      handleMouseOver,
    } = this.props;

    const width = this.context.width
      - this.context.padding.right
      - this.context.padding.left;
    const height = this.context.height
      - this.context.padding.top
      - this.context.padding.bottom;

    const {
      x,
      y,
    } = this.scales;

    x.domain(data.map(keyGetter)).range([0, width]);
    y.domain([0, max(data, valueGetter)]).range([height, 1]);

    return (
      <g className={styles.component}>
        {data.map((item, i) => {
          const value = valueGetter(item);
          const key = keyGetter(item);

          return (
            <rect
              key={key}
              height={y(0) - y(value)}
              width={x.bandwidth()}
              x={x(key)}
              y={y(value)}

              onMouseOver={handleMouseOver.bind(item)}
            />
          );
        })}
      </g>
    );
  }
};

VerticalBar.contextTypes = {
  width: PropType.number,
  height: PropType.number,
  padding: PropType.shape({
    top: PropType.number,
    right: PropType.number,
    bottom: PropType.number,
    left: PropType.number,
  }),
};

VerticalBar.defaultProps = {
  valueGetter: item => item.value,
  keyGetter: item => item.key,

  handleMouseOver: event => { },
};

export default VerticalBar;
