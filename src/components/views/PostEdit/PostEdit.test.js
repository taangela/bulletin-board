import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

const mockProps = {
  posts: [
    { id: '1', title: 'test', text: 'test' },
    { id: '2', title: 'test2', text: 'test 2' },
  ],
  user: {
    id: '5',
    logged: true,
  },
  match: { params: { id: '1' } },
};

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
