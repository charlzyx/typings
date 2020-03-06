import React from 'react';
import { ToolbarButton } from '../../../common';
import { ToolbarElementProps } from '../../../common/types';
import { insertLink } from '../transforms';
import { isLinkActive } from '../queries';
import { useSlate } from 'slate-react';

export const ToolbarLink = (props: ToolbarElementProps) => {
  const editor = useSlate();

  return (
    <ToolbarButton
      {...props}
      active={isLinkActive(editor)}
      onMouseDown={(event: Event) => {
        event.preventDefault();

        const url = window.prompt('Enter the URL of the link:');
        if (!url) return;
        insertLink(editor, url);
      }}
    />
  );
};
