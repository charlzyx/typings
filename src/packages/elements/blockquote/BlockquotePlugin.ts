import { RenderElementOptions } from '../types';
import { SlatePlugin } from '../../types';
import { deserializeBlockquote } from './deserializeBlockquote';
import { renderElementBlockquote } from './renderElementBlockquote';

export const BlockquotePlugin = (
  options?: RenderElementOptions
): SlatePlugin => ({
  renderElement: renderElementBlockquote(options),
  deserialize: deserializeBlockquote(),
});
