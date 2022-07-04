import {memo} from 'react'
import {useDrag, useDrop} from 'react-dnd'

const style = {
  border: '1px solid blue',
  margin: '0.5rem',
  width: '100px',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'pointer',
  flexShrink:"0"
}
export const Card = memo(function Card({id, text, moveCard, findCard}) {
  // Card의 id로 원래 인덱스를 찾기
  const originalIndex = findCard(id).index;
  const [{isDragging}, dragRef] = useDrag(
    () => ({
      // type
      type: "CARD",
      item: {id, originalIndex},
      // collect 옵션을 넣지 않으면 dragging 중일 때 opacity가 적용되지 않는다!
      collect: (monitor) => ({
        // isDragging 변수가 현재 드래깅중인지 아닌지를 true/false로 리턴한다
        isDragging: monitor.isDragging(),
      }),

    }),
    [originalIndex],

  )
  const [, dropRef] = useDrop(
    () => ({
      // CARD 타입만 허용. 즉 useDrag와 타입이 다르면 아무 일도 일어나지 않음!
      accept: "CARD",
      // 요소를 드래그해서 다른 요소 위에서 hover할 때 자신이 아니면 위치를 바꿈!
      hover({id: draggedId}) {
        if (draggedId !== id) {
          // hover된 요소와 index 교환! -> 위치 교환
          const {index: overIndex} = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard],
  )
  return (
    // dragRef와 dropRef 장착
    <div ref={(node) => dragRef(dropRef(node))} style={{...style, opacity: isDragging ? 0.4 : 1}}>
      {text}
    </div>
  )
})
