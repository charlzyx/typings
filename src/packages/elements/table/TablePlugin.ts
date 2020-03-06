import { RenderElementTableOptions } from './types';
import { SlatePlugin } from '../../types';
import { deserializeTable } from './deserializeTable';
import { renderElementTable } from './renderElementTable';

export const TablePlugin = (
  options?: RenderElementTableOptions
): SlatePlugin => ({
  renderElement: renderElementTable(options),
  deserialize: deserializeTable(),
});
