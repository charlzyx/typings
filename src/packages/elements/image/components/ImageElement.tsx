import { RenderElementProps, useFocused, useSelected } from 'slate-react';

import { IMAGE } from '../types';
import React from 'react';
import styled from 'styled-components';

const Image = styled.img<{ selected: boolean; focused: boolean }>`
  display: block;
  max-width: 100%;
  max-height: 20em;
  padding: 10px 0;
  box-shadow: ${props =>
    props.selected && props.focused ? '0 0 0 3px #B4D5FF' : 'none'};
`;

export const ImageElement = ({
  attributes,
  children,
  element,
  ...others
}: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div {...attributes} data-slate-type={IMAGE}>
      <div contentEditable={false}>
        <Image crossOrigin="anonymous" src={element.url} alt={element.uploading ? '正在上传': ''} selected={selected} focused={focused} />
        {element.uploading ? <span style={{ textAlign: 'center', color: '#cecece' }}>正在上传...</span>: null}
      </div>
      {children}
    </div>
  );
};
