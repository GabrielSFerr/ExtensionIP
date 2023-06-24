document.addEventListener('DOMContentLoaded', function() {
  var checkButton = document.getElementById('checkButton');
  var ipInput = document.getElementById('ipInput');
  var result = document.getElementById('result');
  var result2 = document.getElementById('result2');

  checkButton.addEventListener('click', function() {
    var ipAddress = ipInput.value.trim();

    if (ipAddress === '') {
      result.textContent = 'Por favor, digite um IP.';
      result.classList.add('error');
      return;
    }

    // Limpar resultados anteriores
    result.textContent = '';
    result.classList.remove('warning');
    result2.textContent = '';
    result2.classList.remove('success');

    var apiUrl = 'https://api.abuseipdb.com/api/v2/check?ipAddress=' + ipAddress + '&maxAgeInDays=90';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'key': '8ab97a881b993dbfa79f169fd935f90aa9344adcceb9ba21ab0a8292ecbcf0d7093274d36f8afe15'
      }
    })
      .then(response => response.json())
      .then(abuseIpData => {
        console.log(abuseIpData);

        if (abuseIpData.data.abuseConfidenceScore >= 1) {
          result.textContent = 'Este IP é malicioso.';
          result.classList.add('warning');
        } else {
          result2.textContent = 'Este IP não é considerado malicioso.';
          result2.classList.add('success');
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
});
