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
  tunnelColors: [0x7777aa, 0x333355],
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
    const {
      x,
      y,
    } = this.props;

    let color = 0x7777aa;

    // TMP color
    if (y % 2 === 0) {
      if (x % 2 === 0) {
        color = 0x333355;
      }
    } else if (x % 2 === 1) {
      color = 0x333355;
    }

    this.updateBlock({
      ...DEFAULT_BLOCK,
      color,
    });
  }

  handleRemoveClick = () => {
    this.updateBlock(null);
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
      <div className='Block-height'>
        <button className='Block-heightButton' onClick={ this.handleSetHeightClick(heights.BASE) }>base</button>
        <button className='Block-heightButton' onClick={ this.handleSetHeightClick(heights.HALF) }>half</button>
        <button className='Block-heightButton' onClick={ this.handleSetHeightClick(heights.FULL) }>full</button>
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
                tunnel
              </button>

              { block.tunnel &&
                <div>
                  <button onClick={ this.handleFloorToggleClick }>
                    floor
                  </button>
                </div> }
              <div>
                <button onClick={ this.handleRemoveClick }>
                  remove
                </button>
              </div>
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
