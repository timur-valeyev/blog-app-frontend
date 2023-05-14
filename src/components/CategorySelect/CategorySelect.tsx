import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import './CategorySelect.scss'


const CategorySelect = ({selectedCategory, setSelectedCategory}: any) => {
  const categories = [
    { id: 1, name: 'Путешествия' },
    { id: 2, name: 'Спорт' },
    { id: 3, name: 'Наука' },
    { id: 4, name: 'Культура' },
    { id: 5, name: 'Развлечения' },
    { id: 6, name: 'Литература' },
    { id: 7, name: 'IT-технологии' },
    { id: 8, name: 'Природа' },
    { id: 9, name: 'Разное' },
  ]

  const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const category = categories.find((c) => c.id === e.target.value)
    setSelectedCategory(category || null)
  }

  return (
      <FormControl fullWidth className='post__categories'>
        <InputLabel id='category-select-label'>Выберите категорию</InputLabel>
        <Select
          labelId='category-select-label'
          id='category-select'
          value={selectedCategory?.id || ''}
          onChange={handleCategoryChange}
        >
          {categories.map((category: any) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}

export default CategorySelect
