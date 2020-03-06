import { RenderElementListOptions } from './types';
import { SlatePlugin } from '../../types';
import { deserializeList } from './deserializeList';
import { onKeyDownList } from './onKeyDownList';
import { renderElementList } from './renderElementList';

export const ListPlugin = (
  options?: RenderElementListOptions
): SlatePlugin => ({
  renderElement: renderElementList(options),
  deserialize: deserializeList(),
  onKeyDown: onKeyDownList(),
});
