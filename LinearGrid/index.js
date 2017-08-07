import React from 'react';
import PropType from 'prop-types';

import { max } from 'd3-array';
import {
  scaleLinear,
} from 'd3-scale';

import styles from './index.css';

class Scale extends React.Component {

  constructor(props) {
    super(props);

    this.scale = scaleLinear();
  }

  render() {
    const {
      data,

      valueGetter,
      keyGetter,

      handleMouseOver,
    } = this.props;

    const {
      padding,
    } = this.context;

    const width = (this.props.width || this.context.width) - padding.right - padding.left;
    const height = (this.props.height || this.context.height) - padding.top - padding.bottom;

    this.scale.domain([0, max(data, valueGetter)]).range([0, height]);
    const ticks = this.scale.ticks([5]);

    const x = padding.left;
    const y = padding.top;

    const translate = `translate(${x} ${y})`;
    

    return (
      <g
        className={styles.component}
        transform={translate}
      >
        {ticks.map(item => {
          const key = keyGetter(item);

          return (
            <line
              key={key}
              x1={0}
              y1={this.scale(item)}
              x2={width}
              y2={this.scale(item)}

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
  valueGetter: item => item.value,
  keyGetter: item => item.key,

  handleMouseOver: event => { },
};

export default Scale;
