import React from 'react';
import { ToolbarButton } from '../../common';
import { ToolbarFormatProps } from '../../common/types';
import { isBlockActive } from '../queries';
import { useSlate } from 'slate-react';

export const ToolbarBlock = ({
  format,
  onMouseDown,
  ...props
}: ToolbarFormatProps) => {
  const editor = useSlate();

  if (!onMouseDown) {
    onMouseDown = (event: Event) => {
      event.preventDefault();
      editor.toggleBlock(format);
    };
  }

  return (
    <ToolbarButton
      {...props}
      active={isBlockActive(editor, format)}
      onMouseDown={onMouseDown}
    />
  );
};
