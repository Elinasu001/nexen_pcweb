
function cfnSendRequest(pUrl, pSendData, pReqId) {

	console.log(pUrl, pSendData);
	console.log("===============");
	//console.log("pSendData.jsonString() : " +  pSendData.jsonString());
	console.log("JSON.stringify(pSendData) : " +  JSON.stringify(pSendData));
	

	$.ajax({
		  type:"POST"
	    , url:pUrl
	    , cache:false
	    , timeout:30000
	    , contentType:"application/json;charset=UTF-8"
	    , data:JSON.stringify(pSendData)
	    , beforeSend:function() {
	    	ComUtil.loading();
	    }
	    , success:function(result) {
	    	ComUtil.unloading();
	    	console.log('success callback : ' + pReqId, result);
	    	cfnRequestSuccessCallback(pReqId, result);

	    }
		, error: function (request, status, error) {
			ComUtil.unloading();
			console.log('error callback : ' + pReqId, status);
			cfnRequestErrorCallback(pReqId, status);
	        
		}
		, complete: function (result) {

		}
    });
    
};

var _rCRLF = /\r?\n/g,
_rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
_rsubmittable = /^(?:input|select|textarea|keygen)/i;
_rcheckableType = /^(?:checkbox|radio)$/i;

	/**
	 * 폼요소, 또는 data-json-obj=true 속성을 가지는 폼요소를 json 오브젝트 생성한다.
	 * $("#formId").serializeObject();
	 * $("#elementId").serializeObject($("#elementId").serializeArrayInSelector("[data-json-obj=true]"));
	 */
	 $.fn.serializeObject = function(serializeArray){
	    console.log('Call SerializeObject 11!!');
		var o = {};
	    var a = serializeArray? serializeArray : this.serializeArray();
	
	    $.each(a, function() {
	        if (o[this.name]) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	    } else {
	        o[this.name] = this.value || '';
	        }
	    });
	    return o;
	 }
 
	 /**
	  * data-json-obj=true 속성을 가지는 폼요소의 배열을 생성한다.
	  * $("#elementId").serializeArrayInSelector("[data-json-obj=true]");
	  */
	 $.fn.serializeArrayInSelector = function(selector) {
		var s = selector || "[data-json-obj=true]";
		
		return this.map(function() {
			var elements = jQuery(s, this);
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				_rsubmittable.test( this.nodeName ) && !_rsubmitterTypes.test( type ) &&
				( this.checked || !_rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();
		
			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( _rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( _rCRLF, "\r\n" ) };
		}).get();
	 }

var AgentUtil = {

		ua : navigator.userAgent.toLowerCase(),

		isMC : function(){
			return false;
		},
		getOS : function() {
			var currentOS = "";
			var mobile = (/iphone|ipad|ipod|android/i.test(this.ua));
			if (mobile) {
				var userAgent = this.ua.toLowerCase();
				if (userAgent.search("android") > -1){
					currentOS = "android";
				} else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)
							|| (userAgent.search("ipad") > -1)) {
					currentOS = "ios";
				} else {
					currentOS = "other";
				}
			}
			return currentOS;
		},
		isAndroid : function(){
			return (/android/i.test(this.ua));
		},
		isIOS : function(){
			return (/iphone|ipad|ipod/i.test(this.ua));
		},
		isAndroidApp : function(){
			return (/globallotteautoauction:android/i.test(this.ua));
		},
		isIOSApp : function(){
			return (/globallotteautoauction:ios/i.test(this.ua));
		},
		isEC : !this.isMC
};

var FnUtil = {
		call : function(res, cb) {
			return cb ? cb.apply(null, [res]) : res;
		}
};

var NumUtil = {
		setComma : function(src, cb){
			return FnUtil.call(src.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), cb);
		},
		rmComma : function(src, cb){
			return FnUtil.call(parseInt($.trim(src).replace(/,/gi,'')), cb);
		}
	};

var ValidUtil = {
	mail : function(src, cb){
		return FnUtil.call(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($.trim(src)),cb);
	},
	cell : function(src, cb){
		return FnUtil.call(/^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/.test($.trim(src)),cb);
	},
	number : function(src, cb){
		return FnUtil.call(/^\d+$/.test($.trim(src)),cb);
	},
	isEmail : function(value) {
		return /^([0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*){4}@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*[\\.]([a-zA-Z]){2,3}$/.test(value);
	},	
	//yyyy 형식의 날짜인지
	isYyyy : function(src) {

		if (!/^\d{4}/.test(src)) {
			return false;
		}

		var date	= new Date(src);

		if(!date.getTime() && date.getTime() !== 0) {
			return false
		}

		return true;
	},
	isYyyyMmDd : function(src) {
		var re = /[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/;
	    //         yyyy        MM            dd
	    return re.test(src);
	},
	isTelNo : function(src) {
		var re = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})?[0-9]{3,4}?[0-9]{4}$/;
		return re.test(src);
	},
	//특수문자 제외
	isIncludeSpecial : function(value) {
		return /[~!@\#$%<>^&*\()\-=+_\’]/gi.test(value);
	},
	//알파벳과 숫자만
	isOnlyNumAlphabet : function(value) {
		return /^[A-Za-z0-9]*$/.test(value);
	},
	//알파벳
	isOnlyAlphabet : function(value) {
		return /^[A-Za-z\s]*$/.test(value);
	},
	isFnAlphabetForName : function(value) {
		return /^[A-Za-z,.·\s-]*$/.test(value);
	},
	// 알파벳, 숫자, 특수문자
	isFnAlphabetNum : function(value) {
		return /^[A-Za-z,.·\s-]*$/.test(value);
	},
	//알파벳특수문자숫자
	isNumFnAlphabet : function(value) {
		return /^[a-zA-Z0-9\[\]{}()<>?`~!@#$%^&*_+=,.;:\"'\\-\s]*$/.test(value);
	},
	//숫자인지 체크 (콤마 있는 경우 숫자 아님)
	isNumeric : function(val) {
		return !isNaN(parseFloat(val)) && isFinite(val);
	},
	isOnlyNumber : function(val) {
		return /^[0-9]*$/.test(val);
	},
	isEmpty : function(val){
		if (this.isNumeric(val)) return false;

			if (null == val || null === val || "" == val || val == undefined || typeof(val) == undefined || "undefined" == val || "NaN" == val || "null" == val) {
					return true;
			} else {
					return false;
			}
	},
	/*널이나 빈값이면 입력받은 문자열로 대체하여 반환한다.
	 *
	 */
	nvl : function(scStr, replaceStr){
		if (ValidUtil.isEmpty(scStr)) {
					return replaceStr;
			} else {
					return scStr;
			}
	},
	/*문자열 치환함수  : commonJs.replaceChar(대상문자열, 바꿀문자, 바뀔문자)
	 * ex) commonJs.whiteSpace('0&amp;12345' , '&amp;' , '');
	 * ex) commonJs.whiteSpace('0&amp;45' , '&amp;' , '123');
	*/
	whiteSpace : function(obj) {
		obj.val( $.trim(ValidUtil.replaceChar(obj.val(), ' ', '' )) );
		return false;
	},

	/*문자열 치환함수  : commonJs.replaceChar(대상문자열, 바꿀문자, 바뀔문자)
	 * ex) commonJs.replaceChar('0&amp;12345' , '&amp;' , '');
	 * ex) commonJs.replaceChar('0&amp;45' , '&amp;' , '123');
	*/
	replaceChar : function(strTemp, targetChar, replaceChar) {
		strTemp = strTemp.replace(new RegExp(eval("/"+targetChar+"/g")), replaceChar);
		return strTemp;
	},

	/*문자열 삭제함수 :  commonJs.removeChar(대상문자열, 삭제할문자)
	 * ex) commonJs.removeChar('0&amp;12','&amp;');
	*/
	removeChar : function(strTemp,char) {
			strTemp = strTemp.replace(new RegExp(eval("/"+char+"/g")), '');
			return strTemp;
	},
	// 아이디 영문 숫자 자리수 체크
	idCheck : function(value) {
		return /^[a-z0-9]{8,12}$/.test(value)
	},
	//셀렉트박스 체크
	selectcheck : function(value) {
		return (value != '0');
	},
	//첫글자 영문자만 사용
	idAlphaCheck : function(value) {
		return /^[a-zA-Z]{1}.*$/.test(value)
	},
	//최소 자리수
	minLength : function(value,param) {
		var length = value.length;
		return (length < param);
	},
	//최대 자리수
	maxLength : function(value,param) {
		var length = value.length;
		return (length > param + 1);
	},
	//비밀번호 영대소문자 + 숫자 조합 + 특수문자 체크
	pwcheck : function(value) {
		return /^.*(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=]).*$/.test(value)
	},
	// 비밀번호 영대소문자 + 숫자 조합 10~20자리 체크
	pwCheckNumAlpha : function(value) {
		return /^(?=.*\d)(?=.*[a-z])[A-Za-z\d]{10,20}$/.test(value)
	},
	// 비밀번호 영대소문자 + 숫자 + 특수문자 조합 8~20자리 체크
	pwCheckNumFnAlpha : function(value) {
		return /^(?=.*\d)(?=.*[a-z])(?=.*[`~!@#$%^&*()\-_=+\|\\\[\]{};':",.\/\<\>\?])[A-Za-z\d`~!@#$%^&*()\-_=+\|\\\[\]{};':",.\/\<\>\?]{8,20}$/.test(value)
	},
	//비밀번호 동일한 문자 체크 (3자리 연속일 경우)
	pwPattenCheck : function(value) {
		var len = 0;
		var chr, nextChr;
		for(var i = 0, size = value.length ; i < size ; i++){
			chr = value.charAt(i).charCodeAt(0);
			nextChr = value.charAt(i + 1).charCodeAt(0);
			chirdChr = value.charAt(i + 2).charCodeAt(0);
			if(chr == nextChr && chr == chirdChr){
				return false;
			}
		}
		return true;
	},
	//url 형식 여부
	isUrl: function(value) {
		return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value);
	},
	//byte 확인
	isExceedsByte: function(value, max) {
		var	length	= value.length;
		var	char	= '';
		var	i		= 0;
		var	byte	= 0;

		for (i = 0; i < length; i++) {

			char	= value.charAt(i);

			if (escape(char).length > 4) {
				byte	+= 2;
			}
			else {
				byte++;
			}
		}

		if (byte > max) {
			return true;
		}
		else {
			return false;
		}
	},
	isJurirno : function(sJurirno)
	{
		/*var checkNo = "121212121212";
		var nSum = 0;

		for(var i=0; i<checkNo.length; i++)
		{
			nSum += parseInt(sJurirno.charAt(i)) * parseInt(checkNo.charAt(i));
		}

		nSum %= 10;

		if(nSum > 0) nSum = 10 - nSum;

		if (nSum === parseInt(sJurirno.charAt(12))) return true;
	    else return false;*/
		return true;
	},
	isCrNo : function(sCrNo)
	{
		/*if( Util.isNull(sCrNo) )    return false;

		if (sCrNo.length == 12){
			var vCompNo = sCrNo.replace("-", "");
		} else {
		    var vCompNo = sCrNo;
		}

		var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
		var i, Sum=0, c2, remander;
		if (vCompNo.length != 10)
			return false;
		for (i = 0; i <= 7; i++)
			Sum += checkID[i] * vCompNo.charAt(i);
		c2 = "0" + (checkID[8] * vCompNo.charAt(8));
		c2 = c2.substring(c2.length - 2, c2.length);
		Sum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
		remander = (10 - (Sum % 10)) % 10;
		if (Math.floor(vCompNo.charAt(9)) != remander)
			return false;
		return true;*/
		return true;
	}

};

/*전화번호 형식
 * phoneFomat('0212341234')
 * return '02-1234-1234'
 */
function phoneFomat(num){
	return num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
}

/*전화번호 형식 (국번제외)
 * phoneFomatExceptAreaNum('12341234')
 * return '1234-1234'
 */
function phoneFomatExceptAreaNum(num){
	return num.replace(/([0-9]+)([0-9]{4})/,"$1-$2");
}

/*법인번호 형식
 * jurirnoFormat('1234561234567')
 * return '123456-1234567'
 */
function jurirnoFormat(num){
	return num.replace(/([0-9]+)([0-9]{7})/,"$1-$2");
}

var toNormDate = {
	common : function(str, seperator){
		var exp = new RegExp(seperator, 'gi');
		return str.trim().replace(exp, '');
	},
	dot : function(str){
		return this.common(str, "\\.");
	},
	hyphen  :function(str){
		return this.common(str, "-");
	}
};

var toFormatDate = {
	common : function(str, seperator){
		return str.replace(/(\d{4})(\d{2})(\d{2})/g, '$1' + seperator +'$2' + seperator + '$3');
	},
	dot : function(str){
		return this.common(str, ".");
	},
	hyphen  :function(str){
		return this.common(str, "-");
	}

};

var CodeUtil = {
		getCodeList : function(grpCd, callback){
			AjaxUtil.call('/cmCd/getCodeListAjax?grpCd='+grpCd, {}, function(list){
				callback.apply(null, [list]);
			});
		},

		getCodeName : function(grpCd, cd, callback){
			AjaxUtil.call('/cmCd/getCodeNameAjax?grpCd='+grpCd +'&cd=' + cd, {}, function(codeData){
				callback.apply(null, [codeData.name]);
			});
		},

		getCodeInfo : function(grpCd, cd, ref, callback){
			AjaxUtil.call('/cmCd/getCodeInfoAjax?grpCd='+grpCd +'&cd=' + cd + '&ref=' + ref, {}, function(codeData){
				callback.apply(null, [codeData]);
			});
		}

};

var DateUtil = {

		getPrevDate : function(diffDay, diffMonth, originDate){
			if(!originDate){
				originDate = new Date();
			}

			var tempDate;

			if(!diffMonth){
				tempDate = originDate;
			}else{
				tempDate = new Date();
				tempDate.setMonth(originDate.getMonth() - diffMonth);
			}

			return new Date(tempDate.getTime() - (diffDay * 24 * 60 * 60 * 1000));
		},
		getPrevDateByMonth : function(diffMonth){
			return getPrevDate(0, diffMonth);
		},
		toHyphenFormat : function(date){
			return date.toISOString().slice(0,10);
		},
		toYyyyMmDd : function(date){
			return this.toHyphenFormat(date).replace(/\-/g, '');
		},
		toYyyyDotMmDotDd: function(date) {
			var mm = date.getMonth() + 1; // getMonth() is zero-based
			var dd = date.getDate();

			return [
				date.getFullYear(),
				'.',
				(mm>9 ? '' : '0') + mm,
				'.',
				(dd>9 ? '' : '0') + dd
			].join('');
		},
		rmDot: function(val) {
			return val.replace(/\./g, '');
		}
};

var AjaxUtil = {
		call : function(url, param, scb, options){

			if(!options){
				options = {};
			}

			options.url = url;
			options.data = param;
			options.fcb = options.fcb? options.fcb : function(jqXHR, textStatus, errorThrown){console.log(jqXHR + "," + textStatus + "," + errorThrown);};
			options.dataType = options.dataType? options.dataType : "json";
			options.type = options.type? options.type : "post";

			options.context = document.body;

		    $.ajax(options)
		    .done(
		    	scb
		     )
		    .fail(
		    	options.fcb
		    )
		    .always(
		    	options.complete
		    );
		}
};

var Login = {
	//로그인페이지로 이동
	redirectToLogin: function() {
		if(confirm("로그인이 필요한 서비스 입니다.\n로그인 페이지로 이동하시겠습니까?")){
			location.href = "/login/login.do?returnUrl="+encodeURIComponent(location.href);
		}
	},
	//로그인여부확인
	isNotLogined: function() {
		var sessionAlive = "Y";
		$.ajax({
			url: "/login/loginValidate.do",
			dataType: "json",
			contentType: "application/json",
			async: false,
			cache: false,
			success: function(session) {
				sessionAlive = $.trim(session.header.loginYn);
			}
		});
		return sessionAlive == "N" ? true : false;
	},
	getSelerInfo: function(loginId) { //셀러정보
		var selerId ="";
		$.ajax({
			url: "/login/selerInfo.do",
			dataType: "json",
			contentType: "application/json",
			async: false,
			cache: false,
			data : {"mbrId":loginId},
			success: function(result) {
			  if(result.info){
				selerId = $.trim(result.info.selerId);
			  }
			}
		});
		return ValidUtil.isEmpty(selerId) ? false : true;
	},
	getSelerReqInfo: function(loginId) {//셀러요청정보
		var mbrNo ="";
		$.ajax({
			url: "/login/selerReqInfo.do",
			dataType: "json",
			contentType: "application/json",
			async: false,
			cache: false,
			data : {"mbrId":loginId},
			success: function(result) {
			  if(result.info) {
				mbrNo = $.trim(result.info.mbrNo);
			  }
			}
		});
		return ValidUtil.isEmpty(mbrNo) ? false : true;
	},
	fnGoToUrl : function(url, name, data){

		var $form = $('<form></form>');
		$form.attr('action', url);
		$form.attr('method', 'post');

		$form.attr('target', '_self');
		$form.appendTo('body');

		var sParam = $('<input type="hidden" name="'+name+'" value="'+data+'" />');

		$form.append(sParam);
		$form.submit();
		$form.remove();
	},
	getCookie : function(name){
		return $.cookie(name);
	},
	delCookie : function(name){
		$.removeCookie(name, { path: '/' });
	},
	setCookie : function(name, value, expiredays){
		$.cookie(name, value, { expires: expiredays, path: '/' });
	},
	fnCloseThis : function(){
		if(confirm('<spring:message code="MB_C015" />')){
			location.href="/login/logout.do";
		}
	}
}

var PageUtil = {
		//페이징처리
		fnPageMakeDisplay : function(totalCnt, curPage, pageObj, fncName, pageSize) {
			var total = totalCnt;
			var paggingStr = "";
			var pageNum = curPage;
			if(total < 1){
			}else{
				var PAGEBLOCK = 10;
				var pageSize = pageSize;
				
				var totalPages = Math.floor(total/pageSize);				
				if(total%pageSize>0) totalPages = totalPages+1;
				
				var firstPage = Math.floor((pageNum-1)/PAGEBLOCK) * PAGEBLOCK + 1;
				
				if( firstPage <= 0 )
					firstPage = 1;
				var lastPage = firstPage-1 + PAGEBLOCK;
				if( lastPage > totalPages )
					lastPage = totalPages;
				var nextPage = lastPage+1 ;
				var prePage = firstPage-PAGEBLOCK ;

				if( firstPage > PAGEBLOCK ){
					paggingStr +=  "<span><a href='javascript:"+fncName+"(1);' class='first'></a></span>";
					paggingStr +=  "<span><a href='javascript:"+fncName+"(" + prePage + ");' class='pre'></a></span>";
				}

				for( i=firstPage; i<=lastPage; i++ ){
					if( pageNum == i )
						paggingStr += " <a class='on' href='javascript:;''>" + i + "</a>";
					else
						paggingStr += " <a href='javascript:"+fncName+"("+i+");'>" + i + "</a> ";
				}

				if( lastPage < totalPages ){
					paggingStr += "<span><a href='javascript:"+fncName+"(" + nextPage + ");' class='next'></a></span>";
					paggingStr += "<span><a href='javascript:"+fncName+"(" + totalPages + ");' class='end'></a></span>";
				}

				pageObj.html(paggingStr);
				pageObj.show();
			}
	},
	
	//페이징 더보기 처리
	fnPageMakeMoreDisplay : function(totalCnt, curPage, pageObj, fncName, pageSize) {
		
		var paggingStr = "";		
		if(totalCnt < 1){
		}else{
			var lastPage = Math.floor(totalCnt/pageSize);	
			if(totalCnt%pageSize>0) lastPage = lastPage+1;
			if( lastPage == curPage ){
				pageObj.html(paggingStr);
				pageObj.hide();
			}else{
				var nextPage = curPage + 1;
				paggingStr += "<button type='button' name='' class='type12 w100per' onClick='javascript:"+fncName+"("+nextPage+");'>더보기</button>";
				pageObj.html(paggingStr);
				pageObj.show();
			}

			
			
		}
	}
}


var PageUtilImage = {
		//페이징처리
		fnPageMakeDisplay : function(totalCnt, curPage, pageObj, fncName, pageSize) {
			var total = totalCnt;
			var paggingStr = "";
			var pageNum = curPage;
			if(total < 1){
			}else{
				var PAGEBLOCK = 3;
				var pageSize = pageSize;
				var totalPages = Math.floor((total-1)/pageSize) + 1;
				var firstPage = Math.floor((pageNum-1)/PAGEBLOCK) * PAGEBLOCK + 1;
				
				if( firstPage <= 0 )
					firstPage = 1;
				var lastPage = firstPage-1 + PAGEBLOCK;
				if( lastPage > totalPages )
					lastPage = totalPages;
				var nextPage = lastPage+1 ;
				var prePage = firstPage-PAGEBLOCK ;

				if( firstPage > PAGEBLOCK ){
					paggingStr +=  "<span><a href='javascript:"+fncName+"(1);' class='first'></a></span>";
					paggingStr +=  "<span><a href='javascript:"+fncName+"(" + prePage + ");' class='pre'>;</a></span>";
				}

				for( i=firstPage; i<=lastPage; i++ ){
					if( pageNum == i )
						paggingStr += " <a class='on' href='javascript:;''>" + i + "</a>";
					else
						paggingStr += " <a href='javascript:"+fncName+"("+i+");'>" + i + "</a> ";
				}

				if( lastPage < totalPages ){
					paggingStr += "<span><a href='javascript:"+fncName+"(" + nextPage + ");' class='next'></a></span>";
					paggingStr += "<span><a href='javascript:"+fncName+"(" + totalPages + ");' class='end'></a></span>";
				}

				pageObj.html(paggingStr);
				pageObj.show();
			}
	},
	
	//페이징 더보기 처리
	fnPageMakeMoreDisplay : function(totalCnt, curPage, pageObj, fncName, pageSize) {
		
		var paggingStr = "";		
		if(totalCnt < 1){
		}else{
			var lastPage = Math.floor((totalCnt-1)/pageSize) + 1;			
			if( lastPage == curPage ){
				pageObj.html(paggingStr);
				pageObj.hide();
			}else{
				var nextPage = curPage + 1;
				paggingStr += "<button type='button' name='' class='type12 w100per' onClick='javascript:"+fncName+"("+nextPage+");'>더보기</button>";
				pageObj.html(paggingStr);
				pageObj.show();
			}

			
			
		}
}
}

/*윈도우 팝업*/
$.popModalCenter = function(option){
var settings = {
		url 		: option.url,
		pObj 		: "",
		width 		: "800",
		height 		: "600",
		scroll 		: "no",
		status 		: "no",
		center 		: "yes",
		resizable 	: "no",
		name		: "popup" + option.url
	};

	settings = $.extend({}, settings, option);

	var popFeatures = "width=" + settings.width + "px,height="+settings.height + "px,scrollbars="+settings.scroll;
		popFeatures += ",status="+settings.scroll+",resizable=" + settings.resizable
					+ ',location=no';


	var win = window.open(settings.url, settings.name, popFeatures);
	win.focus();
}

function openFullPop(url){
	location.href = url;
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

var ComUtil = {
		init:function(){

		},
		loading:function(opt){
			var els = '<div class="loadingWrap">';
			els += '<div class="loading">';
			els += '	<img src="/img/common/loading.gif" alt="loading" class="loadImg">';
			els += '	<div class="loadingBg"></div>';
			els += '</div>';
			els += '</div>';

			$("#loadingWrap2").prepend(els);
		},
		unloading:function(){
			$(".loadingWrap").remove();
		},
		// ComUtil.alert(메시지, 타이틀, 버튼텍스트,함수)
		// ComUtil.alert("","","",function(){ });
		alert:function(msg, tit, btnNm, callback){
			if( !$(".popAlert").length ){

				ComUtil.scrHold.using(true);

				if(!btnNm){
					btnNm = '확인';
				}

				if(!tit){
					tit = "알림";
				}
				
				var scrollTop = $(window).scrollTop();
				var popBg = "width:100%; height:100%; position:absolute; top:"+scrollTop+"px; z-index:3001;  background: rgba(0, 0, 0, 0.30);";
				
				var winHeight = $(window).height()/2;
				scrollTop = scrollTop + winHeight;
				
				var styleChk = "background:#fff; width:450px; height:auto; text-align:center; position:absolute; left:50%; top:"+scrollTop+"px; transform: translate(-50%, -50%); z-index:9000";

				var lyAlert =
				/*'<section class="popAlert">'+*/
				'<section class="popAlert" style="'+ styleChk + '"' + '>'+
					'<div class="popBody">'+
						/*'<div class="popHead">'+tit+'</div>'+*/
						'<div class="popCtn">'+msg+'</div>'+
							'<div class="popBot">'+
								'<button type="button" class="type02 w100per center popClose" name="">'+ btnNm +'</button>'+
							'</div>'+
/*						'<a href="#" class="popClose"></a>'+*/
					'</div>'+
				'</section>';
								
				$("body").append(lyAlert);
				
				$(".allWrap").after( '<div class="popAlertBg" style="'+ popBg + '"' + '></div>' ).parent().css({'overflow' : 'hidden'});
				if(callback){
					$(".popAlert").find(".popClose , .btnConfirm").on("click",callback);
				}
				$(".popAlert").find(".popClose , .btnConfirm").on("click",this.alertClose);
			}
		},
		alertClose:function(){
			$(".popAlert").remove();
			$(".popAlertBg").remove();
			ComUtil.scrHold.using(false);
		},
		scrHold:{ // 스크롤 내린 값 기억했다 돌아가기
			sct:0,
			stat:false,
			using:function(opt){
				if(opt === true && this.stat === false ){
					this.stat = true;
					ComUtil.scrHold.sct = $(window).scrollTop();
					//$('html').scrollTop(0);
					//$("body").css({"overflow":"hidden","background":"#a2a2a2"});
					//$("body").css({"overflow":"hidden","background":"#a2a2a2"});
					
				}
				if(opt === false){
					this.stat = false;
					$('html').scrollTop(ComUtil.scrHold.sct);
					$("body").css({"height":"","overflow":"","background":""});
				}
			}
		},
		// ComUtil.confirm(메시지, 타이틀, 확인함수, 취소함수, 확인버튼텍스트, 취소버튼텍스트);
		// ComUtil.confirm("","",function(){ },function(){ });
		confirm:function(msg,tit,yCb,nCb,ybtnNm,nbtnNm){
			if( !$(".popConfirm").length ){
				ComUtil.scrHold.using(true);
				if(!ybtnNm){
					ybtnNm = '확인';
				}
				if(!nbtnNm){
					nbtnNm = '취소';
				}

				if(!tit){
					tit = "알림";
				}

				var scrollTop = $(window).scrollTop();
				var popBg = "width:100%; height:100%; position:absolute; top:"+scrollTop+"px; z-index:3001;  background: rgba(0, 0, 0, 0.30);";

				var winHeight = $(window).height()/2;
				scrollTop = scrollTop + winHeight;
				
				var styleChk = "background:#fff; width:450px; height:auto; text-align:center; position:absolute; left:50%; top:"+scrollTop+"px; transform: translate(-50%, -50%); z-index:9000";
				
				var lyConfirm =
				/*'<section class="popAlert popConfirm">'+*/
				'<section class="popAlert popConfirm" style="'+ styleChk + '"' + '>'+
					'<div class="popBody">'+
						/*'<div class="popHead">'+tit+'</div>'+*/
						'<div class="popCtn">'+msg+'</div>'+
						'<div class="popBot">'+
								'<button type="button" class="type04 w50per center btnCancel" name="">'+ nbtnNm +'</button>'+
								'<button type="button" class="type02 w50per center btnConfirm" name="">'+ ybtnNm +'</button>'+
						'</div>'+
						/*'<a href="#" class="popClose"></a>'+*/
					'</div>'+
				'</section>';
				$("body").append(lyConfirm);
				
				$(".allWrap").after( '<div class="popAlertBg" style="'+ popBg + '"' + '></div>' ).parent().css({'overflow' : 'hidden'});
				
				$(".popConfirm").find(".btnConfirm").on("click",yCb);
				/*
				if(!nCb){
					$(".popConfirm").find(".btnCancel").on("click",nCb);
				}
				*/
				$(".popConfirm").find(".btnCancel").on("click",nCb);
				$(".popConfirm").find(".btnConfirm, .popClose , .btnCancel").on("click",this.confirmClose);
			}
		},
		confirmClose:function(){
			$(".popConfirm").remove();
			$(".popAlertBg").remove();
			ComUtil.scrHold.using(false);
		}
}

var FileUtil = {
		fnFileDown : function (filePath, orgFileName){
			var fm         = '<form name="fmFileDownload" id="fmFileDownload"></form>';
		    var filePath   = '<input type="hidden" id="filePath" name="filePath" value="'+filePath+'"/>';
		    var fmOriginalFileName = '<input type="hidden" id="orgFileName" name="orgFileName" value="'+orgFileName+'"/>';

		    $('body').append(fm);

		    $('#fmFileDownload').append(filePath);
		    $('#fmFileDownload').append(fmOriginalFileName);

		    $('#fmFileDownload').attr('action', '/cm/downloadFile.do');
		    $('#fmFileDownload').attr('method', 'POST');
		    $('#fmFileDownload').submit();

		    $('#fmFileDownload').remove();
		},
		fnTemplateFileDown : function (filePath, orgFileName, mbrNo){
			var fm         = '<form name="fmTemplateFileDown" id="fmTemplateFileDown"></form>';
		    var filePath   = '<input type="hidden" id="filePath" name="filePath" value="'+filePath+'"/>';
		    var fmOriginalFileName = '<input type="hidden" id="orgFileName" name="orgFileName" value="'+orgFileName+'"/>';
		    var mbrNo   = '<input type="hidden" id="mbrNo" name="mbrNo" value="'+mbrNo+'"/>';

		    $('body').append(fm);

		    $('#fmTemplateFileDown').append(filePath);
		    $('#fmTemplateFileDown').append(fmOriginalFileName);
		    $('#fmTemplateFileDown').append(mbrNo);

		    $('#fmTemplateFileDown').attr('action', '/cm/downloadTemplateFile.do');
		    $('#fmTemplateFileDown').attr('method', 'POST');
		    $('#fmTemplateFileDown').submit();

		    $('#fmFileDownload').remove();
		}
}
//메인 홈
$(document).ready(function(){
	$('.home > a').click(function(e){
		location.href="/main.do";
	});
});

//페이지 이동
function fn_pageMove(url){
	location.href = url;
}

//날짜 비교
function fn_dateChk(stDt, endDt) {

	var stDt = new Date(stDt);
	var endDt = new Date(endDt);
    if(stDt.getTime() > endDt.getTime()){
        return false;
    }else{
    	return true;
    }
}

//페이징 처리 후 뒤로가기시 이전 페이지 정보 담기
function fn_checkForHash(){

	if(location.hash != '#' && location.hash != ''){
	  var page = parseInt(location.hash.slice(5));
	  	  if (page != null && page != '' && $("#curPage").val() != page) {
	  		  fn_list(page);
	  	  }
	}else{
		window.location.hash = '#page' + $("#curPage").val();
	}
}

//특정위치로 이동 이동하기
function fnMove(id){
    var offset = $("#" + id).offset();
    $('html, body').animate({scrollTop : offset.top}, 400);
}

//숫자만 입력받기
var validNumberCheck = {

      keyDown : function (e) {

          var key;

          if(window.event)
              key = window.event.keyCode; //IE
          else
              key = e.which; //firefox

          var event;

          //alert("key=" + key + ", event=" + event);

          if (key == 0 || key == 8 || key == 46 || key == 9){
              event = e || window.event;
              if (typeof event.stopPropagation != "undefined") {
                  event.stopPropagation();
              } else {
                  event.cancelBubble = true;
              }
              return;
          }

          //if (key < 48 || (key > 57 && key < 96) || key > 105 || e.shiftKey) {
          if ((key > 20 && key < 48) || (key > 57 && key < 96) || (key > 105 && key < 112) || key > 123 || e.shiftKey) {  //key:20 이하, F1~F12(key:112~123) 허용
              e.preventDefault ? e.preventDefault() : e.returnValue = false;
          }
      },

      keyUp : function (e) {

          var key;

          if(window.event)
              key = window.event.keyCode; //IE
          else
              key = e.which; //firefox

          var event;
          event = e || window.event;

          if ( key == 8 || key == 46 || key == 37 || key == 39)
              return;
          else
              event.target.value = event.target.value.replace(/[^0-9]/g, "");
      },

      focusOut : function (ele) {
          ele.val(ele.val().replace(/[^0-9]/g, ""));
      }
}