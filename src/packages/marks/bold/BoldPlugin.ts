import { BoldPluginOptions, MARK_BOLD } from './types';

import { SlatePlugin } from '../../types';
import { deserializeBold } from './deserializeBold';
import { onKeyDownMark } from '../onKeyDownMark';
import { renderLeafBold } from './renderLeafBold';

export const BoldPlugin = ({
  hotkey = 'mod+b',
}: BoldPluginOptions = {}): SlatePlugin => ({
  renderLeaf: renderLeafBold(),
  onKeyDown: onKeyDownMark({ mark: MARK_BOLD, hotkey }),
  deserialize: deserializeBold(),
});
