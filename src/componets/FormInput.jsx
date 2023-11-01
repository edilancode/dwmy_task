/* eslint-disable react/prop-types */
const FormInput = ({handleSubmit, value, setValue}) => {
  return (
    <form className='form' onSubmit={handleSubmit}>
          <input 
            type='text' 
            id="add"
            value={value} 
            placeholder='add a task...' 
            required
            onChange={(e) => setValue(e.target.value)}
          />
          <button type='submit'>Add</button>
        </form >
  )
}

export default FormInput;