import { HighlightPlugin } from '../marks';
import { SearchHighlightPluginOptions } from './types';
import { SlatePlugin } from '../types';

export const SearchHighlightPlugin = ({
  bg,
}: SearchHighlightPluginOptions = {}): SlatePlugin => ({
  ...HighlightPlugin({ bg }),
});
