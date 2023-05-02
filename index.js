$(document).ready(function(){
    var currentQuestion;
    var timeLeft = 10;
    var interval;
    var score = 0;
    var highScore = 0;

    var startGame = function () {
        if (!interval) {
          if (timeLeft === 0) {
            updateTimeLeft(10);
            updateScore(-score); 
            updateHighScore(highScore);
          }
          interval = setInterval(function () {
            updateTimeLeft(-1);
            if (timeLeft === 0) {
              clearInterval(interval);
              interval = undefined;
            }
          }, 1000);  
        }
      }

    $('#user-input').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    var randomNumberGenerator = function (size) {
      return Math.ceil(Math.random() * size);
    }
    

    var questionGenerator = function () {
        var question = {};
        var num1 = randomNumberGenerator(10);
        var num2 = randomNumberGenerator(10);
        if ($('#add').is(':checked')) {
          question.answer = num1 + num2;
          question.equation = String(num1) + " + " + String(num2);
          $('#subtract').prop('checked', false);
          $('#multiply').prop('checked', false);
          $('#divide').prop('checked', false);
          }
        if ($('#subtract').is(':checked')) {
          question.answer = num1 - num2;
          while (num1 < num2) {
            num1 = randomNumberGenerator(10);
            num2 = randomNumberGenerator(10);
          }
          question.equation = String(num1) + " - " + String(num2);
          $('#multiply').prop('checked', false);
          $('#divide').prop('checked', false);
          $('#add').prop('checked', false);
        }  
        if ($('#multiply').is(':checked')) {
          question.answer = num1 * num2;
          question.equation = String(num1) + " x " + String(num2);
          $('#divide').prop('checked', false);
          $('#add').prop('checked', false);
          $('#subtract').prop('checked', false);
        }
        if ($('#divide').is(':checked')) {
          question.answer = num1 / num2;
          while (num1 % num2 !== 0) {
            num1 = randomNumberGenerator(10);
            num2 = randomNumberGenerator(10);
          }
          question.equation = String(num1) + " / " + String(num2);
          $('#add').prop('checked', false);
          $('#subtract').prop('checked', false);
          $('#multiply').prop('checked', false);
        }
        return question;
      }
    
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);

    var checkAnswer = function (userInput, answer) {
        if (userInput === answer) {
            renderNewQuestion();
            $('#user-input').val('');
            updateTimeLeft(+1);
        }
    }

    $('#user-input').on('keyup', function () {
        console.log(Number($(this).val()), currentQuestion.answer);
    });

    var renderNewQuestion = function () {
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);
    }

    var checkAnswer = function (userInput, answer) {
        if(userInput === answer) {
            renderNewQuestion();
            $('#user-input').val('');
            updateTimeLeft(+1);
            updateScore(+1);
            updateHighScore(highScore);
        }
    };

    $('#user-input').on('keyup', function () {
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    renderNewQuestion();

    setInterval(function () {
        console.log('1 sec passed')
    }, 1000);


    var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    }

    var updateScore = function (amount) {
        score += amount;
        $('#score').text(score);
    };

    var updateHighScore = function (amount) {
        highScore = amount;
        if (highScore < score) {
        highScore = score;
        }
        $('#high-score').text(highScore);
    }

  });
