import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

const currentUser = sessionStorage.getItem('username') || 'anonymous'

export default class ChatRoomList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showCreateRoomModal: false,
      roomName: '',
      userList: [],
      chatMembersList: [],
      showLoadingIcon: false
    }

    this.renderUsers = this.renderUsers.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.addToChat = this.addToChat.bind(this)
    this.createRoom = this.createRoom.bind(this)
    this.renderChatList = this.renderChatList.bind(this)
  }

  componentWillMount() {
    this.setState({ showLoadingIcon: true })
  }

  componentWillReceiveProps () {
        let userList = []
        for (let user in this.props.users) {
          if(user.user_name !== currentUser) {
            userList.push(this.props.users[user])
          }
        }
        this.setState({ userList, showLoadingIcon: false })
  }

  showModal () {
    this.setState({ showCreateRoomModal: true })
  }

  hideModal () {
    this.setState({ showCreateRoomModal: false })
  }

  handleInput (e) {
    this.setState({ roomName: e.target.value })
  }

  addToChat (user) {
    let userList = this.state.userList
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].id == user.id) {
        userList.splice(i, 1)
        break
      }
    }
    let updatedUserList = userList
    this.setState({
      chatMembersList: [...this.state.chatMembersList, user],
      userList: updatedUserList
    })
  }

  createRoom () {
    const name = this.state.roomName
    const list = this.state.chatMembersList
    this.props.createRoom(name, list)
  }

  renderUsers (role) {
    const { users } = this.props
    if (role === 'invited') {
      return this.state.chatMembersList.map((user) => {
        return (
          <li key={user.id}>
            {user.first_name}
            {user.last_name}
          </li>
        )
      })
    }
    if (role == 'invite') {
      return this.state.userList.map((user) => {
        return (
          <li key={user.id} onClick={() => this.addToChat(user)}>
            {user.first_name}
            {user.last_name}
          </li>
        )
      })
    }
  }

  renderChatList () {
  	const { updateActiveChat } = this.props
    if(this.state.showLoadingIcon) {
      return ( <img src='../../assets/loader.gif' />)
    } else {
      return this.props.chats.chatList.map((chat) => {
        return (
          <li key={chat.id} onClick={() => updateActiveChat(chat)}>
            {chat.room}
          </li>
        )
      })  
    }
  }

  render () {
      return (
        <div className='chat-room-list'>
          <Button bsStyle='info' onClick={this.showModal}>
            Create a chat:
            <i className='fa fa-plus-circle' aria-hidden='true'></i>
          </Button>
          <h5>Chat Rooms</h5>
          <hr width='50%' />
          {this.renderChatList()}

          <Modal
            bsSize='small'
            show={this.state.showCreateRoomModal}
            onHide={this.hideModal}
            aria-labelledby='contained-modal-title-sm'>
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title-sm'>
                Create a room
              </Modal.Title>
            </Modal.Header>
            <form onSubmit={this.createRoom}>
              <Modal.Body>
                <input
                  className='form-control'
                  value={this.state.roomName}
                  onChange={this.handleInput}
                  placeholder='Room Name' />
                <hr width='50%' />
                <div className='friendsList'>
                  <h5>Invite friends</h5>
                  <ul>
                    {this.renderUsers('invite')}
                  </ul>
                  <h5>Invited friends</h5>
                  <ul>
                    {this.renderUsers('invited')}
                  </ul>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle='info' type='submit' onClick={this.hideModal}>
                  Make chat
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      )

    }
  }

