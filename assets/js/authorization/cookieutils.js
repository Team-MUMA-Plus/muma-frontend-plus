// cookie

/**
 * 쿠키 설정
 * @param {*} name
 * @param {*} value
 * @param {*} unixTime
 */
function set_cookie(name, value, unixTime) {
  var date = new Date();
  date.setTime(date.getTime() + unixTime);
  document.cookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';expires=' + date.toUTCString() + ';path=/';
}

/**
 * 쿠키 값 가져오기
 * @param {*} name
 * @returns
 */
function get_cookie(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
}

/**
 * 쿠키 삭제
 * @param {*} name
 */
function delete_cookie(name) {
  document.cookie = encodeURIComponent(name) + '=; expires=Thu, 01 JAN 1999 00:00:10 GMT';
}
