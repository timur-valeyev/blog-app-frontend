import './AddCommentForm.scss'
import {Button, Input} from '@material-ui/core'
import {useState} from 'react'

const AddCommentForm = () => {
    const [clicked, setClicked] = useState(false)
    const [text, setText] = useState('')

    const sendComment = () => {
        setClicked(false)
        setText('')
    }

    return (
        <div className='add-comment-form'>
            <Input
                className="comment-input"
                placeholder="Введите комментарий..."
                onFocus={() => setClicked(true)}
                minRows={clicked ? 5 : 1}
                value={text}
                onChange={(event) => setText(event.target.value)}
                fullWidth
                multiline
            />
            {clicked &&
                <Button className='send-button' onClick={sendComment} color='primary' variant='contained'>
                    Отправить
                </Button>
            }
        </div>
    )
}

export default AddCommentForm