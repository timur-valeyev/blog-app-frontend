import React from 'react'
import { Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'


const UploadImageForm = ({ setFile }: any) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <>
      <input
        accept='image/*'
        id='contained-button-file'
        multiple
        type='file'
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor='contained-button-file'>
        <Button
          variant='contained'
          color='default'
          startIcon={<CloudUploadIcon />}
          component='span'
        >
          Загрузить изображение
        </Button>
      </label>
    </>
  )
}

export default UploadImageForm
