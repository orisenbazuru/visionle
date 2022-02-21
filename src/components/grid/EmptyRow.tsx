// import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'
import {word_length} from '../../lib/words'
const MAX_WORD_LENGTH = word_length
export const EmptyRow = () => {
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
