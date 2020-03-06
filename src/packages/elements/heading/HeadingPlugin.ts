import { HeadingPluginOptions } from './types';
import { SlatePlugin } from '../../types';
import { deserializeHeading } from './deserializeHeading';
import { renderElementHeading } from './renderElementHeading';

export const HeadingPlugin = (options?: HeadingPluginOptions): SlatePlugin => ({
  renderElement: renderElementHeading(options),
  deserialize: deserializeHeading({ levels: options?.levels }),
});
