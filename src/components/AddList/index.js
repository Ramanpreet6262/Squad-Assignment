import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const AddListWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: ${(props) => (props.type === 'list' ? '200px' : '180px')};
  background-color: ${(props) => (props.type === 'list' ? '' : '#fff')};
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const AddList = ({ active, addListHandler, setActive, type }) => {
  const [listTitle, setListTitle] = useState('')

  const titleOnChange = (e) => {
    setListTitle(e.target.value)
  }

  const addAList = () => {
    if (listTitle !== '') {
      addListHandler(listTitle)
      setListTitle('')
    }
  }

  return (
    <Container>
      {!active ? (
        <button onClick={() => setActive(true)}>Add a {type}</button>
      ) : (
        <>
          <AddListWrapper type={type}>
            <input
              type="text"
              name="title"
              value={listTitle}
              onChange={(e) => titleOnChange(e)}
              placeholder={`Add a ${type}`}
            />
            <ButtonWrapper>
              <button onClick={() => addAList()}>Add</button>
              <button onClick={() => setActive(false)}>Delete</button>
            </ButtonWrapper>
          </AddListWrapper>
        </>
      )}
    </Container>
  )
}

export default AddList
