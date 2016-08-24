/*
A site contains a listing of doctors.
Users can browse for doctors given a specific specialty, area, review score, etc.

Write a function which when given a doctor, provides a list of similar doctors,
in a prioritized order. You define what similar means and the result ordering, but clearly
document any assumptions in your code. You can assume the entire directory of doctors fits
into memory, and preferably write in Javascript.

Aim to spend a maximum of 45 minutes on this coding challenge. If applicable, note down any
remaining thoughts or things you would want to improve on with more time.
*/

function getAndSendData(e) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var doctors = JSON.parse(xhr.responseText);
      doctors.sort(dynamicSort(e.id));
      var html = '';
      for (var i = 0; i < doctors.length; i++) {
        html += '<tr>';
        html += '<td>' + doctors[i].name + '</td>';
        html += '<td>' + doctors[i].specialty + '</td>';
        html += '<td>' + doctors[i].area + '</td>';
        html += '<td>' + doctors[i].score + '</td>';
        html += '</tr>';
      }
      document.getElementById('tableBody').innerHTML = html;
    }
  };
  xhr.open('GET', 'doctors.json');
  xhr.send();
}

function dynamicSort(property) {
  var sortOrder = 1;
  return function (a,b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}
