import { Editor, Transforms } from 'slate';

import { IMAGE } from '../types';

let remoteId = 1;

export const insertImage = (editor: Editor, url: string | ArrayBuffer, remoteUrlReplacer?:  Promise<string>) => {
  const text = { text: '' };
  let image = { type: IMAGE, url, children: [text], rid: 0, uploading: false };
  if (remoteUrlReplacer) {
    const uid = remoteId++;
    image.rid = uid;
    image.uploading = true;

    remoteUrlReplacer.then((remoteUrl) => {
      if (remoteUrl) {
        Transforms.setNodes(editor, {
          url: remoteUrl,
          uploading: false
        }, {
          split: true,
          match: n => {
            return n.rid === uid;
          },
        })

      }
    }).catch((failedUrl) => {
      Transforms.setNodes(editor, {
        url: failedUrl,
        uploading: false
      }, {
        split: true,
        match: n => n.rid === uid,
      })

    });
  }

  Transforms.insertNodes(editor, image);
};
