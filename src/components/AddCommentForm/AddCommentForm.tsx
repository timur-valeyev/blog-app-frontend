import './AddCommentForm.scss'
import { Button, Input } from '@material-ui/core'
import React, { useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { createComment, fetchComments } from '../../store/slices/commentsSlice'

interface IAddCommentFormProps {
  postId: string
}

const AddCommentForm: React.FC <IAddCommentFormProps> = ({postId}) => {
  const [clicked, setClicked] = useState(false)
  const [text, setText] = useState('')
  const dispatch = useAppDispatch()

  const sendComment = async () => {
    setClicked(false)

    const createdComment = await dispatch(createComment({text, postId}))
    if (createdComment) {
      dispatch(fetchComments())
    }
    setText('')
  }

  return (
    <div className='add-comment-form'>
      <Input
        className='comment-input'
        placeholder='Введите комментарий...'
        onFocus={() => setClicked(true)}
        minRows={clicked ? 5 : 1}
        value={text}
        onChange={(event) => setText(event.target.value)}
        fullWidth
        multiline
      />
      {clicked &&
        <Button className='send-button' onClick={sendComment}  variant='contained'>
          Отправить
        </Button>
      }
    </div>
  )
}

export default AddCommentForm