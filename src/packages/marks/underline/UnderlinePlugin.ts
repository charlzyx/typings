import { MARK_UNDERLINE, UnderlinePluginOptions } from './types';

import { SlatePlugin } from '../../types';
import { deserializeUnderline } from './deserializeUnderline';
import { onKeyDownMark } from '../onKeyDownMark';
import { renderLeafUnderline } from './renderLeafUnderline';

export const UnderlinePlugin = ({
  hotkey = 'mod+u',
}: UnderlinePluginOptions = {}): SlatePlugin => ({
  renderLeaf: renderLeafUnderline(),
  onKeyDown: onKeyDownMark({ mark: MARK_UNDERLINE, hotkey }),
  deserialize: deserializeUnderline(),
});
