import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './Footer';

describe('<Footer> test a basic render output', () => {
  it('should render the notepad', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
