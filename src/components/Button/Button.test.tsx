import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('<Button> test a basic render output', () => {
  it('should render the notepad', () => {
    const tree = renderer.create(<Button>Child</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
