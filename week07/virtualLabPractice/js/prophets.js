const endPoint = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

fetch(endPoint)
  .then( function (response) {
    return response.json();
  })
  .then( function (jsonObject) {
    const prophets = jsonObject['prophets']
    const utahborn = prophets.filter(prophet => prophet.birthplace == "Utah");
    prophets.forEach(prophet => {
      let card = document.createElement('section');
      let h2 = document.createElement('h2');
      h2.innerHTML = `${prophet.name} <span style="color:navy;">${prophet.lastname}</span>`;
      let pimg = document.createElement('img');
      pimg.setAttribute('src', prophet.imageurl);
      pimg.setAttribute('alt', `The official portrait of ${prophet.name} ${prophet.lastname}.` );

      card.appendChild(h2);
      card.appendChild(pimg);
      document.querySelector('div.cards').appendChild(card);
    })
  });
