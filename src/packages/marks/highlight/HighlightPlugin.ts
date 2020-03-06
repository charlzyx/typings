import { HighlightPluginOptions } from './types';
import { SlatePlugin } from '../../types';
import { renderLeafHighlight } from './renderLeafHighlight';

export const HighlightPlugin = ({
  bg,
}: HighlightPluginOptions = {}): SlatePlugin => ({
  renderLeaf: renderLeafHighlight({ bg }),
});
