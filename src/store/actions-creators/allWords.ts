// import { Dispatch } from 'react';
// import {
//   allWordsAction,
//   allWordsActionTypes,
//   fetchObj,
//   setWordStatusType,
//   wordsType,
// } from 'types/lab1';
//
// export const setAllWords = (payload: wordsType) => {
//   return {
//     type: allWordsActionTypes.SET_ALL_WORDS,
//     payload,
//   };
// };
//
// export const setWordStatus = (payload: setWordStatusType) => {
//   return {
//     type: allWordsActionTypes.SET_WORD_STATUS,
//     payload,
//   };
// };
//
// export const fetchAllWords = () => {
//   return async (dispatch: Dispatch<allWordsAction>) => {
//     try {
//       let url = new URL('http://localhost:5000/');
//       url.searchParams.set('limit', '10');
//       url.searchParams.set('page', '30');
//       //('http://localhost:3000/?limit=10&page=50')
//
//       const response = await fetch(url.href);
//       const data: fetchObj = await response.json();
//
//       // Check this for working !!!
//       dispatch(setAllWords(data.words) as allWordsAction);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };
