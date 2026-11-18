//aq0080

"use strict"

import { useRef, useState } from "react"

import "./App.css"
import RabbitItem from "./components/RabbitItem"

function App() {
  // Ett useState som håller reda på kaninlistan
  const [rabbits, setRabbits] = useState([
    {
      id: 1,
      name: "Skrutte Kanin",
      age: "7år",
      color: "Grå",
    },
    {
      id: 2,
      name: "Bamse Kanin",
      age: "2 år",
      color: "Brun och svart",
    },
    {
      id: 3,
      name: "Toffsy Kanin",
      age: "2 år",
      color: "Brun och vit",
    },
  ])

  // UseState som bevakar om man trycker på Ändra-knappen
  const [change, setChange] = useState(false)

  // UseState som håller reda på aktuellt kanin-id
  const [currentRabbitId, setCurrentRabbitId] = useState(0)

  // En useRef som bevakar formuläret
  const rabbitNameInput = useRef()
  // En useRef som bevakar formuläret
  const rabbitAgeInput = useRef()
  // En useRef som bevakar formuläret
  const rabbitColorInput = useRef()

  // Funktion för att lägga till en kanin
  const addRabbit = (event) => {
    // Gör så att sidan inte laddas om
    event.preventDefault()

    const inputValueName = rabbitNameInput.current.value

    const inputValueAge = rabbitAgeInput.current.value

    const inputValueColor = rabbitColorInput.current.value

    // Avbryt funktionen ifall det inte finns något inputValue
    if (!inputValueName || !inputValueAge || !inputValueColor) return

    // Gör ett objekt (som sedan ska vara ett listelement) av kaninen man skriver in, med id och name som attribut
    const rabbitItem = {
      // Om det handlar om att ändra en kanin ska id sättas till aktuellt kanin-id, annars får kaninen ett randomiserat id
      id: change ? currentRabbitId : crypto.randomUUID(),
      name: inputValueName,
      age: inputValueAge,
      color: inputValueColor,
    }

    // Om en kanin ska ändras letas den upp i kaninlistan och man ändrar den kaninen. Om kanin ska läggas till läggs kaninen till i listan.
    if (change) {
      // kopia på kaninlistan
      let tempRabbits = rabbits.map((rabbit) =>
        rabbit.id == currentRabbitId ? rabbitItem : rabbit,
      )
      setRabbits(tempRabbits)
      setChange(false)
    } else {
      setRabbits([...rabbits, rabbitItem])
    }

    // rensa inputfälten
    rabbitNameInput.current.value = ""
    rabbitAgeInput.current.value = ""
    rabbitColorInput.current.value = ""
  }

  // Funktion för att ändra uppgifter för en kanin
  const changeRabbit = (id) => {
    if (!id) return

    // Ändra change till true
    setChange(true)
    console.log(id)

    // Skapa kopia av kaninlistan
    const newList = [...rabbits]

    // Hitta den kaninen vi klickat på i listan, så vi vet vilken vi ska ändra
    const rabbitToChange = newList.find((rabbit) => rabbit.id === id)

    if (!rabbitToChange) return

    // Sätta värdet på aktuell kanin-id
    setCurrentRabbitId(id)

    console.log(rabbitToChange)

    // Skriva ut kaninens värden i formulärrutorna
    rabbitNameInput.current.value = rabbitToChange.name
    rabbitAgeInput.current.value = rabbitToChange.age
    rabbitColorInput.current.value = rabbitToChange.color
  }

  // Funktion för att ta bort en kanin
  const deleteRabbit = (id) => {
    if (!id) return

    // Kopia av kaninlistan
    const newList = [...rabbits]

    // Filtrera fram en lista med alla kaniner förutom den som ska raderas
    const updatedList = newList.filter((rabbit) => rabbit.id !== id)

    if (!updatedList) return

    // Ersätter den gamla kaninlistan med den uppdaterade listan där kaninen som ska raderas inte är kvar
    setRabbits(updatedList)
  }

  return (
    <>
      <h1>Välkommen till Kaninlistan!</h1>
      {/* Formulär för att lägga till en kanin i listan */}
      {/* När formuläret submittas aktiveras funktionen addRabbit */}
      {/* ref= kopplar ihop formuläret med useRef här ovanför, så att useRef kan bevaka formuläret */}
      <form className="rabbit-form" onSubmit={addRabbit}>
        <input
          type="text"
          placeholder="Skriv kaninens namn.."
          ref={rabbitNameInput}
        />
        <input
          type="text"
          placeholder="Skriv kaninens ålder..."
          ref={rabbitAgeInput}
        />
        <input
          type="text"
          placeholder="Skriv kaninens färg..."
          ref={rabbitColorInput}
        />
        <button type="submit">
          {change == false ? "Lägg till kanin" : "Spara nya uppgifter"}
        </button>
      </form>

      <div className="rabbit-list-box">
        <h2 className="rabbit-list-heading">Alla luddiga kaniner</h2>
        {/* Visa listan med kaniner på skärmen */}
        <ul className="all-rabbits">
          {/* loopar igenom listan med kaniner och gör en listitem av varje kanin */}
          {rabbits.map((rabbit) => (
            <RabbitItem
              key={rabbit.id}
              rabbit={rabbit}
              // change={() => changeRabbit(rabbit.id)}
              change={changeRabbit}
              deleteRabbit={deleteRabbit}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
