var update = document.getElementById('update');
update.addEventListener("click", function () {
  // Send PUT Request here
  fetch('quotes', {
    method: 'put',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader',
      'quote': 'I find your lack of faith disturbing.'
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  }).then(data => {
    console.log(data);
    window.location.reload(true);
  });
});

var del = document.getElementById('delete');
del.addEventListener('click', function () {
  // Send DELETE Request here
  fetch('quotes', {
    method: 'delete',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  }).then(data => {
    console.log(data);
    window.location.reload(true);
  });
});
