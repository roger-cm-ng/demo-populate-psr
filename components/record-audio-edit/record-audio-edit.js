/* global URL */
/* eslint-disable jsx-a11y/media-has-caption, no-console, react/button-has-type, react/no-access-state-in-setstate */

import React from 'react';
import vmsg from 'vmsg/vmsg.es5';

const recorder = new vmsg.Recorder({
  wasmURL: 'https://sugaryart-demo.herokuapp.com/vmsg/vmsg.wasm'
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
        await recorder.initAudio();
        console.log('init audio');
        console.log(recorder.initWorker());
        await recorder.initWorker();
        console.log('init worker');
        recorder.startRecording();
        console.log('start recording');
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
