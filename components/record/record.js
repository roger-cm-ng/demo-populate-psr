/* global URL */
/* eslint-disable jsx-a11y/media-has-caption, no-console */

import React, { forwardRef, useImperativeHandle, useState } from 'react';
// import PropTypes from 'prop-types';
// import css from './record-audio.scss';
import vmsg from 'vmsg/vmsg.es5';

// const recorder = new vmsg.Recorder({
//   wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
// });

const Record = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getData: () => ({

    })
  }));

  console.log('XXXXXXXXXXXXXXXXXXXX');

  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);

  // const record = async () => {
  //   setLoading(true);

  //   if (recording) {
  //     const blob = await recorder.stopRecording();
  //     console.log(blob);
  //     setLoading(false);
  //     setRecording(false);
  //     setRecordings(recordings.concat(URL.createObjectURL(blob)));
  //   } else {
  //     try {
  //       await recorder.initAudio();
  //       await recorder.initWorker();
  //       recorder.startRecording();
  //       setLoading(false);
  //       setRecording(true);
  //     } catch (e) {
  //       // console.error(e);
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <div>
      <button disabled={loading} onClick={() => console.log('record')}>
        {recording ? 'Stop' : 'Record'}
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {recordings.map(url => (
          <li key={url}>
            <audio src={url} controls />
          </li>
        ))}
      </ul>
    </div>
  );
});

Record.propTypes = {
};

export default Record;
