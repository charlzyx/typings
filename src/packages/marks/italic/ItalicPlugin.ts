import { ItalicPluginOptions, MARK_ITALIC } from './types';

import { SlatePlugin } from '../../types';
import { deserializeItalic } from './deserializeItalic';
import { onKeyDownMark } from '../onKeyDownMark';
import { renderLeafItalic } from './renderLeafItalic';

export const ItalicPlugin = ({
  hotkey = 'mod+i',
}: ItalicPluginOptions = {}): SlatePlugin => ({
  renderLeaf: renderLeafItalic(),
  onKeyDown: onKeyDownMark({ mark: MARK_ITALIC, hotkey }),
  deserialize: deserializeItalic(),
});
