import React, { Component } from 'react'
import G6Editor from '@antv/g6-editor'
import PropTypes from 'prop-types'

class Minimap extends Component {

  propTypes = {
    createMinimap: PropTypes.function,
    editor: PropTypes.object
  }

  createMinimap = (container) => {
    return new G6Editor.Minimap({
      container: container,
      viewportBackStyle:'#fff',
      viewportWindowStyle:'#fff',
      fitView:true,
      width:197
    });
  }

  getCreateMinimap = () => {
    const { createMinimap } = this.props;
    return createMinimap ? createMinimap : this.createMinimap;
  }

  componentDidMount() {
    const { editor } = this.props;
    const createMinimap = this.getCreateMinimap();
    const minimap = createMinimap(this.minimapContainer);
    editor.add && editor.add(minimap);
  }

  render() {
    return (
        <div className="minimap" ref={el => { this.minimapContainer = el }}></div>
    )
  }

}

export default Minimap;
