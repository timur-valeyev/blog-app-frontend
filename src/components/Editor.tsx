import React from 'react'
import EditorJS from '@editorjs/editorjs'


const Editor: React.FC = () => {
  React.useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Введите текст',
      autofocus: true
    })

    return () => {
      editor.isReady.then(() => {
        editor.destroy()
      }).catch(e => console.log('Error editor cleanup', e))
    }
  }, [])

  return (
      <div id='editor'></div>
  )
}

export default Editor