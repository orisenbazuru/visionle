import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import { FOLDERNAMES } from '../constants/foldernames'
import { num_images_perclass } from '../constants/mlmodel'

// import of data and model json objects
import indx_label_map from '../constants/jsonobj/index_label_map.json'
import pred_label_map from '../constants/jsonobj/modellabel_map.json'
import true_label_map from '../constants/jsonobj/truelabel_map.json'

// console.log('WORDS:', WORDS)
// console.log('VALID_GUESSES:', VALID_GUESSES)
export const isWordInWordList = (word: string) => {
  console.log('---isWordInWordList---', )
  console.log('word:', word)
  console.log(WORDS.includes(word.toLowerCase()))
  console.log(VALID_GUESSES.includes(word.toLowerCase()))
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALID_GUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(guess)

  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(guess[i])
    }
    if (statuses[i] === 'correct' && word[i] !== guess[i]) {
      return WRONG_SPOT_MESSAGE(guess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of word) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

// export const getWordOfDay = () => {
//   // January 1, 2022 Game Epoch
//   const epochMs = new Date('February 17, 2022 00:00:00').valueOf()
//   const now = Date.now()
//   const msInDay = 86400000
//   const index = Math.floor((now - epochMs) / msInDay)
//   const nextday = (index + 1) * msInDay + epochMs
//   console.log(WORDS[index % WORDS.length].toUpperCase())
//   console.log(index)
//   console.log(nextday)
//   return {
//     solution: WORDS[index % WORDS.length].toUpperCase(),
//     solutionIndex: index,
//     tomorrow: nextday,
//   }
// }

export const readJSONObj = (jobj:object) => {

  return JSON.parse(JSON.stringify(jobj))

}
export const getWordOfDay = () => {
  // February 18, 2022 Game Epoch

  // const rndseed = '123'
  const gen = require('random-seed')
  // let randgen = gen.create(rndseed);
  // let out = {}

  // var rand4 = gen.create(rndseed);
  // var rand5 = new gen(rndseed);
  // var rand6 = gen(rndseed);
  // console.log('randseed')
  // console.log(rand4.random())
  // console.log(rand5.random())
  // console.log(rand6.random())
  // console.log(rand4.range(10000))
  // console.log(rand5.range(10000))
  // console.log(rand6.range(10000))
  // console.log('------')
  // console.log(indx_label_map)
  // console.log(pred_label_map)
  // console.log(true_label_map)
  // console.log(FOLDERNAMES)  


  const epochMs = new Date('February 21, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000 // number of milliseconds in 24h
  // index of the foldername
  const index = Math.floor((now - epochMs) / msInDay) 
  const nextday = (index + 1) * msInDay + epochMs

  const chosen_foldername = FOLDERNAMES[index % FOLDERNAMES.length]
  
  // support for getting model's prediction (next release of the app :) )
  // let label_src = gen.create(msInDay.toString()+index.toString()).range(2)
  const label_src = 0 // offering ground-truth for now !
  let image_indx = gen.create(msInDay.toString()+index.toString()).range(num_images_perclass)
  let indx_label = NaN

  // console.log('index in list of foldernames:', index)
  // console.log('foldername:', chosen_foldername)
  // console.log('label_src:', label_src)
  // console.log('image_indx:', image_indx)
  // console.log(readJSONObj(true_label_map))
  // indx_label_map
  // console.log(chosen_foldername)
  // console.log(label_src)
  // console.log('succeed!')
  // console.log(typeof(label_src))
  // console.log(typeof(indx_label_map))
  // console.log(JSON.stringify(indx_label_map))
  // console.log(JSON.parse(JSON.stringify(indx_label_map)))
  // console.log(JSON.parse(JSON.stringify(indx_label_map))[label_src])
  // console.log('another succeed!')
  // console.log(readJSONObj(indx_label_map))
  // console.log(readJSONObj(indx_label_map)[label_src])
  // use ground-truth
  

  if (label_src === 0){
     
    indx_label = readJSONObj(true_label_map)[chosen_foldername]

  }else{ // use model prediction

    indx_label = readJSONObj(pred_label_map)[chosen_foldername][image_indx]
  }

  let selec_word:string = readJSONObj(indx_label_map)[indx_label].toUpperCase()
  // selec_word = 'Porphyrioporphyrio'.toUpperCase()
  const word_length = selec_word.length

  // console.log('selected word:', selec_word)

  return {solution:selec_word,
          solutionIndex:index,
          tomorrow:nextday,
          word_length:word_length,
          chosen_foldername,
          image_indx
        }

}

export const { solution, solutionIndex, tomorrow, word_length, chosen_foldername, image_indx } = getWordOfDay()
