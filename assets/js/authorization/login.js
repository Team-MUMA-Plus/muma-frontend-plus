$(document).ready(function () {
  let signup = $('.links').find('li').find('#signup');
  let signin = $('.links').find('li').find('#signin');
  let reset = $('.links').find('li').find('#reset');
  let first_input = $('section').find('.first-input');
  let hidden_input = $('section').find('.input__block').find('#repeat__password');
  let hidden_input2 = $('section').find('.input__block').find('#name');
  let hidden_input3 = $('section').find('.input__block').find('#nickname');
  let hidden_input4 = $('section').find('.input__block').find('#sample6_postcode');
  let hidden_button = $('section').find('.address__btn');
  let hidden_input5 = $('section').find('.input__block').find('#sample6_address');
  let hidden_input6 = $('section').find('.input__block').find('#sample6_extraAddress');
  let hidden_input7 = $('section').find('.input__block').find('#sample6_detailAddress');
  let hidden_input8 = $('section').find('.input__block').find('#birth');
  let hidden_input9 = $('section').find('.input__block').find('#phoneNumber');
  let signin_btn = $('section').find('.signin__btn');

  //----------- sign up ---------------------
  signup.on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().siblings('h1').text('SIGN UP');
    $(this).parent().css('opacity', '1');
    $(this).parent().siblings().css('opacity', '.6');
    first_input.removeClass('first-input__block').addClass('signup-input__block');

    let container = document.querySelector('#sign-btn');
    container.innerHTML = 
    `
    <button class="signin__btn" onclick=join()>
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
        Sign up
    </button>
    `;
    hidden_input.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input2.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input3.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input4.css({
      opacity: '1',
      display: 'block',
    });
    hidden_button.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input5.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input6.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input7.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input8.css({
      opacity: '1',
      display: 'block',
    });
    hidden_input9.css({
      opacity: '1',
      display: 'block',
    });
    // signin_btn.text('Sign up');
  });

  //----------- sign in ---------------------
  signin.on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().siblings('h1').text('SIGN IN');
    $(this).parent().css('opacity', '1');
    $(this).parent().siblings().css('opacity', '.6');
    first_input.addClass('first-input__block').removeClass('signup-input__block');

    let container = document.querySelector('#sign-btn');
    container.innerHTML = 
    `
    <div id="sign-btn">
        <button class="signin__btn" onclick=login()>
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
            Sign in
        </button>
    </div>  
    `;

    hidden_input.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input2.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input3.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input4.css({
      opacity: '0',
      display: 'none',
    });
    hidden_button.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input5.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input6.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input7.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input8.css({
      opacity: '0',
      display: 'none',
    });
    hidden_input9.css({
      opacity: '0',
      display: 'none',
    });
    // signin_btn.text('Sign in');
  });

  //----------- reset ---------------------
  reset.on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().siblings('section').find('.input__block').find('.input').val('');
  });
});

// -------------------  Login  ---------------------------------------------------------------------------------------------------------

function login() {
  const url = `${BASE_URL}/api/v1/users/login`;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log('url:', url);
  console.log('email:', email);
  console.log('password:', password);

  if (email === '') {
    alert('이메일을 입력해주세요.');
    return;
  }

  if (!email.includes('@')) {
    alert('이메일 형식이 올바르지 않습니다.');
    return;
  }

  if (password === '') {
    alert('비밀번호를 입력해주세요.');
    return;
  }

  // if (document.getElementById('password').value.length < 8) {
  //     alert('비밀번호는 8자 이상이어야 합니다.');
  //     return;
  // }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.resultCode === 'SUCCESS') {
        console.log(res);
        Swal.fire('환영합니다 🥳', '다시 만나서 반가워요 🫰🏻 !!!', 'success').then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/index.html';
          }
        });
      } else if (res.result.errorCode === "INVALID_PASSWORD") {
        // console.log(res.json());
        Swal.fire('로그인 실패 😭', '이메일 또는 비밀번호를 다시 한 번 확인해주세요...ㅠ', 'error');
      } else if (res.result.errorCode === "EMAIL_NOT_FOUND") {
        Swal.fire('로그인 실패 😭', '가입되지 않은 이메일입니다. 회원가입을 해주세요', 'error')
        .then( result => {
          if (result.isConfirmed) { 
            document.getElementById('signup').click();
          }
        });
      } else if (res.result.errorCode === "INVALID_MAIL") {
        // console.log(res.json());
        Swal.fire('로그인 실패 😭', '이메일 인증이 완료되지 않았습니다.', 'error');
      }
    });
}

// ------------------------------ Join -------------------------------------------------------------
async function join() {
  // 변수 선언
  const url = `${BASE_URL}/api/v1/users/join`;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordCheck = document.getElementById('repeat__password').value;
  const name = document.getElementById('name').value;
  const userName = document.getElementById('nickname').value;
  const birth = document.getElementById('birth').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const postcode = document.getElementById('sample6_postcode').value;
  const extraAddress = document.getElementById('sample6_extraAddress').value;
  const detailAddress = document.getElementById('sample6_detailAddress').value;
  const address = document.getElementById('sample6_address').value;
  // const fullAddress = document.getElementById('address').value;

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

  if (passwordCheck === '' || password != passwordCheck) {
    alert('비밀번호를 확인해주세요.');
    return;
  }

  if (postcode== '' || address == '' || detailAddress == ''){
    alert('주소를 입력해주세요.')
    return
  }

  if(birth.length!=6){
    alert('생년월일 6자리를 입력해주세요.');
    return;
  }

  let fullAddress = '';
  if(extraAddress == ''){
    fullAddress = "[" + postcode + "] " + `${address} ${detailAddress}`;
  } else{
    fullAddress = "[" + postcode + "] " + `${address} ${extraAddress} ${detailAddress}`;
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
        title: '가입하신 이메일로 인증 메일을 전송해드렸습니다! 🥳',
        text: '링크를 클릭하여 인증 완료 후 로그인 해주세요',
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