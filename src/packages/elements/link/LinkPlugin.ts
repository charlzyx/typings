import { RenderElementOptions } from '../types';
import { SlatePlugin } from '../../types';
import { deserializeLink } from './deserializeLink';
import { renderElementLink } from './renderElementLink';

export const LinkPlugin = (options?: RenderElementOptions): SlatePlugin => ({
  renderElement: renderElementLink(options),
  deserialize: deserializeLink(),
});
