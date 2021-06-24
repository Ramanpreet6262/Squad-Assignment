import styled from 'styled-components'
import { useState } from 'react'
import AddList from '../AddList'
import Card from '../Card'
import { v4 as uuidv4 } from 'uuid'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: 100%;
  max-width: 200px;
  margin-right: 10px;
  background-color: #ddd;
`

const ListTitle = styled.p`
  padding: 0;
  margin: 0 0 10px 0;
  color: #222;
`

const CardsWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`

const List = ({ obj, addCardsToList, onDragStart, onDragOver, onDrop }) => {
  const [addCardActive, setAddCardActive] = useState(false)

  const addCardHandler = (title) => {
    addCardsToList([...obj.cards, { title, id: uuidv4() }], obj.id)
    setAddCardActive(true)
  }

  return (
    <ListContainer onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, obj.id)}>
      <ListTitle>{obj.title}</ListTitle>
      <CardsWrapper>
        {obj &&
          obj.cards &&
          obj.cards.length > 0 &&
          obj.cards.map((card, index) => <Card obj={card} key={index} onDragStart={onDragStart} listId={obj.id} />)}
        <AddList addListHandler={addCardHandler} active={addCardActive} setActive={setAddCardActive} type="card" />
      </CardsWrapper>
    </ListContainer>
  )
}

export default List
