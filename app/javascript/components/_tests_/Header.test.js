import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Header';

describe('<Header />', () => {
  test('Render Header component', () => {
    const component = renderer.create(
      <Header handleSearch={jest.fn()} handleSortClick={jest.fn()} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
