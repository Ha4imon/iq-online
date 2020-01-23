(function () {
  var mainMenu = document.querySelector('.main-nav__list');
  var hamburger = document.querySelector('.hamburger');

  var closeMenu = function () {
    mainMenu.classList.remove('main-nav__list--active');
    hamburger.classList.remove('hamburger--active');
    document.body.removeEventListener('click', clickBody);
  }

  var openMenu = function () {
    mainMenu.classList.add('main-nav__list--active');
    hamburger.classList.add('hamburger--active');
    setTimeout(function () {
      document.body.addEventListener('click', clickBody);
    }, 100);
  }

  var clickBody = function (evt) {
    if (!evt.target.closest('.main-nav__list')) {
      closeMenu();
    }
  };

  function addClickHandler() {
    hamburger.classList.contains('hamburger--active') ? closeMenu() : openMenu();
  };

  hamburger.addEventListener('click', addClickHandler);
})();



(function () {
  $("#slider-field2").slider({
    value: 1000000,
    min: 1000,
    max: 3000000,
    range: "min",
    slide: function (event, ui) {
      $("#calculator-field2").val(ui.value);
    }
  });
  $("#calculator-field2").val($("#slider-field2").slider("value"));

  $("#calculator-field2").on("change", function () {
    $("#slider-field2").slider("value", $("#calculator-field2").val());
  });


  $("#slider-field6").slider({
    value: 2000000,
    min: 1000,
    max: 3000000,
    range: "min",
    slide: function (event, ui) {
      $("#calculator-field6").val(ui.value);
    }
  });
  $("#calculator-field6").val($("#slider-field6").slider("value"));

  $("#calculator-field6").on("change", function () {
    $("#slider-field6").slider("value", $("#calculator-field6").val());
  });

  $("#calculator-field1").datepicker({
    altFormat: "dd.mm.yy",
    altField: "#calculator-field1",
  });


  $('#calculator-field1').mask('00.00.0000');
})();


(function () {
  var form = document.querySelector('#calculator-form');
  var total = form.querySelector('.calculator__total span');

  var showTotal = function (result) {
    total.textContent = result;
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    data = new FormData(form);
    sendData(data, showTotal);
  });

  var sendData = function (data, callback) {
    var URL = 'https://ha4imon.github.io/iq-online/calc.php';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        callback(xhr.response);
        alert('Успех');
      } else {
        alert('not ok');
      }
    });

    xhr.addEventListener('error', function () {
      alert('not ok');
    });

    xhr.addEventListener('timeout', function () {
      alert('not ok ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
