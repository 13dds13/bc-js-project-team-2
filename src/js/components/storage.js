const storageData = {
    watched: [],
    queue: [],
};

localStorage.setItem('storageData', JSON.stringify(storageData));

// const set = (type, movieData) => {
//   try {
//     const serializedState = localStorage.getItem(key);

//     return serializedState === null ? undefined : JSON.parse(serializedState);
//   } catch (err) {
//     console.error('Get state error: ', err);
//   }
// };