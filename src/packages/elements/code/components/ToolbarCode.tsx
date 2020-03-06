import { CODE } from '../types';
import React from 'react';
import { ToolbarButton } from '../../../common';
import { ToolbarElementProps } from '../../../common/types';
import { isBlockActive } from '../../queries';
import { toggleCode } from '../transforms';
import { useSlate } from 'slate-react';

export const ToolbarCode = (props: ToolbarElementProps) => {
  const editor = useSlate();

  return (
    <ToolbarButton
      {...props}
      active={isBlockActive(editor, CODE)}
      onMouseDown={(event: Event) => {
        event.preventDefault();

        toggleCode(editor);
      }}
    />
  );
};
