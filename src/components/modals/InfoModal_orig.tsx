import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import {mlmodel_name, mlmodel_link, dataset_name, dataset_link} from '../../constants/mlmodel'
import sample_imgnetsketch_img from '../../n02123045_sketch_1.jpeg'


type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play Visionle" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the label predicted by <a href={mlmodel_link} target="_blank" rel="noreferrer" ><strong><span className="highlight-text">{mlmodel_name} vision model </span></strong></a> 
        for a randomly sampled image from <a href={dataset_link} target="_blank" rel="noreferrer" ><strong><span className="highlight-text">{dataset_name} dataset</span></strong> </a>
        in 6 tries. After each guess, the color of the tiles will change to show how close your guess was to the label (i.e. word).
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="G"
          status="correct"
        />
        <Cell value="O" />
        <Cell value="L" />
        <Cell value="D" />
        <Cell value="F" />
        <Cell value="I" />
        <Cell value="S" />
        <Cell value="H" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter G is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="A" />
        <Cell value="C" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="O"
          status="present"
        />
        <Cell value="R" />
        <Cell value="N" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter O is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="C" />
        <Cell value="O" />
        <Cell isRevealing={true} isCompleted={true} value="R" status="absent" />
        <Cell value="A" />
        <Cell value="L" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter R is not in the word in any spot.
      </p>
      <div>
      <div className="flex justify-center mb-1 mt-4">
        <Cell value="V" status="correct"/>
        <Cell value="I" status="correct"/>
        <Cell value="S" status="correct" />
        <Cell value="I" status="correct"/>
        <Cell value="O" status="correct"/>
        <Cell value="N" status="correct" />
        <Cell value="L" status="correct"/>
        <Cell value="E" status="correct"/>
      </div>
      <div>
        <ul className="circle text-sm text-gray-500 dark:text-gray-300"> 

          <li>A random image 🎲 from <a href={dataset_link} target="_blank" rel="noreferrer" ><strong><span className="highlight-text">{dataset_name} dataset </span></strong> </a> is chosen.
          <img src={sample_imgnetsketch_img} alt={`cat from n02123045 folder in ${dataset_name} dataset`}></img></li>
          <li>A <a href={mlmodel_link} target="_blank" rel="noreferrer" ><strong><span className="highlight-text">{mlmodel_name} vision model </span></strong></a> 
          predicts the probability distribution of possible labels for the chosen image.</li>
          <li>Top-1 predictions from the model or the ground-truth label 😏 is used for the challenge!</li>
        </ul>
        </div>
        </div>


        <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
        Visionle by{' '}
        <a
          href="https://github.com/orisenbazuru"
          target="_blank"
          rel="noreferrer" 
          className="underline font-bold"
        >
          orisenbazuru
        </a>
        .
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Based on{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          target="_blank"
          rel="noreferrer" 
          className="underline font-bold"
        >
          react-wordle
        </a>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Source code:{' '}
        <a
          href="https://github.com/orisenbazuru/visionle"
          target="_blank"
          rel="noreferrer" 
          className="underline font-bold"
        >
          github.com/orisenbazuru/visionle
        </a>
      </p>

    </BaseModal>
  )
}
