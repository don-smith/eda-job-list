import React, { PropTypes } from 'react'
import { Button, Dropdown, Icon, Label, Menu } from 'semantic-ui-react'

class Filter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {selectedCategoryId: null, selectedTagValue: null}
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onTagChange = this.onTagChange.bind(this)
  }

  onCategoryChange (event, data) {
    this.setState({
      selectedCategoryId: data.value,
      selectedTagValue: null
    })
  }

  onTagChange (event, data) {
    this.setState({
      selectedTagValue: data.value
    })
  }

  render () {
    const { categories, tags } = this.props
    const categoryOptions = categories.map(function (category) {
      return {
        key: category.id,
        text: category.name,
        value: category.id
      }
    })
    const tagOptions = tags
      .filter(tag => {
        return tag.category.id === this.state.selectedCategoryId
      })
      .map(tag => {
        return {
          text: tag.value,
          value: tag.value
        }
      })

    return (
      <div className='Filter'>
        <Menu fluid>
          <Dropdown
            fluid
            options={categoryOptions}
            onChange={this.onCategoryChange}
            placeholder='Category'
            selection
          />
          <Dropdown
            allowAdditions
            fluid
            options={tagOptions}
            onChange={this.onTagChange}
            placeholder='Tag'
            search
            selection
          />
          <Button
            basic
            circular
            disabled={this.state.selectedCategoryId === null || this.state.selectedTagValue === null}
            icon='plus'
            onClick={() => {
              this.props.addIncludeTag(this.state.selectedCategoryId, this.state.selectedTagValue)
            }}
          />
          <Button
            basic
            circular
            disabled={this.state.selectedCategoryId === null || this.state.selectedTagValue === null}
            icon='minus'
            onClick={() => {
              this.props.addExcludeTag(this.state.selectedCategoryId, this.state.selectedTagValue)
            }}
          />
        </Menu>
        {
          this.props.include.map(tag => {
            return (
              <Label as='a' key={tag.id}>
                <Icon color='green' name='check' />
                {tag.value}
                <Icon
                  onClick={() => this.props.removeIncludeTag(tag.id)}
                  name='delete'
                />
              </Label>
            )
          })
        }
        {
          this.props.exclude.map(tag => {
            return (
              <Label as='a' key={tag.id}>
                <Icon color='red' name='ban' />
                {tag.value}
                <Icon
                  onClick={() => this.props.removeExcludeTag(tag.id)}
                  name='delete'
                />
              </Label>
            )
          })
        }
      </div>
    )
  }
}

export default Filter

Filter.propTypes = {
  addExcludeTag: PropTypes.func.isRequired,
  addIncludeTag: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  column: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  exclude: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  include: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  removeExcludeTag: PropTypes.func.isRequired,
  removeIncludeTag: PropTypes.func.isRequired
}
