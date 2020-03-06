import { RenderElementOptions } from '../types';
import { SlatePlugin } from '../../types';
import { renderElementActionItem } from './renderElementActionItem';

export const ActionItemPlugin = (
  options?: RenderElementOptions
): SlatePlugin => ({
  renderElement: renderElementActionItem(options),
});
