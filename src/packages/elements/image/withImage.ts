import { IMAGE } from './types';
import { ReactEditor } from 'slate-react';
import { insertImage } from './transforms';
import { isImageUrl } from './utils/isImageUrl';

export type Uploader = (file: File) => Promise<string>;

export const withImage = (uploader?: (file: File) => Promise<string>) => <T extends ReactEditor>(editor: T) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === IMAGE ? true : isVoid(element);
  };

  editor.insertData = (data: DataTransfer) => {
    const text = data.getData('text/plain');
    const { files } = data;
    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');
        if (mime === 'image') {
          // if (uploader) {
          //   uploader(file).then((url) => {
          //     if (url) insertImage(editor, url);
          //   });
          // } else {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
              const url = reader.result;
              const remoteUrlReplacer = uploader ? uploader(file) : undefined;
              if (url) insertImage(editor, url, remoteUrlReplacer);
            });
          // }
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
