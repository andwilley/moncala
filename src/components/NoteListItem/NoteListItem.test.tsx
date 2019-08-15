import React from 'react';
import renderer from 'react-test-renderer';
import NoteListItem from './NoteListItem';

describe('<NoteListItem> test a basic render output', () => {
  const note = {
    id: 0,
    content: 'test',
    dateCreated: '',
    dateModified: ''
  };
  it('should render the notepad inactive', () => {
    const tree = renderer
      .create(
        <NoteListItem
          note={note}
          isActive={false}
          onClick={() => undefined}
          onDelete={() => undefined}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the notepad active', () => {
    const tree = renderer
      .create(
        <NoteListItem
          note={note}
          isActive={true}
          onClick={() => undefined}
          onDelete={() => undefined}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
