import React from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FormValues } from '../types'
import InputField from './InputField'

interface IFormBox {
  hide: () => void
  show: boolean
}

const FormBox: React.FC<IFormBox> = ({ hide, show }) => {
  
  // Form state
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()

  // addFunction
  const onSubmit = async (data: any) => {
    const newEntry = {
      ...data,
      validUntil: new Date()
    }
    const response = await fetch('https://serpindex-demo.svc.violetvault.com/api/Index', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newEntry)
    })
    console.log(response)
    reset()
    hide()
  }
  

  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add new entry</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>      
          <InputField
            error={errors.category && errors?.category.message}
            func={register("category", {required: 'This field should not be empty', maxLength: 80})}
            placeholder="Category"
          />
          <InputField
            error={errors.url && errors?.url.message}
            func={register("url", {required: 'This field should not be empty', maxLength: 80})}
            placeholder="URL"
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-secondary" onClick={hide}>Cancel</button>
          <button type="submit" className="btn btn-primary">Add entry</button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default FormBox