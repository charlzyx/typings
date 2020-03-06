import { MARK_STRIKETHROUGH, StrikethroughPluginOptions } from './types';

import { SlatePlugin } from '../../types';
import { deserializeStrikethrough } from './deserializeStrikethrough';
import { onKeyDownMark } from '../onKeyDownMark';
import { renderLeafStrikethrough } from './renderLeafStrikethrough';

export const StrikethroughPlugin = ({
  hotkey = 'mod+shift+k',
}: StrikethroughPluginOptions = {}): SlatePlugin => ({
  renderLeaf: renderLeafStrikethrough(),
  onKeyDown: onKeyDownMark({ mark: MARK_STRIKETHROUGH, hotkey }),
  deserialize: deserializeStrikethrough(),
});
