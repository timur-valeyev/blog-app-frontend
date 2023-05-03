import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import React from 'react'

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleChange = (content: string) => {
    onChange(content)
  }

  return <ReactQuill value={value} onChange={handleChange} />
}

export default Editor