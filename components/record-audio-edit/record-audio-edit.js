/* global URL */
/* eslint-disable jsx-a11y/media-has-caption, no-console, react/button-has-type, react/no-access-state-in-setstate */

import React from 'react';
import vmsg from 'vmsg/vmsg.es5';

const recorder = new vmsg.Recorder({
  wasmURL: 'http://localhost:3000/vmsg/vmsg.wasm'
});

export default class ReactAudioEdit extends React.Component {
  state = {
    isLoading: false,
    isRecording: false,
    recordings: []
  };

  record = async () => {
    this.setState({ isLoading: true });

    if (this.state.isRecording) {
      console.log('stop recording');
      const blob = await recorder.stopRecording();
      this.setState({
        isLoading: false,
        isRecording: false,
        recordings: this.state.recordings.concat(URL.createObjectURL(blob))
      });
    } else {
      try {
        console.log('init audio');
        await recorder.initAudio();
        console.log('init worker');
        await recorder.initWorker();
        console.log('start recording');
        recorder.startRecording();
        this.setState({ isLoading: false, isRecording: true });
      } catch (e) {
        console.log('error caught', e);
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    const { isLoading, isRecording, recordings } = this.state;
    return (
      <React.Fragment>
        <button disabled={isLoading} onClick={this.record}>
          {isRecording ? 'Stop' : 'Record'}
        </button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recordings.map(url => (
            <li key={url}>
              <audio src={url} controls />
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}