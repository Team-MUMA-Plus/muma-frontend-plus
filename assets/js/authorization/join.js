function checkPostParams() {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = '';
      var extraAddr = '';
      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        document.getElementById('sample6_extraAddress').value = extraAddr;
      } else {
        document.getElementById('sample6_extraAddress').value = '';
      }
      document.getElementById('sample6_postcode').value = data.zonecode;
      document.getElementById('sample6_address').value = addr;
      document.getElementById('sample6_detailAddress').focus();
    },
  }).open();
}

// 생년월일 유효성 검사
function birthdayCheck(birthday) {
  birthday = birthday.replace(/-/gi, ''); // '-' 문자 모두 '' 변경

  const year = Number(birthday.substr(0, 4)); // 입력한 값의 0~4자리까지 (연)
  const month = Number(birthday.substr(4, 2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월)
  const day = Number(birthday.substr(6, 2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일)
  const today = new Date(); // 오늘 날짜를 가져옴
  const yearNow = today.getFullYear(); // 올해 연도 가져옴

  if (birthday.length <= 8) {
    if (1900 > year || year > yearNow) {
      // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다.
      return false;
    } else if (month < 1 || month > 12) {
      return false;
    } else if (day < 1 || day > 31) {
      return false;
    } else if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
      return false;
    } else if (month == 2) {
      // 2월달일때
      // 2월 29일(윤년) 체크
      const isleap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
      if (day > 29 || (day == 29 && !isleap)) {
        return false;
      } else {
        return true;
      } //end of if (day>29 || (day==29 && !isleap))
    } else {
      return true;
    } //end of if
  } else {
    // 입력된 생년월일이 8자 초과할때 : false
    return false;
  }
}

async function join() {
  // 변수 선언
  const url = `${BASE_URL}/api/v1/users/join`;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordCheck = document.getElementById('passwordCheck').value;
  const name = document.getElementById('name').value;
  const userName = document.getElementById('nickname').value;
  const birth = document.getElementById('birth').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const postcode = document.getElementById('sample6_postcode').value;
  const extraAddress = document.getElementById('sample6_extraAddress').value;
  const detailAddress = document.getElementById('sample6_detailAddress').value;
  const address = document.getElementById('sample6_address').value;

  const fullAddress = "[" + postcode + "] " + `${address} ${extraAddress} ${detailAddress}`;

  if (email === '') {
    alert('이메일을 입력해주세요.');
    return;
  }

  if (password === '') {
    alert('비밀번호를 입력해주세요.');
    return;
  }

  if (document.getElementById('password').value.length < 8) {
    alert('비밀번호는 8자 이상이어야 합니다.');
    return;
  }

  if (passwordCheck === '') {
    alert('비밀번호를 확인해주세요.');
    return;
  }

  if(birth.length!=6){
    alert('생년월일 6자리를 입력해주세요.');
    return;
  }

  try {
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        userName: userName,
        birth: birth,
        phoneNumber: phoneNumber,
        address: fullAddress
      }),
    });
    console.log(res.status);
    if(res.status == 200){
      Swal.fire({
        title: 'MUMA에 오신 것을 환영합니다 🥳',
        text: '가입하신 이메일로 로그인을 해주세요!',
        icon: 'success',
      }).then( result => {
        if (result.isConfirmed) { 
        window.location.href = "/login"
        }
      });
    }
    if(res.status == 409){
        jsonResponse = await res.json();
        if(jsonResponse.result.errorCode == "DUPLICATE_EMAIL"){
          Swal.fire({
            title: '회원가입 실패 😭',
            text: '해당 이메일은 이미 회원가입 되어있습니다!',
            icon: 'error',
            confirmButtonText: '확인'
          }).then(result => {
            if (result.isConfirmed) { 
            window.location.href = "/login"
            }
          });
        }
        else if(jsonResponse.result.errorCode == "DUPLICATE_USERNAME"){
          Swal.fire({
            title: '닉네임이 중복됩니다 😭',
            text: '다른 닉네임을 입력해주세요',
            icon: 'error',
          });
        }
    }
} catch (error) {
    console.log(error);
    alert("Request Error!");
}

}

function sendEmail() {
  const url = `${BASE_URL}/api/v1/users/auth`;
  const email = document.getElementById('email').value;

  if (email === '') {
    alert('이메일을 입력해주세요.');
    return;
  }

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        alert('이메일이 전송되었습니다.');
      } else {
        alert('이메일 전송에 실패했습니다.');
      }
    });
}
