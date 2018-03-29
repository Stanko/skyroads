import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setBlock } from 'actions/editor';
import { heights } from 'constants/block';
import BaseTunnel from 'components/blocks/BaseTunnel';
import HalfTunnel from 'components/blocks/HalfTunnel';
import FullTunnel from 'components/blocks/FullTunnel';
import SolidBlock from 'components/blocks/SolidBlock';

const DEFAULT_BLOCK = {
  color: 0x7777aa,
  tunnelColors: [0x3377aa, 0x9999ff],
  // height: heights.BASE,
  height: 0,
  tunnel: false,
  floor: true,
  // special: special.BURNING,
  special: null,
};

@connect()
export default class Block extends Component {
  static propTypes = {
    block: PropTypes.object,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  updateBlock = (block) => {
    const {
      x,
      y,
      dispatch,
    } = this.props;

    // this.setState({
    //   block,
    // });

    dispatch(setBlock(block, x, y));
  }

  handleAddClick = () => {
    this.updateBlock(DEFAULT_BLOCK);
  }

  handleTunnelToggleClick = () => {
    const {
      block,
    } = this.props;

    this.updateBlock({
      ...block,
      tunnel: !block.tunnel,
    });
  }

  handleFloorToggleClick = () => {
    const {
      block,
    } = this.props;

    this.updateBlock({
      ...block,
      floor: !block.floor,
    });
  }

  handleSetHeightClick = (height) => {
    return () => {
      const {
        block,
      } = this.props;

      this.updateBlock({
        ...block,
        height,
      });
    };
  }

  renderHeight() {
    return (
      <div>
        <button onClick={ this.handleSetHeightClick(heights.BASE) }>0</button>
        <button onClick={ this.handleSetHeightClick(heights.HALF) }>0.5</button>
        <button onClick={ this.handleSetHeightClick(heights.FULL) }>1</button>
      </div>
    );
  }

  renderSvg() {
    const {
      block,
    } = this.props;

    let SvgComponent = SolidBlock;

    if (block.tunnel) {
      if (block.height === heights.BASE) {
        SvgComponent = BaseTunnel;
      } else if (block.height === heights.HALF) {
        SvgComponent = HalfTunnel;
      } else if (block.height === heights.FULL) {
        SvgComponent = FullTunnel;
      }
    }

    return <SvgComponent { ...block } />;
  }

  render() {
    const {
      block,
    } = this.props;

    // TODO
    // color
    // tunnel colors
    // special

    return (
      <div className='Block'>
        { block ?
          <Fragment>
            <div className='Block-content'>
              { this.renderHeight() }

              <button onClick={ this.handleTunnelToggleClick }>
                t
              </button>

              { block.tunnel &&
                <div>
                  <button onClick={ this.handleFloorToggleClick }>
                    f
                  </button>
                </div> }
            </div>
            { this.renderSvg() }
          </Fragment> :
          <button
            className='Block-addButton'
            onClick={ this.handleAddClick }
          /> }
      </div>
    );
  }
}
