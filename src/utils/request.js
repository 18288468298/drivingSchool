import fetch from 'dva/fetch';

function parseJSON(response) {
	return response.json();
}

function checkStatus(response) {
	if(response.status == 401){ //token失效返回登录页面
		setCookie("token", "", 1); //name,token值，失效天数
		window.location = "/";
	}

	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	if (response.status === 500) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

export function setCookie(name, value,expiredays) {``
	var exp = new Date();
	exp.setTime(exp.getTime() + expiredays * 24 * 60 * 60 * 1000);
	document.cookie =`${name}=${value};expires=${exp.toGMTString()}`;


}
export function getCookie(name) {
	var arr,
		reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

	if ((arr = document.cookie.match(reg))) {
		return unescape(arr[2]);
	} else return null;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
	
 
  let token= getCookie('token');
  console.log(token)
  if(token){
    options.headers={
    
      'Content-Type': 'application/json; charset=utf-8',
      'authorization':'Bearer '+token,
      'Host': 'http://220.165.143.82:6810'
    }
  }else{
    options.headers={
    
      'Content-Type': 'application/json; charset=utf-8'
    }
  }


	return fetch(url, options).then(checkStatus).then(parseJSON).then((data) => ({ data })).catch((err) => ({ err }));
}
