document.addEventListener('DOMContentLoaded', function() {
  /* 'use strict'; */

  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');

  const questions = [
    {
      question: 'Какого цвета бургер вы хотите?',
      answewrs: [
        {
          title: 'Стандарт',
          url: './image/burger.png'
        },
        {
          title: 'Черныйт',
          url: './image/burgerBlack.png'
        }
      ]
    }
  ]

  burgerBtn.style.display = 'none';
  let clientWidth = document.documentElement.clientWidth;

  if(clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }

  window.addEventListener('resize', function() {
    clientWidth = document.documentElement.clientWidth;
    if(clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  burgerBtn.addEventListener('click', function() {
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    playTest();
  });

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    playTest();
  });

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
  });

  document.addEventListener('click', function(event) {
    if(!event.target.closest('.modal-dialog') && !event.target.closest('.openModalButton') && !event.target.closest('.burger')) {
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active');
    }
  });
  
  const playTest = () => {
    let numberQuestion = 0;
    const renderAnswers = (index) => {
      questions[index].answewrs.forEach((answer) => {
        const answerItem = document.createElement('div');

        answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

        answerItem.innerHTML = `
          <input type="radio" id="answerItem1" name="answer" class="d-none">
          <label for="answerItem1" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}">
            <span>${answer.title}</span>
          </label>
        `;

        formAnswers.appendChild(answerItem);

        console.log('answerItem: ', answerItem);
      });
    }

    const renderQuestions = (indexQuestion) => {
      questionTitle.textContent = `${questions[indexQuestion].question}`;

      renderAnswers(indexQuestion);
    }
    renderQuestions(numberQuestion);

  }
});

/* 00 : 22 : 15 */