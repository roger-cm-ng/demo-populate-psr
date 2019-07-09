/* global URL document */
/* eslint-disable jsx-a11y/media-has-caption, no-console, react/button-has-type, react/no-access-state-in-setstate */

import React, { Fragment } from 'react';
import { record } from 'vmsg/vmsg.es5';

const Vidjs = () => {
  const rec = () => {
    record({
      wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
    }).then((blob) => {
        console.log('Recorded MP3', blob);
        const url = URL.createObjectURL(blob);
        const preview = document.createElement('audio');
        preview.controls = true;
        preview.src = url;
        document.body.appendChild(preview);
    });
  };

  return (
    <Fragment>
      <button onClick={rec}>Record</button>
    </Fragment>
  );
};

export default Vidjs;
