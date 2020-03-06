import { InlineCodePluginOptions, MARK_CODE } from './types';

import { SlatePlugin } from '../../types';
import { deserializeInlineCode } from './deserializeInlineCode';
import { onKeyDownMark } from '../onKeyDownMark';
import { renderLeafInlineCode } from './renderLeafInlineCode';

export const InlineCodePlugin = ({
  hotkey = 'mod+`',
}: InlineCodePluginOptions = {}): SlatePlugin => ({
  renderLeaf: renderLeafInlineCode(),
  onKeyDown: onKeyDownMark({ mark: MARK_CODE, hotkey }),
  deserialize: deserializeInlineCode(),
});
