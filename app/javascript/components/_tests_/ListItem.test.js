import React from 'react';
import renderer from 'react-test-renderer';
import ListItem from '../ListItem';

describe('<ListItem />', () => {
  test('Render ListItem component', () => {
    const mockPlace={
      name: 'Mock Restaurant',
      photos: [{
        getUrl: () => {
          return 'www.image.png'
        }
      }],
      rating: 3.8,
      user_ratings_total: 135,
      price_level: 2,
      vicinity: '123 Lombard Street',
      place_id: 'abc123',
    }

    const component = renderer.create(
      <ListItem
        place={mockPlace}
      />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
