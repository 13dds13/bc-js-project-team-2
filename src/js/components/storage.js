
const watched = [
    {
        genre_ids: [1],
        video: false,
        vote_average: 6.7,
        overview: "After she's irreversibly poisoned, a ruthless crim…ond with the daughter of one of her past victims.",
        release_date: '2021-09-10',
        title: 'Kate',
    },
    {
        backdrop_path: '/xDnFlNrNUoSKPq4uptnhYmUZNpm.jpg',
        genre_ids: [2],
        original_language: 'en',
        original_title: 'Malignant',
        poster_path: '/dGv2BWjzwAz6LB8a8JeRIZL8hSz.jpg',
    },
    {
        genre_ids: [3],
        poster_path: '/xeItgLK9qcafxbd8kYgv7XnMEog.jpg',
        video: false, id: 566525,
        overview: 'Shang-Chi must confront the past he thought he lef…the web of the mysterious Ten Rings organization.',
        release_date: '2021-09-01',
    },
    {
        genre_ids: [4],
        original_title: 'The Suicide Squad',
        poster_path: '/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg',
        id: 436969,
        title: 'The Suicide Squad',
        overview: 'Supervillains Harley Quinn, Bloodsport, Peacemaker…he remote, enemy-infused island of Corto Maltese.',
    },];
const queue = [
    {
        genre_ids: [1],
        video: false,
        vote_average: 6.7,
        overview: "After she's irreversibly poisoned, a ruthless crim…ond with the daughter of one of her past victims.",
        release_date: '2021-09-10',
        title: 'Kate',
    },
    {
        backdrop_path: '/xDnFlNrNUoSKPq4uptnhYmUZNpm.jpg',
        genre_ids: [2],
        original_language: 'en',
        original_title: 'Malignant',
        poster_path: '/dGv2BWjzwAz6LB8a8JeRIZL8hSz.jpg',
    },
    {
        genre_ids: [3],
        poster_path: '/xeItgLK9qcafxbd8kYgv7XnMEog.jpg',
        video: false, id: 566525,
        overview: 'Shang-Chi must confront the past he thought he lef…the web of the mysterious Ten Rings organization.',
        release_date: '2021-09-01',
    },
    {
        genre_ids: [4],
        original_title: 'The Suicide Squad',
        poster_path: '/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg',
        id: 436969,
        title: 'The Suicide Squad',
        overview: 'Supervillains Harley Quinn, Bloodsport, Peacemaker…he remote, enemy-infused island of Corto Maltese.',
    },];
localStorage.setItem('watched', JSON.stringify(watched));
localStorage.setItem('queue', JSON.stringify(queue));

const load = key => {
    try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

export default { load };
