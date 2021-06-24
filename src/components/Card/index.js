import styled from 'styled-components'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: 100%;
  max-width: 180px;
  margin-bottom: 10px;
  background-color: #fff;
`
const CardTitle = styled.p`
  padding: 0;
  margin: 0 0 10px 0;
  color: #222;
`

const Card = ({ obj, onDragStart, listId }) => {
  return (
    <CardContainer draggable onDragStart={(e) => onDragStart(e, obj.id, listId)} id={`${listId}-${obj.id}`}>
      <CardTitle>{obj.title}</CardTitle>
    </CardContainer>
  )
}

export default Card
