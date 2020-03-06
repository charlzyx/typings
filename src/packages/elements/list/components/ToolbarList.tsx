import React from 'react';
import { ToolbarBlock } from '../../../elements/components';
import { ToolbarFormatProps } from '../../../common/types';
import { toggleList } from '../transforms';
import { useSlate } from 'slate-react';

export const ToolbarList = (props: ToolbarFormatProps) => {
  const editor = useSlate();
  const { format } = props;

  return (
    <ToolbarBlock
      {...props}
      onMouseDown={(event: Event) => {
        event.preventDefault();
        toggleList(editor, format);
      }}
    />
  );
};
