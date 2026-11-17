const RabbitItem = ({ rabbit, change, deleteRabbit }) => {
  return (
    <li>
      <div className="rabbit-details">
        {rabbit.name} {rabbit.age} {rabbit.color}{" "}
      </div>

      <div className="rabbit-buttons">
        <button onClick={() => change(rabbit.id)}>Ändra</button>{" "}
        <button onClick={() => deleteRabbit(rabbit.id)}>Ta bort</button>
      </div>
    </li>
  )
}

export default RabbitItem
