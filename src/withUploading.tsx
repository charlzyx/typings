import React, { FC } from 'react';
import Typings,{ Uploader }  from './index';

const uploader: Uploader = (file) => {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve('https://cdn.presslabs.com/wp-content/uploads/2019/03/best-wordpress-photo-gallery-plugins-in-2019.png')
      } else {
        // fallback as reject
        reject('https://cdn.presslabs.com/wp-content/uploads/2018/10/upload-error-880x462.png')
      }
    }, 3000);
  });
}

const WithUploading:FC = () => {
  return <Typings uploader={uploader} />
};

export default WithUploading;
