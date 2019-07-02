import { FormGroup, Label, Input } from 'reactstrap';
import React, { PureComponent } from 'react'

class Comments extends PureComponent {

  state = {
    comment: "",
  }

  async handleChange(event) {
    var val = event.target.value
    await this.setState({
      comment: event.target.value
    })
  }
  onblur(event) {
    const questionId = this.props.listNameFromParent
    localStorage.setItem("comments", this.state.comment)
    var commentStorage = localStorage.getItem("comments")
    questionId.comment = commentStorage
  }

  render() {
    
    return <FormGroup>
      <Label for="exampleText">Comment</Label>
      <Input
        style={{ margin: '0', width: "100%", }}
        type="textarea"
        id="exampleText"
        onBlur={(event) => this.onblur(event)}
        // onBlur={this.props.onBlur}
        // onChange={this.props.handleChange}
        // value={this.props.selectedCategory.comment}
        value={this.state.comment}
        name="comment"
        placeholder="First place comment if needed"
        onChange={this.handleChange.bind(this)}
      />
    </FormGroup>

  };
}

export default Comments;






