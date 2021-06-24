import { useState } from 'react'
import styled from 'styled-components'
import AddList from './components/AddList'
import List from './components/List'
import './App.css'
import { cloneDeep } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`

const ListsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

function App() {
  const [lists, setLists] = useState([])
  const [addActive, setAddActive] = useState(false)

  const addListHandler = (title) => {
    setLists([...lists, { id: uuidv4(), title, cards: [] }])
    setAddActive(true)
  }

  const addCardsToList = (cardsArr, listId) => {
    const newLists = cloneDeep(lists)

    const updatedLists = newLists.map((l) => {
      if (l.id === listId) {
        l.cards = cardsArr
      }
      return l
    })
    setLists(updatedLists)
  }

  const onDragStart = (e, cardId, listId) => {
    const obj = {
      cardId,
      listId,
    }
    console.log('dragstart:', cardId, listId)
    e.dataTransfer.setData('dataObj', JSON.stringify(obj))
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = (e, dropListId) => {
    console.log(e.target)
    console.log('onDrop', dropListId)
    const dataObjInfo = e.dataTransfer.getData('dataObj')
    const data = dataObjInfo && JSON.parse(dataObjInfo)

    const newLists = cloneDeep(lists)

    if (data.listId === dropListId) {
      // same list
    } else {
      // other list

      console.log('dl', data.listId)
      const cardsArr = newLists.find((o) => o.id === data.listId).cards
      const cardObj = cardsArr.find((o) => o.id === data.cardId)

      const updatedLists = newLists.map((o) => {
        const cloned = Object.assign({}, o)
        if (cloned.id === data.listId) {
          console.log('remove list', data.cardId)
          const newCards = cloned.cards.filter((c) => c.id !== data.cardId)
          console.log('newCards', newCards)
          cloned.cards = newCards
        } else if (cloned.id === dropListId) {
          console.log('add list')
          const newCards = [...cloned.cards, cardObj]
          cloned.cards = newCards
        }
        return cloned
      })
      setLists(updatedLists)
    }
  }

  return (
    <Wrapper>
      <ListsWrapper>
        {lists &&
          lists.length > 0 &&
          lists.map((list, index) => (
            <List
              obj={list}
              key={index}
              addCardsToList={addCardsToList}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          ))}
        <AddList addListHandler={addListHandler} active={addActive} setActive={setAddActive} type="list" />
      </ListsWrapper>
    </Wrapper>
  )
}

export default App
