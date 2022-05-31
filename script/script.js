document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');

  const questions = {
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
    const renderQuestions = () => {
      questionTitle.textContent = `${questions.question}`;
      formAnswers.innerHTML = `
      <div class="answers-item d-flex flex-column">
        <input type="radio" id="answerItem1" name="answer" class="d-none">
        <label for="answerItem1" class="d-flex flex-column justify-content-between">
          <img class="answerImg" src="${questions.answewrs[0].url}">
          <span>${questions.answewrs[0].title}</span>
        </label>
      </div>
      `;
    }
    renderQuestions();
  }

});

/* 00 : 06 : 15 */