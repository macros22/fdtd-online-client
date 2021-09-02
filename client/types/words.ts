export enum wordStatusType {
  LEARN = 'learn',
  KNOW = 'know',
  UNKNOWN = 'unknown',
}

export type fetchObj = {
  allWordsCount: number;
  words: wordsType;
};

export interface allWordsState {
  words: wordsType;
}

export enum allWordsActionTypes {
  FETCH_ALL_WORDS = 'FETCH_ALL_WORDS',
  SET_ALL_WORDS = 'SET_ALL_WORDS',
  SET_WORD_STATUS = 'SET_WORD_STATUS',
}

export type oneWordType = {
  id: number;
  eng: string;
  rus: string[];
  status: wordStatusType;
}

//export type wordsType = Array<Array<string>>;
export type wordsType = Array<oneWordType>;

interface fetchAllWordsAction {
  type: allWordsActionTypes.FETCH_ALL_WORDS;
  payload: wordsType;
}

export type setWordStatusType = {
  id: number;
  status: wordStatusType;
};

interface setWordStatusAction {
  type: allWordsActionTypes.SET_WORD_STATUS;
  payload: setWordStatusType;
}

interface setAllWordsAction {
  type: allWordsActionTypes.SET_ALL_WORDS;
  payload: wordsType;
}

export type allWordsAction = fetchAllWordsAction | setWordStatusAction | setAllWordsAction;
