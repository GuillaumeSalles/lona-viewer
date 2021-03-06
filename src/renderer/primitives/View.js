// @flow

import React from 'react';
import {
  getSpacingStyle,
  getBackgroundStyle,
  getDimensionStyle,
  getBorderStyle,
  getOrDefault
} from '../../helpers';
import { Layer } from './';

import type {
  LonaViewLayer,
  LonaTextStyles,
  LonaColor,
  LonaComponent
} from '../../LonaTypes.js';

type Props = {
  layer: LonaViewLayer,
  textStyles: LonaTextStyles,
  colors: LonaColor[],
  components: Map<string, LonaComponent>
};

export default class View extends React.Component<Props, void> {
  render() {
    const { layer, textStyles, colors, components } = this.props;
    return (
      <div
        layerid={layer.id}
        style={{
          position: 'relative',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: getOrDefault(layer.parameters.flexDirection, 'column'),
          alignItems: getOrDefault(layer.parameters.alignItems, 'stretch'),
          flexShrink: getOrDefault(layer.parameters.flex, 0),
          alignSelf: getOrDefault(layer.parameters.alignSelf, ''),
          justifyContent: getOrDefault(layer.parameters.justifyContent, ''),
          alignContent: 'flex-start',

          ...getSpacingStyle(layer.parameters),
          ...getDimensionStyle(layer.parameters),
          ...getBorderStyle(layer.parameters, colors),
          ...getBackgroundStyle(layer.parameters, colors)
        }}
      >
        {layer.children.map(child => (
          <Layer
            key={child.id}
            layer={child}
            colors={colors}
            textStyles={textStyles}
            components={components}
          />
        ))}
      </div>
    );
  }
}
