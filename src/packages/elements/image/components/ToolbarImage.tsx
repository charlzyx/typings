import React from 'react';
import { ToolbarButton } from '../../../common';
import { ToolbarElementProps } from '../../../common/types';
import { insertImage } from '../transforms';
import { useEditor } from 'slate-react';

export const ToolbarImage = (props: ToolbarElementProps) => {
  const editor = useEditor();

  return (
    <ToolbarButton
      {...props}
      onMouseDown={(event: Event) => {
        event.preventDefault();

        const url = window.prompt('Enter the URL of the image:');
        if (!url) return;
        insertImage(editor, url);
      }}
    />
  );
};
