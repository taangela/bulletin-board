import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = [
  { id: 1, title: 'Test title', content: 'test content' },
];

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent posts={mockProps} />);
    expect(component).toBeTruthy();
  });
});
