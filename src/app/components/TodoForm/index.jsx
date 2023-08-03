import './styles.css'

export function TodoForm({ submit, todoValue, onChange, numOfCharacters }) {
  return (
    <div className="add-todo-form-wrapper">
      <form>
        <input
          value={todoValue}
          maxLength="30"
          type="text"
          id="todo-input"
          name="name"
          placeholder="Enter todo"
          onChange={onChange}
        />
        <br />
        <p>{numOfCharacters}/30 Characters left</p>
        <input
          onClick={submit}
          className="add-todo"
          type="submit"
          value="Add"
        />
      </form>
    </div>
  )
}
