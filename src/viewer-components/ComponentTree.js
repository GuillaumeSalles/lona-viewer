// @flow

import React, { Component } from 'react';
import { flatten } from 'lodash';
import './ComponentTree.css';

import type { LonaComponent, LonaLayer } from '../LonaTypes.js';
import { Icon } from './';

type Props = {
  component: LonaComponent,
  selectedLayerId: ?string,
  onSelectLayer: (layerId: string) => void,
  onHoverLayer: (layerId: ?string) => void
};

type LayerItem = {
  id: string,
  name: string,
  depth: number,
  type: string
};

function flattenLayers(layer: LonaLayer, depth: number): LayerItem[] {
  const result = [{ id: layer.id, name: layer.name, depth, type: layer.type }];

  if (layer.type === 'View') {
    return result.concat(
      flatten(layer.children.map(child => flattenLayers(child, depth + 1)))
    );
  }

  return result;
}

export default class ComponentTree extends Component<Props, void> {
  renderIcon(type: string) {
    switch (type) {
      case 'View':
        return <Icon name="view_day" size="sm" />;
      case 'Image':
        return <Icon name="image" size="sm" />;
      case 'Text':
        return <Icon name="font_download" size="sm" />;
      case 'Component':
        return <Icon name="layers" size="sm" />;
      default:
        return <span />;
    }
  }

  render() {
    const items = flattenLayers(this.props.component.rootLayer, 1);
    return (
      <div className="ComponentTree">
        <h3 className="TitleSm">Layers</h3>
        <div onMouseLeave={() => this.props.onHoverLayer(null)}>
          {items.map(item => {
            return (
              <a
                key={item.id}
                className={
                  this.props.selectedLayerId === item.id ? 'is-selected' : ''
                }
                onMouseOver={() => this.props.onHoverLayer(item.id)}
                onClick={() => this.props.onSelectLayer(item.id)}
                style={{ paddingLeft: item.depth * 18 + 'px' }}
              >
                {this.renderIcon(item.type)}
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
