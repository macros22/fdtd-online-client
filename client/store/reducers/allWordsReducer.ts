import { allWordsAction, allWordsActionTypes, allWordsState, wordStatusType } from 'types/words';

const initialState: allWordsState = {
  words: [
    {id: 1, eng: 'neglect', rus: ['пренебрегать'], status: wordStatusType.LEARN},
    {id: 2, eng: 'shun', rus: ['избегать'], status: wordStatusType.LEARN},
    {id: 3, eng: 'proposal', rus: ['предложение'], status: wordStatusType.LEARN},
    {id: 4, eng: 'attainment', rus: ['достижение'], status: wordStatusType.LEARN},
    {id: 5, eng: 'unnecessary', rus: ['ненужный'], status: wordStatusType.LEARN},
    {id: 6, eng: 'substrate', rus: ['подложка'], status: wordStatusType.LEARN},
    {id: 7, eng: 'sophisticated', rus: ['сложный', 'утонченный'], status: wordStatusType.LEARN},
  ],
};

export const allWordsReducer = (state = initialState, action: allWordsAction): allWordsState => {
  switch (action.type) {
    case allWordsActionTypes.FETCH_ALL_WORDS:
      return { words: action.payload };

    case allWordsActionTypes.SET_ALL_WORDS:
      return { ...state, words: action.payload };

    case allWordsActionTypes.SET_WORD_STATUS:

      const newWords = state.words;
      newWords[action.payload.id - 1].status = action.payload.status;

      return { ...state, words: newWords };

    default:
      return state;
  }
};
