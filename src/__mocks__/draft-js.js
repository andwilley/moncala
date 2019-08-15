import React from 'react';

// mock the editor for unit tests
export class Editor extends React.Component {
  focus() {return undefined}
  render() {return null}
}

export const EditorState = {
  createEmpty: () => '',
  createWithContent: () => null,
  getCurrentContent: () => ({
    getPlainText: () => ''
  })
}

export const ContentState = {
  createFromText: text => text
}