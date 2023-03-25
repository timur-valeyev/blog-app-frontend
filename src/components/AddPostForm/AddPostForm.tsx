import React, {useEffect} from 'react'
import {Button, Input} from '@material-ui/core'
import EditorJS from '@editorjs/editorjs'
import './AddPostForm.scss'
import MessageIcon from '@material-ui/icons/TextsmsOutlined'

interface AddPostFormProps {
    title?: string
}

const AddPostForm: React.FC<AddPostFormProps> = ({title}) => {
    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            placeholder: 'Введите текст...'
        })

        // return () => {
        //     editor.isReady.then(() => {
        //         editor.destroy()
        //     })
        //         .catch(e => console.log('Error Editor cleanup', e))
        // }
    }, [])

    return (
        <div>
            <h1>Создать пост</h1>
            <Input className='title' placeholder='Заголовок' defaultValue={title}/>
            <div id='editor'/>
            <Button variant='contained' color='primary'>
                <MessageIcon className='mr-10'/>
                Опубликовать
            </Button>
        </div>
    )
}

export default AddPostForm