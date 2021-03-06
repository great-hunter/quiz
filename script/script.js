  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
  import { getDatabase, ref, child, get, push, set } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js"

document.addEventListener('DOMContentLoaded', function() {

  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');
  const nextButton = document.querySelector('#next');
  const prevButton = document.querySelector('#prev');
  const modalDialog = document.querySelector(".modal-dialog");
  const sendButton = document.querySelector('#send');
  const modalTitle = document.querySelector('.modal-title');

  const firebaseConfig = {
    apiKey: "AIzaSyAe4wRS1egzTMofe1UWWz0ib-EfWkZFaDg",
    authDomain: "testburger-edb21.firebaseapp.com",
    databaseURL: "https://testburger-edb21-default-rtdb.firebaseio.com",
    projectId: "testburger-edb21",
    storageBucket: "testburger-edb21.appspot.com",
    messagingSenderId: "590116855181",
    appId: "1:590116855181:web:1499a5662d98b14da2f1c4",
    measurementId: "G-ZQC8B9GN02"
  };

  const app = initializeApp(firebaseConfig);  

  const getData = () => {
    formAnswers.textContent = 'LOAD';

    nextButton.classList.add('d-none');
    prevButton.classList.add('d-none');

    const dbRef = ref(getDatabase());
    get(child(dbRef, `questions`)).then((snapshot) => {
        playTest(snapshot.val());
    });
  };


  let count = -100;

  modalDialog.style.top = count + "%";

  const animateModal = () => {
    modalDialog.style.top = count + "%";
    count +=3;
    
    if (count < 0) {
      requestAnimationFrame(animateModal);
    } else {
      count = -100;
    }  
  };

  burgerBtn.style.display = 'none';
  let clientWidth = document.documentElement.clientWidth;

  if (clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }

  window.addEventListener('resize', function() {
    clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  burgerBtn.addEventListener('click', function() {
    burgerBtn.classList.add('active');
    requestAnimationFrame(animateModal);
    modalBlock.classList.add('d-block');
    getData();
  });

  btnOpenModal.addEventListener('click', () => {
    requestAnimationFrame(animateModal);
    modalBlock.classList.add('d-block');
    getData();
  });

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
  });

  document.addEventListener('click', function(event) {
    if (
      !event.target.closest('.modal-dialog') && 
      !event.target.closest('.openModalButton') && 
      !event.target.closest('.burger')
    ) {
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active');
    }
  });
  
  const playTest = (questions) => {

    const finalAnswers = [];
    const obj = {};
    let numberQuestion = 0;
    modalTitle.textContent = "???????????? ???? ????????????";

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');

        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}">
            <span>${answer.title}</span>
          </label>
        `;

        formAnswers.appendChild(answerItem);

      });
    }

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = '';

      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswers(indexQuestion);
        nextButton.classList.remove('d-none');
        prevButton.classList.remove('d-none');
        sendButton.classList.add('d-none');
      }

      if (numberQuestion === 0) {
        prevButton.classList.add('d-none');
      }

      if (numberQuestion === questions.length) {
        questionTitle.textContent = '';
        modalTitle.textContent = '';
        nextButton.classList.add('d-none');
        prevButton.classList.add('d-none');
        sendButton.classList.remove('d-none');
        formAnswers.innerHTML = `
          <div class="form-group">
            <label for="numberPhone">Enter your number</label>
            <input type="phone" class="" id="numberPhone">
          </div>
        `;

        const numberPhone = document.getElementById('numberPhone');
        numberPhone.addEventListener('input', (event) => {
          event.target.value = event.target.value.replace(/[^0-9+-]/, '');
        });
      }

      if (numberQuestion === questions.length + 1) {
        sendButton.classList.add('d-none');
        formAnswers.textContent = '?????????????? ???? ???????????????????? ????????!';

         for (let key in obj) {
          let newObj = {};
          newObj[key] = obj[key];
          finalAnswers.push(newObj);
        } 

        setTimeout(() => {
          modalBlock.classList.remove('d-block');
        }, 3000);
      }

    }
    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      
      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion === questions.length) {
          obj['?????????? ????????????????'] = input.value;
        }
      });
      
    };

    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };
    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };
    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);

    /*   const dbRef = ref(getDatabase());
      const childRef = child(dbRef, `contacts`);
      push(childRef, finalAnswers); */
     
      push(
        child(
          ref(
            getDatabase()
            ),
             `contacts`
        ),
        finalAnswers
      );
      

     console.log(finalAnswers);
    };
  };



});

/* 00 : 22 : 00 */