export default cookieName => {
  var arr = document.cookie.match(
    new RegExp('(^| )' + cookieName + '=([^;]*)(;|$)'),
  );
  return arr ? unescape(arr[2]) : null;
};
