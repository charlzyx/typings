import React, { FC } from 'react';
import Typings,{ Uploader }  from './index';

const uploader: Uploader = (file) => {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve('https://i.loli.net/2020/03/06/3MfbV9SzAHoCUXP.jpg')
      } else {
        // fallback as reject
        reject('https://i.loli.net/2020/03/06/tbm5lZSc2d8uYE1.jpg')
      }
    }, 3000);
  });
}

const WithUploading:FC = () => {
  return <Typings uploader={uploader} />
};

export default WithUploading;
