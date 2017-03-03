import { shallow } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'

import Filter from './Filter'

describe('<Filter />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Filter />, div)
  })

  it('matches snapshot', () => {
    expect(
      shallow(<Filter />).getNode()
    ).toMatchSnapshot()
  })
})
