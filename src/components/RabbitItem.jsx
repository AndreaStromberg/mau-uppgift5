const RabbitItem = ({ rabbit, change, deleteRabbit }) => {
  return (
    <li>
      {rabbit.name} {rabbit.age} {rabbit.color} {rabbit.id}{" "}
      <button onClick={() => change(rabbit.id)}>Ändra</button>{" "}
      <button onClick={() => deleteRabbit(rabbit.id)}>X</button>
    </li>
  )
}

export default RabbitItem
