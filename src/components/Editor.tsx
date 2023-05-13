import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import React from 'react'

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video']
    ],
    imageDropAndPaste: true
  }
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleChange = (content: string) => {
    onChange(content)
  }

  return <ReactQuill value={value} onChange={handleChange} modules={modules} />
}

export default Editor