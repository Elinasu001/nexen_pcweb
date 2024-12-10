



/*
select 박스 업데이트시

$('select').niceSelect('update'); 필수

*/


function openSizeFinder( tab , preval ){

	if( tab == '' || tab == null  ) tab = 'num';

	screen_change(  tab , '1' );

	$('.sizeFinder .type-tab a').removeClass('active');
	$(".sizeFinder .type-tab a[data-tab="+tab+"]").addClass('active');

	if( tab =='num' )
		$("#sizeFinderCarNumberInput").val( preval );


	$('.sizeFinder').show();

	$('.sizeFinder select').niceSelect();


	// 메인페이지 일경우 강제로 스크롤을 중단합니다.
	if(  typeof($.fn.fullpage) != "undefined" ){
		$.fn.fullpage.setMouseWheelScrolling(false);
		$.fn.fullpage.setAllowScrolling(false);
	}

}

function screen_change( type, step ){
	$(".size-tab").hide();
	$(".size-tab.type-"+type+".step-0"+step).show();

	if( step == '1' ){
		if( type == 'num'){
			// 차량검색 준비동작
			num_search.init();
		}else if( type == 'car'){
			// 차종으로찾기 준비동작
			car_search.init();
		}else if( type == 'size'){
			// 사이즈로 찾기 준비 동작
			size_search.init();
		}
	}
}

/* 나이스 차량 한글과 숫자만 입력 가능 */
function fn_press_nice(obj)
{

    if(event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39
    || event.keyCode == 46 ) return;
    if(((event.keyCode > 96)&&(event.keyCode)<123)
    		||((event.keyCode > 64)&&(event.keyCode)<91)){
    	event.preventDefault();
    	return;
    }

}

/* 차량번호 validation */
function validationCmmCarNo(pVal){

	//차량번호가 값이 들어있을때만 체크한다.
	if(!ValidUtil.isEmpty($(pVal).val())) {
		//차량번호 패턴
		var pattern1       	= /\d{2}[가-힣ㄱ-ㅎㅏ-ㅣ\x20]\d{4}/g; 				 			// 12저3456
		var pattern2 	   	= /[가-힣ㄱ-ㅎㅏ-ㅣ\x20]{2}\d{2}[가-힣ㄱ-ㅎㅏ-ㅣ\x20]\d{4}/g; 		// 서울12치1234
		var pattern3       	= /\d{3}[가-힣ㄱ-ㅎㅏ-ㅣ\x20]\d{4}/g; 				 			// 123저3456

	   	// 차량번호
		var carNoVal 		= $(pVal).val();
		// 차량번호 길이
		var carNoValLen 	= carNoVal.length;

		// 차량번호 확인 - [8자리]
		if( carNoValLen == 7 ){
			if( !pattern1.test(carNoVal) ){
				alert( "차량번호를 확인하세요.");
				$(pVal).val("");
				$(pVal).focus();
				return false;
			}
		}
		// 차량번호 확인 - [8,9자리]
		else if( carNoValLen == 8 || carNoValLen == 9){
			if( !pattern2.test(carNoVal) &&  !pattern3.test(carNoVal) ){
				alert( "차량번호를 확인하세요.");
				$(pVal).val("");
				$(pVal).focus();
				return false;
			}
		}else{
			alert( "차량번호를 확인하세요.");
			$(pVal).val("");
			$(pVal).focus();
			return false;
		}

	}

	return true;
}

//enterKey : 차량번호
function cmmEnterSchKey(pVal) {

	var evt_code = (window.netscape) ? ev.which : event.keyCode;
	if (evt_code == 13) {
		event.keyCode = 0;
		if(validationCmmCarNo(pVal)) {
			openSizeFinder('num', $(pVal).val());
			$("#sizeFinderCarNameInput").focus();
		}
	}

	//tab키는 setTime을 줘야 작동.
	if (evt_code == 9) {
		setTimeout(function(){ $("#sizeFinderCarNameInput").focus(); }, 1);
	}
}

//enterKey : 소유주명
function fn_findSizeNumCheckPress(pVal) {

	var evt_code = (window.netscape) ? ev.which : event.keyCode;
	if (evt_code == 13) {
		event.keyCode = 0;
		if(validationCmmCarNo($("#sizeFinderCarNumberInput").val())) {
			$("#findSizeNumCheck").click();
		}
	}
}

function chkCarNum(pVal) {
	if(validationCmmCarNo(pVal)) {
		openSizeFinder('num',$(pVal).val());
		if(ValidUtil.isEmpty($(pVal).val())) {
			$("#sizeFinderCarNumberInput").focus();
		} else {
			$("#sizeFinderCarNameInput").focus();
		}
	}
}

//RTCM0051 공통코드 : 나이스 DNR 정보 표기를 위해 사용. DB에 내용 추가되면 여기에도 추가 필요.
var feulCmmCd = [
	 {cmmCd : 'Gasoline', cmmCdNm : '가솔린'}
	,{cmmCd : 'Gasoline/Hybrid', cmmCdNm : '가솔린/하이브리드'}
	,{cmmCd : 'Diesel', cmmCdNm : '디젤'}
	,{cmmCd : 'Diesel/Hybrid', cmmCdNm : '디젤/하이브리드'}
	,{cmmCd : 'LPG', cmmCdNm : 'LPG'}
	,{cmmCd : 'LPG/Hybrid', cmmCdNm : 'LGP/하이브리드'}
	,{cmmCd : 'Electric', cmmCdNm : '전기'}
	,{cmmCd : 'Hydrogen', cmmCdNm : '수소'}
	,{cmmCd : 'LPG', cmmCdNm : 'LPG'}
	,{cmmCd : '가솔린', cmmCdNm : '가솔린'}
	,{cmmCd : '가솔린+전기', cmmCdNm : '가솔린+전기'}
	,{cmmCd : '디젤', cmmCdNm : '디젤'}
	,{cmmCd : '디젤+전기', cmmCdNm : '디젤+전기'}
	,{cmmCd : 'LPG+가솔린', cmmCdNm : 'LPG+가솔린'}
	,{cmmCd : 'LPG+전기', cmmCdNm : 'LPG+전기'}
	,{cmmCd : '전기', cmmCdNm : '전기'}
	,{cmmCd : '수소+전기', cmmCdNm : '수소+전기'}
];

//차량 번호 검색 버튼 클릭 이벤트 > 나이스 DNR 연동
// 버전2 시작 할때 주석 풀기
function niceCarInfo(data) {
	//화면 전환
	screen_change( 'num' , '2' );

	//차 정보 + 연식
	$(".sizeFinder .size-tab.type-num.step-02 .img-wrap").html('<img src="' + data.carInfo.classModelImg + '">');
	var viewFuelNm = '';
	$.each(feulCmmCd, function( i, cmmItem ){
		if(cmmItem.cmmCd == data.carInfo.fuel) {
			viewFuelNm = cmmItem.cmmCdNm;
		}
	});
	$(".sizeFinder .size-tab.type-num.step-02 .car-name").text(data.carInfo.makerNm + " " + data.carInfo.modelNm + " " + viewFuelNm);
	$(".sizeFinder .size-tab.type-num.step-02 .car-year > span").text(data.carInfo.prye+"년");
	// $(".sizeFinder .size-tab.type-num.step-02 .size").text('235/55R19');

	//등급
	var niceCarGradeStr = "";
	for(var i=0; i<data.gradeList.length; i++) {
		if(data.gradeList[i].recommGradeYn == 'Y') {
			niceCarGradeStr = data.gradeList[i].gradeNm;
		}
	}

	var param = {};

	param["repCarClassNbr"] = data.carInfo.classModelId;
	param["carClassNm"] = data.carInfo.modelNm;
	param["fuel"] = data.carInfo.fuel;
	param["brdDivCd"] = viewFuelNm;//안쓸것 같은 이름을 단순히 찾은것이다. 실제로는 연료명이다.
	param["yearType"] = data.carInfo.prye;
	param["brandNbr"] = data.carInfo.makerNm;

	//Grade Drop을 위한 나이스 Dnr 파라미터 담기
	num_search.choiceItem(param);

	 //* 나이스DNR을 통해 조회하는 경우에는 제외하고 사용자가 브랜드 부터 직접 선택 했을 경우에는 '01'로 셋팅.
	 //* param["useType"] = '01';


	//등급 List - 쿼리를 사용해서 가져오기 때문에 json.stringify 사용.
	$.ajax({
	    url: "/product/selectSizeFinderGradeList",
	    type: "POST",
	    cache:false,
	    contentType:"application/json;charset=UTF-8",
	    data: JSON.stringify(param),
	    success: function(rData) {
	    	//console.log("---------- gradeList --------");
	    	//console.log(rData);
	    	//console.log("---------- gradeList --------");
	    	niceGradeList(rData, niceCarGradeStr, param);
	    },
	    error: function (request, status, error) {
	    	$("#loadingWrap").hide();
	    	ComUtil.alert(error);
		}
	});
}

//niceDnr을 통해 만든 Grade DropList(쿼리)
function niceGradeList(pData, niceCarGrade, pParam) {
	var carGradeNm = '';
	var carGradeHtml = '';
	$(".size-tab.type-num.step-02 .info-grade select").empty();
	$(".size-tab.type-num.step-02 .info-grade select").append('<option value="">전체</option>');
	for(var i=0; i<pData.length; i++) {
		if(niceCarGrade == pData[i].carGradeNm) {
			carGradeHtml = '<option value="' + pData[i].carGradeNm + '" selected>' + pData[i].carGradeNm + '</option>';
			carGradeNm = pData[i].carGradeNm;
		} else {
			carGradeHtml = '<option value="' + pData[i].carGradeNm + '">' + pData[i].carGradeNm + '</option>';
		}
		$(".size-tab.type-num.step-02 .info-grade select").append(carGradeHtml);
	}
	$(".size-tab.type-num.step-02 .info-grade select").niceSelect('update');

	//console.log("---------- carGradeHtml --------");
	//console.log(carGradeHtml);
	//console.log("---------- carGradeHtml --------");

	//console.log("---------- pParam --------");
	//console.log(pParam);
	//console.log("---------- pParam --------");

	/*
	 * 나이스DNR을 통해 조회하는 경우에는 제외하고 사용자가 브랜드 부터 직접 선택 했을 경우에는 '01'로 셋팅.
	 * param["useType"] = '01';
	 */
	pParam["carGradeNm"] = carGradeNm;

	//사이즈
	$.ajax({
	    url: "/product/selectSizeFinderList",
	    type: "POST",
	    cache:false,
	    contentType:"application/json;charset=UTF-8",
	    data: JSON.stringify(pParam),
	    success: function(data) {
	    	//console.log("---------- selectSizeFinderList --------");
	    	//console.log(data);
	    	//console.log("---------- selectSizeFinderList --------");
	    	niceSizeList(data, pParam);
	    },
	    error: function (request, status, error) {
	    	ComUtil.alert(error);
		},
		complete: function() {
			$("#loadingWrap").hide();
		}
	});
}

//[테스트용]niceDnr을 통해 만든 size DropList
function niceGradeListKjlee() {
	screen_change( 'num' , '2' );
	pParam = {};
	pParam["carClassNm"] = "뉴 스포티지";
	pParam["carGradeNm"] = "2WD TLX 고급형";
	pParam["fuel"] = "Diesel";
	pParam["repCarClassNbr"] = 1450;
	pParam["yearType"] = "2006";

	$("#loadingWrap").hide();

	//사이즈
	$.ajax({
		url: "/product/selectSizeFinderList",
		type: "POST",
		cache:false,
		contentType:"application/json;charset=UTF-8",
		data: JSON.stringify(pParam),
		success: function(data) {
			$("#loadingWrap").hide();
			//console.log("---------- selectSizeFinderList --------");
			//console.log(data);
			//console.log("---------- selectSizeFinderList --------");
			niceSizeList(data);
		},
		error: function (request, status, error) {
			$("#loadingWrap").hide();
			ComUtil.alert(error);
		}
	});
}

//niceDnr을 통해 만든 size DropList
function niceSizeList(pData, pParam) {
	var carTireSizeHtml = '';
	for(var i=0; i<pData.length; i++) {
		if (pData[i] != null){
			carTireSizeHtml += '<li><a data-code="'+ pData[i].classCd + '|'+ pData[i].driveFwd + '|' +pData[i].driveRwd+'|' + pParam.carClassNm+ '">' + pData[i].tireSpec + '</a></li>';
		}
	}
	$(".sizeFinder .size-tab.type-num.step-02 .choice-size").html(carTireSizeHtml);
}

//연식에 따른 등급,사이즈 재조회
function selectChoiceGradeSizeList() {
	var param = {};

	param["repCarClassNbr"] = car_search.choice_items[1].searchCd;
	param["carClassNm"] = car_search.choice_items[2].searchCd;
	param["fuel"] = car_search.choice_items[3].searchCd;
	param["yearType"] = $(".size-tab.type-car.step-02 .info-year select").val();
	param["useType"] = '1';

	//등급+사이즈
	$.ajax({
	    url: "/product/selectSizeFinderSize",
	    type: "POST",
	    cache:false,
	    contentType:"application/json;charset=UTF-8",
	    data: JSON.stringify(param),
	    success: function(data) {
	    	//fullNameList, yearList 사용 안함.
	    	//등급(선택 됐던것은 전체로 초기화 한다)
	    	$(".size-tab.type-car.step-02 .info-grade select").empty();
	    	if(data.gradList.length > 0) {
	    		$(".size-tab.type-car.step-02 .info-grade select").append('<option value="" selected>전체</option>');
	    		$.each(data.gradList, function( i, item ){
	    			$(".size-tab.type-car.step-02 .info-grade select").append('<option value="' + item.carGradeNm + '">' + item.carGradeNm + '</option>');
	    		});
	    		$(".size-tab.type-car.step-02 .info-grade select").niceSelect('update');
	    	}

	    	//사이즈
	    	$(".size-tab.type-car.step-02 .choice-size").empty();
	    	if(data.sizeList.length > 0) {
	    		$.each(data.sizeList, function( i, item ){
					$(".size-tab.type-car.step-02 .choice-size").append('<li><a data-code="' + item.classCd + '|' + item.driveFwd + '|' + item.driveRwd + '">' + item.tireSpec + '</a></li>');
				});
	    		$(".size-tab.type-car.step-02 .choice-size").niceSelect('update');
	    	}
	    },
	    error: function (request, status, error) {
	    	ComUtil.alert(error);
		},
		complete: function() {
			$("#loadingWrap").hide();
		}
	});
}

//등급에 따른 사이즈 재조회
function selectChoiceSizeList() {
	var tabType = $('.type-tab .active').data().tab;//num , car, size

	var param = {};

	/*
	 * 나이스DNR을 통해 조회하는 경우에는 제외하고 사용자가 브랜드 부터 직접 선택 했을 경우에는 '01'로 셋팅.
	 */
	if(tabType == 'num') {
		param["repCarClassNbr"] = num_search.choice_items[0].searchCd;
		param["carClassNm"] = num_search.choice_items[1].searchCd;
		param["fuel"] = num_search.choice_items[2].searchCd;
		param["yearType"] = num_search.choice_items[3].searchCd;
		param["carGradeNm"] = $(".size-tab.type-num.step-02 .info-grade select").val();
	} else if(tabType == 'car') {
		param["repCarClassNbr"] = car_search.choice_items[1].searchCd;
		param["carClassNm"] = car_search.choice_items[2].searchCd;
		param["fuel"] = car_search.choice_items[3].searchCd;
		param["yearType"] = $(".size-tab.type-car.step-02 .info-year select").val();
		param["carGradeNm"] = $(".size-tab.type-car.step-02 .info-grade select").val();
		param["useType"] = '1';
	}

	//사이즈
	$.ajax({
	    url: "/product/selectSizeFinderList",
	    type: "POST",
	    cache:false,
	    contentType:"application/json;charset=UTF-8",
	    data: JSON.stringify(param),
	    success: function(data) {
	    	if(tabType == 'num') {
	    		$(".size-tab.type-num.step-02 .choice-size").empty();
	    		if(data.length > 0) {
		    		$.each(data, function( i, item ){
						$(".size-tab.type-num.step-02 .choice-size").append('<li><a data-code="' + item.classCd + '|' + item.driveFwd + '|' + item.driveRwd + '">' + item.tireSpec + '</a></li>');
					});
		    		$(".size-tab.type-num.step-02 .choice-size").niceSelect('update');
		    	}
	    	} else if(tabType == 'car') {
	    		$(".size-tab.type-car.step-02 .choice-size").empty();
		    	if(data.length > 0) {
		    		$.each(data, function( i, item ){
						$(".size-tab.type-car.step-02 .choice-size").append('<li><a data-code="' + item.classCd + '|' + item.driveFwd + '|' + item.driveRwd + '">' + item.tireSpec + '</a></li>');
					});
		    		$(".size-tab.type-car.step-02 .choice-size").niceSelect('update');
		    	}
	    	}
	    },
	    error: function (request, status, error) {
	    	ComUtil.alert(error);
		},
		complete: function() {
			$("#loadingWrap").hide();
		}
	});
}


$(function(){

	// 최상위 탭 기능
	$('.sizeFinder .type-tab a').on('click',function(){
		$('.sizeFinder .type-tab a').removeClass('active');
		$(this).addClass('active');

		screen_change( $(this).data('tab') , '1' );
	});




	$(document).on("click",".sizeFinder .close-btn a" , function(){
		$(".sizeFinder").hide();
		$('.sizeFinder select').niceSelect('destroy');

		// 메인페이지 일경우 스크롤 기능을 복구 합니다.
		if(  typeof($.fn.fullpage) != "undefined" ){
			$.fn.fullpage.setMouseWheelScrolling(true);
			$.fn.fullpage.setAllowScrolling(true);
		}

	});

	// 차량 번호로 찾기
	// 다시선택 버튼
	$("#findSizeNumRetry").on('click',function(){  screen_change( 'num' , '1' );   });

	// 동의및 확인 버튼
	$("#findSizeNumCheck").on('click',function(){
		var niceCarNo = $("#sizeFinderCarNumberInput").val().replace(/(\s*)/g, "");
		var niceUsrNm = $("#sizeFinderCarNameInput").val().replace(/(\s*)/g, "");

		if(ValidUtil.isEmpty(niceCarNo)) {
			ComUtil.alert("차량번호를 입력해 주세요.");
			return false;
		}

		if(ValidUtil.isEmpty(niceUsrNm)) {
			ComUtil.alert("소유주명을 입력해 주세요.");
			return false;
		}

		$('#loadingWrap').show();
		//niceGradeListKjlee();

		const param = {
				"carNo" : niceCarNo,
				"usrNm" : niceUsrNm
		};
		//나이스 DNR 통신
		$.ajax({
		    url: "/product/niceDnrVer2Api",
		    type: "POST",
		    async: true,
		    cache:false,
		    contentType:"application/json;charset=UTF-8",
		    dataType: "JSON",
		    data:JSON.stringify(param),
		    success: function(data) {
		    	//$("#loadingWrap").hide();
		    	//console.log(":::niceDnr:::");
		    	//console.log(data);
		    	if(data.code == "0000") {
		    		niceCarInfo(data);
		    	} else if(data.code == "E901") {
		    		$("#loadingWrap").hide();
		    		ComUtil.alert("차량번호와 소유주명을 확인해주세요.");
		    	} else {
		    		$("#loadingWrap").hide();
			    	ComUtil.alert(data.msg);
		    	}
		    },
		    error: function (request, status, error) {
		    	$("#loadingWrap").hide();
		    	ComUtil.alert(error);
			}
		});

	});


	// 완료 버튼
	$("#findSizeNumSubmit").on('click',function(){
		if(ValidUtil.isEmpty($(".size-tab.type-num.step-02 .choice-size .active").data('code'))) {
			alert("사이즈를 선택해주세요.");
			return false;
		}
	    var split = [];
	    var dataArry = $(".size-tab.type-num.step-02 .choice-size .active").data('code').split('|');
	    var fwdArry = dataArry[1]; // 전륜
	    var selSizeArr1 = fwdArry.split('/');
	    var selSizeArr2 = selSizeArr1[1].split('R');

	    var rwdArry = dataArry[2]; // 후륜
	    var selRwdSizeArr1 = rwdArry.split('/');
	    var selRwdSizeArr2 = selRwdSizeArr1[1].split('R');

		var frm = document.prdListFrm;

		frm.classCd.value = dataArry[0];	// 차종구분
		frm.modelNm.value = num_search.choice_items[1].searchCdNm;
		// 전륜
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)
		// 후륜
		frm.sectionRwWidth.value = selRwdSizeArr1[0];	// 단면폭 (후륜)
		frm.aspectRwRatio.value  = selRwdSizeArr2[0];	// 편평비 (후륜)
		frm.wheelRwInches.value  = selRwdSizeArr2[1];	// 인치   (후륜)

		frm.tireSizeYn.value     = (fwdArry == rwdArry) ? "Y" : "N";

		frm.carNo.value = $("#sizeFinderCarNumberInput").val().replace(/(\s*)/g, "");	//차량번호

		frm.TireSizeCd.value = selSizeArr1[0] + '^' + selSizeArr1[1] + '^' + selSizeArr1[2];	//사이즈
		frm.TireSizeNm.value = $(".size-tab.type-num.step-02 .choice-size .active").text(); 	//사이즈명
		//frm.plyRating.value = //강도
		//frm.modelCd.value
		//frm.contentsCd.value

		// 후륜 TO-DO 향후 정의 필요
		/*
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)
		*/

		var carSearchParamObj = {};
		carSearchParamObj["brandNbr"] = num_search.choice_items[0].searchCdNm;
		carSearchParamObj["repCarClassNbr"] = num_search.choice_items[1].searchCdNm;
		carSearchParamObj["carClassNm"] = num_search.choice_items[2].searchCdNm;
		carSearchParamObj["fuel"] = num_search.choice_items[3].searchCdNm;
		carSearchParamObj["driveFwd"] = fwdArry;
		carSearchParamObj["driveRwd"] = rwdArry;
		carSearchParamObj["driveDsp"] = $(".size-tab.type-num.step-02 .choice-size .active").text();
		//후륜 파라미터 추가
		carSearchParamObj["sectionWidth"]   = frm.sectionWidth.value;
		carSearchParamObj["aspectRatio"]    = frm.aspectRatio.value;
		carSearchParamObj["wheelInches"]    = frm.wheelInches.value;
		carSearchParamObj["sectionRwWidth"] = frm.sectionRwWidth.value;
		carSearchParamObj["aspectRwRatio"]  = frm.aspectRwRatio.value;
		carSearchParamObj["wheelRwInches"]  = frm.wheelRwInches.value;
		carSearchParamObj["tireSizeYn"]     = frm.tireSizeYn.value;

		frm.carSearchParam.value = JSON.stringify(carSearchParamObj);  // 검색조건

		var param = {};
		param["repCarClassNbr"] = num_search.choice_items[0].searchCd;
		param["carClassNm"]     = num_search.choice_items[1].searchCd;
		param["carGradeNm"]     = $(".size-tab.type-num.step-02 .info-grade select").val();
		param["yearType"]       = num_search.choice_items[3].searchCd;
		param["fuel"]           = num_search.choice_items[2].searchCd;
		param["sectionWidth"]   = frm.sectionWidth.value;
		param["aspectRatio"]    = frm.aspectRatio.value;
		param["wheelInches"]    = frm.wheelInches.value;
		//후륜 파라미터 추가
		param["sectionRwWidth"] = frm.sectionRwWidth.value;
		param["aspectRwRatio"]  = frm.aspectRwRatio.value;
		param["wheelRwInches"]  = frm.wheelRwInches.value;
		param["tireSizeYn"]     = frm.tireSizeYn.value;
		param["frCd"]           = (fwdArry == rwdArry) ? 'Y' : 'N';
//console.log("findSizeNumSubmit="+JSON.stringify(param));
		//폼에 들어갈 추가 내용
		$.ajax({
			url: "/product/selectSizeFinderFormInfo",
			type: "POST",
			cache:false,
			contentType:"application/json;charset=UTF-8",
			data: JSON.stringify(param),
			success: function(data) {
				if(data.formInfoList.length > 0) {
					$.each(data.formInfoList,function( i, item ){
						frm.makerCd.value = item.makerCd;
						frm.modelCd.value = item.modelCd;
						frm.contentsCd.value = item.contentsCd;
						frm.plyRating.value = item.plyRating;
					});

					var gradeFormList = [];
					if(data.gradeList.length > 0) {
						$.each(data.gradeList,function( i, item ){
							gradeFormList.push(item.carGradeNbr);
						});
						frm.niceGradeCd.value = gradeFormList;
					}
				}

				//위 정보가 세팅되지 않더라도 구매는 가능하므로 다음 화면으로 전달하기로 함.
				if($("#sourceSystem").val() == "BO") {
					var data = $("#prdListFrm").serializeObject();
					fnSearchSizePopupCallBack(data);
					window.close();
				} else {
					$("#prdListFrm").submit();
				}
			},
			error: function (request, status, error) {
				ComUtil.alert(error);
			}
		});
	});

	// 차량번호로 찾기 -> 타이어 선택 버튼
	$("#findSizeNumTireSubmit").on('click',function(){
		if(ValidUtil.isEmpty($(".size-tab.type-num.step-02 .choice-size .active").data('code'))) {
			alert("사이즈를 선택해주세요.");
			return false;
		}
	    var split = [];
	    var dataArry = $(".size-tab.type-num.step-02 .choice-size .active").data('code').split('|');
	    var fwdArry = dataArry[1]; // 전륜
	    var selSizeArr1 = fwdArry.split('/');
	    var selSizeArr2 = selSizeArr1[1].split('R');

	    var rwdArry = dataArry[2]; // 후륜
	    var selRwdSizeArr1 = rwdArry.split('/');
	    var selRwdSizeArr2 = selRwdSizeArr1[1].split('R');

		var frm = document.prdListFrm;

		frm.classCd.value = dataArry[0];	// 차종구분
		frm.modelNm.value = num_search.choice_items[1].searchCdNm;
		// 전륜
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)
		// 후륜
		frm.sectionRwWidth.value = selRwdSizeArr1[0];	// 단면폭 (후륜)
		frm.aspectRwRatio.value  = selRwdSizeArr2[0];	// 편평비 (후륜)
		frm.wheelRwInches.value  = selRwdSizeArr2[1];	// 인치   (후륜)

		frm.tireSizeYn.value     = (fwdArry == rwdArry) ? "Y" : "N";

		frm.carNo.value = $("#sizeFinderCarNumberInput").val().replace(/(\s*)/g, "");	//차량번호

		frm.TireSizeCd.value = selSizeArr1[0] + '^' + selSizeArr1[1] + '^' + selSizeArr1[2];	//사이즈
		frm.TireSizeNm.value = $(".size-tab.type-num.step-02 .choice-size .active").text(); 	//사이즈명
		//frm.plyRating.value = //강도
		//frm.modelCd.value
		//frm.contentsCd.value

		// 후륜 TO-DO 향후 정의 필요
		/*
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)
		*/

		var carSearchParamObj = {};
		carSearchParamObj["brandNbr"] = num_search.choice_items[0].searchCdNm;
		carSearchParamObj["repCarClassNbr"] = num_search.choice_items[1].searchCdNm;
		carSearchParamObj["carClassNm"] = num_search.choice_items[2].searchCdNm;
		carSearchParamObj["fuel"] = num_search.choice_items[3].searchCdNm;
		carSearchParamObj["driveFwd"] = fwdArry;
		carSearchParamObj["driveRwd"] = rwdArry;
		carSearchParamObj["driveDsp"] = $(".size-tab.type-num.step-02 .choice-size .active").text();
		//후륜 파라미터 추가
		carSearchParamObj["sectionWidth"]   = frm.sectionWidth.value;
		carSearchParamObj["aspectRatio"]    = frm.aspectRatio.value;
		carSearchParamObj["wheelInches"]    = frm.wheelInches.value;
		carSearchParamObj["sectionRwWidth"] = frm.sectionRwWidth.value;
		carSearchParamObj["aspectRwRatio"]  = frm.aspectRwRatio.value;
		carSearchParamObj["wheelRwInches"]  = frm.wheelRwInches.value;
		carSearchParamObj["tireSizeYn"]     = frm.tireSizeYn.value;

		frm.carSearchParam.value = JSON.stringify(carSearchParamObj);  // 검색조건

		var param = {};
		param["repCarClassNbr"] = num_search.choice_items[0].searchCd;
		param["carClassNm"]     = num_search.choice_items[1].searchCd;
		param["carGradeNm"]     = $(".size-tab.type-num.step-02 .info-grade select").val();
		param["yearType"]       = num_search.choice_items[3].searchCd;
		param["fuel"]           = num_search.choice_items[2].searchCd;
		param["sectionWidth"]   = frm.sectionWidth.value;
		param["aspectRatio"]    = frm.aspectRatio.value;
		param["wheelInches"]    = frm.wheelInches.value;
		//후륜 파라미터 추가
		param["sectionRwWidth"] = frm.sectionRwWidth.value;
		param["aspectRwRatio"]  = frm.aspectRwRatio.value;
		param["wheelRwInches"]  = frm.wheelRwInches.value;
		param["tireSizeYn"]     = frm.tireSizeYn.value;
		param["frCd"]           = (fwdArry == rwdArry) ? 'Y' : 'N';
		//console.log("findSizeNumSubmit="+JSON.stringify(param));
		//폼에 들어갈 추가 내용
		$.ajax({
			url: "/product/selectSizeFinderFormInfo",
			type: "POST",
			cache:false,
			contentType:"application/json;charset=UTF-8",
			data: JSON.stringify(param),
			success: function(data) {
				if(data.formInfoList.length > 0) {
					$.each(data.formInfoList,function( i, item ){
						frm.makerCd.value = item.makerCd;
						frm.modelCd.value = item.modelCd;
						frm.contentsCd.value = item.contentsCd;
						frm.plyRating.value = item.plyRating;
					});

					var gradeFormList = [];
					if(data.gradeList.length > 0) {
						$.each(data.gradeList,function( i, item ){
							gradeFormList.push(item.carGradeNbr);
						});
						frm.niceGradeCd.value = gradeFormList;
					}
				}

				//위 정보가 세팅되지 않더라도 구매는 가능하므로 다음 화면으로 전달하기로 함.
				if($("#sourceSystem").val() == "BO") {
					var data = $("#prdListFrm").serializeObject();
					fnSearchSizePopupCallBack(data);
					window.close();
				} else {
					$("#prdListFrm").submit();
				}
			},
			error: function (request, status, error) {
				ComUtil.alert(error);
			}
		});
	});

	// 차량번호로 찾기 -> 경정비 선택 버튼
	$("#findSizeNumMaintenanceSubmit").on('click',function(){
		if($("div.size-tab.type-num.step-02 > div.car-info > div.car-text > div.car-grade > span > div > ul > li.option.selected").text() == '전체'){
			alert("세부등급을 선택해주세요.");
			return false;
		}

		var split = [];
//	    var dataArry = $(".size-tab.type-num.step-02 .choice-size .active").data('code').split('|');
//	    var fwdArry = dataArry[1]; // 전륜
//	    var selSizeArr1 = fwdArry.split('/');
//	    var selSizeArr2 = selSizeArr1[1].split('R');

//	    var rwdArry = dataArry[2]; // 후륜
//	    var selRwdSizeArr1 = rwdArry.split('/');
//	    var selRwdSizeArr2 = selRwdSizeArr1[1].split('R');

		var frm = document.prdListFrm;

//		frm.classCd.value = dataArry[0];	// 차종구분
		frm.modelNm.value = num_search.choice_items[1].searchCdNm;
		// 전륜
//		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
//		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
//		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)
		// 후륜
//		frm.sectionRwWidth.value = selRwdSizeArr1[0];	// 단면폭 (후륜)
//		frm.aspectRwRatio.value  = selRwdSizeArr2[0];	// 편평비 (후륜)
//		frm.wheelRwInches.value  = selRwdSizeArr2[1];	// 인치   (후륜)

//		frm.tireSizeYn.value     = (fwdArry == rwdArry) ? "Y" : "N";

		frm.carNo.value = $("#sizeFinderCarNumberInput").val().replace(/(\s*)/g, "");	//차량번호

//		frm.TireSizeCd.value = selSizeArr1[0] + '^' + selSizeArr1[1] + '^' + selSizeArr1[2];	//사이즈
//		frm.TireSizeNm.value = $(".size-tab.type-num.step-02 .choice-size .active").text(); 	//사이즈명
		//frm.plyRating.value = //강도
		//frm.modelCd.value
		//frm.contentsCd.value

		// 후륜 TO-DO 향후 정의 필요
		/*
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)
		*/

		var carSearchParamObj = {};
		carSearchParamObj["brandNbr"] = num_search.choice_items[0].searchCdNm;
		carSearchParamObj["repCarClassNbr"] = num_search.choice_items[1].searchCdNm;
		carSearchParamObj["carClassNm"] = num_search.choice_items[2].searchCdNm;
		carSearchParamObj["fuel"] = num_search.choice_items[3].searchCdNm;
//		carSearchParamObj["driveFwd"] = fwdArry;
//		carSearchParamObj["driveRwd"] = rwdArry;
//		carSearchParamObj["driveDsp"] = $(".size-tab.type-num.step-02 .choice-size .active").text();
		//후륜 파라미터 추가
//		carSearchParamObj["sectionWidth"]   = frm.sectionWidth.value;
//		carSearchParamObj["aspectRatio"]    = frm.aspectRatio.value;
//		carSearchParamObj["wheelInches"]    = frm.wheelInches.value;
//		carSearchParamObj["sectionRwWidth"] = frm.sectionRwWidth.value;
//		carSearchParamObj["aspectRwRatio"]  = frm.aspectRwRatio.value;
//		carSearchParamObj["wheelRwInches"]  = frm.wheelRwInches.value;
//		carSearchParamObj["tireSizeYn"]     = frm.tireSizeYn.value;

		frm.carSearchParam.value = JSON.stringify(carSearchParamObj);  // 검색조건

		var param = {};
		param["repCarClassNbr"] = num_search.choice_items[0].searchCd;
		param["carClassNm"]     = num_search.choice_items[1].searchCd;
		param["carGradeNm"]     = $(".size-tab.type-num.step-02 .info-grade select").val();
		param["yearType"]       = num_search.choice_items[3].searchCd;
		param["fuel"]           = num_search.choice_items[2].searchCd;
//		param["sectionWidth"]   = frm.sectionWidth.value;
//		param["aspectRatio"]    = frm.aspectRatio.value;
//		param["wheelInches"]    = frm.wheelInches.value;
		//후륜 파라미터 추가
//		param["sectionRwWidth"] = frm.sectionRwWidth.value;
//		param["aspectRwRatio"]  = frm.aspectRwRatio.value;
//		param["wheelRwInches"]  = frm.wheelRwInches.value;
//		param["tireSizeYn"]     = frm.tireSizeYn.value;
//		param["frCd"]           = (fwdArry == rwdArry) ? 'Y' : 'N';

		//폼에 들어갈 추가 내용
		/*
		$.ajax({
			url: "/product/selectSizeFinderFormInfo",
			type: "POST",
			cache:false,
			contentType:"application/json;charset=UTF-8",
			data: JSON.stringify(param),
			success: function(data) {
				if(data.formInfoList.length > 0) {
					$.each(data.formInfoList,function( i, item ){
						frm.makerCd.value = item.makerCd;
						frm.modelCd.value = item.modelCd;
						frm.contentsCd.value = item.contentsCd;
						frm.plyRating.value = item.plyRating;
					});

					var gradeFormList = [];
					if(data.gradeList.length > 0) {
						$.each(data.gradeList,function( i, item ){
							gradeFormList.push(item.carGradeNbr);
						});
						frm.niceGradeCd.value = gradeFormList;
					}
				}

				$('#prdListFrm').attr('action', "/product/svcList").submit();
			},
			error: function (request, status, error) {
				ComUtil.alert(error);
			}
		});
		*/

		$('#prdListFrm').attr('action', "/product/svcList").submit();
	});

	$(document).on("click",".size-tab.type-num.step-02 .choice-size li a" , function(){
		$(".size-tab.type-num.step-02 .choice-size li a").removeClass('active');
		$(event.target).addClass('active');
	});




	// 차종으로 찾기
	$(document).on("click",".size-tab.type-car.step-01 .item-list li a" , function(){
		car_search.choiceItem( $(event.target).data('code'),  $(event.target).text()  );
	});
	$(document).on("click",".size-tab.type-car.step-02 .choice-size li a" , function(){
		$(".size-tab.type-car.step-02 .choice-size li a").removeClass('active');
		$(event.target).addClass('active');
		car_search.choiceItem( $(event.target).data('code'),  $(event.target).text()  );
	});

	$(document).on("click",".size-tab.type-car .select-car-step .step-item.backenable" , function(){

		if( event.target.tagName == 'SPAN' ){
			var target_step = $(event.target).parents('.step-item').data('step');
			car_search.backstep( target_step );
		}else{
			var target_step = $(event.target).data('step');
			car_search.backstep( target_step );
		}


	});




	$("#findSizeCarRetry").on('click',function(){  car_search.reset();   });
	$("#findSizeCarSubmit").on('click',function(){

		if(ValidUtil.isEmpty($(".size-tab.type-car.step-02 .choice-size .active").data('code'))) {
			alert("사이즈를 선택해주세요.");
			return false;
		}
	    var split = [];
	    var dataArry = $(".size-tab.type-car.step-02 .choice-size .active").data('code').split('|');
	    var fwdArry = dataArry[1]; // 전륜
	    var selSizeArr1 = fwdArry.split('/');
	    var selSizeArr2 = selSizeArr1[1].split('R');
	    //후륜 로직 추가
	    var rwdArry = dataArry[2]; // 후륜
	    var selRwdSizeArr1 = rwdArry.split('/');
	    var selRwdSizeArr2 = selRwdSizeArr1[1].split('R');

		var frm = document.prdListFrm;

		frm.classCd.value = dataArry[0];	// 차종구분
		// 전륜
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)

		// 후륜정보 추가
		frm.sectionRwWidth.value = selRwdSizeArr1[0];	// 단면폭 (후륜)
		frm.aspectRwRatio.value  = selRwdSizeArr2[0];	// 편평비 (후륜)
		frm.wheelRwInches.value  = selRwdSizeArr2[1];	// 인치   (후륜)
		frm.tireSizeYn.value     = (fwdArry == rwdArry) ? "Y" : "N";

		frm.makerCd.value = car_search.choice_items[0].searchCd; 	//제조사
		frm.makerNm.value = car_search.choice_items[0].searchCdNm; 	//제조사명(현대)
		//frm.modelCd.value = car_search.choice_items[2].searchCd;	//모델 - 기존에는 코드를 넘겼으나 현재는 둘다 이름으로 넘긴다.
		frm.modelNm.value = car_search.choice_items[2].searchCdNm;	//모델명
		//frm.contentsCd.value = //차 사양코드
		frm.TireSizeCd.value = selSizeArr1[0] + '^' + selSizeArr1[1] + '^' + selSizeArr1[2];	//사이즈
		frm.TireSizeNm.value = $(".size-tab.type-car.step-02 .choice-size .active").text(); 	//사이즈명
		//frm.plyRating.value = //강도

		var carSearchParamObj = {};
		carSearchParamObj["brandNbr"] = car_search.choice_items[0].searchCdNm;
		carSearchParamObj["repCarClassNbr"] = car_search.choice_items[1].searchCdNm;
		carSearchParamObj["carClassNm"] = car_search.choice_items[2].searchCdNm;
		carSearchParamObj["fuel"] = car_search.choice_items[3].searchCdNm;
		carSearchParamObj["driveFwd"] = fwdArry;
		carSearchParamObj["driveRwd"] = rwdArry;
		carSearchParamObj["driveDsp"] = $(".size-tab.type-car.step-02 .choice-size .active").text();
		//전후륜 파라미터 추가
		carSearchParamObj["sectionWidth"]   = frm.sectionWidth.value;
		carSearchParamObj["aspectRatio"]    = frm.aspectRatio.value;
		carSearchParamObj["wheelInches"]    = frm.wheelInches.value;
		carSearchParamObj["sectionRwWidth"] = frm.sectionRwWidth.value;
		carSearchParamObj["aspectRwRatio"]  = frm.aspectRwRatio.value;
		carSearchParamObj["wheelRwInches"]  = frm.wheelRwInches.value;
		carSearchParamObj["tireSizeYn"]     = frm.tireSizeYn.value;

		frm.carSearchParam.value = JSON.stringify(carSearchParamObj);  // 검색조건

		// 후륜 TO-DO 향후 정의 필요
		/*
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)
		*/

		var param = {};
		param["repCarClassNbr"] = car_search.choice_items[1].searchCd;
		param["carClassNm"]     = car_search.choice_items[2].searchCd;
		param["carGradeNm"]     = $(".size-tab.type-car.step-02 .info-grade select").val();
		param["yearType"]       = $(".size-tab.type-car.step-02 .info-year select").val();
		param["fuel"]           = car_search.choice_items[3].searchCd;
		param["sectionWidth"]   = frm.sectionWidth.value;
		param["aspectRatio"]    = frm.aspectRatio.value;
		param["wheelInches"]    = frm.wheelInches.value;
		//후륜정보 추가
		param["sectionRwWidth"] = frm.sectionRwWidth.value;
		param["aspectRwRatio"]  = frm.aspectRwRatio.value;
		param["wheelRwInches"]  = frm.wheelRwInches.value;
		param["tireSizeYn"]     = frm.tireSizeYn.value;
//console.log("findSizeCarSubmit="+JSON.stringify(param));
		param["frCd"]           = fwdArry == rwdArry ? 'Y' : 'N';

		//폼에 들어갈 추가 내용
		$.ajax({
			url: "/product/selectSizeFinderFormInfo",
			type: "POST",
			cache:false,
			contentType:"application/json;charset=UTF-8",
			data: JSON.stringify(param),
			success: function(data) {
				if(data.formInfoList.length > 0) {
					$.each(data.formInfoList,function( i, item ){
						frm.makerCd.value = item.makerCd;
						frm.modelCd.value = item.modelCd;
						frm.contentsCd.value = item.contentsCd;
						frm.plyRating.value = item.plyRating;
					});

					var gradeFormList = [];
					if(data.gradeList.length > 0) {
						$.each(data.gradeList,function( i, item ){
							gradeFormList.push(item.carGradeNbr);
						});
						frm.niceGradeCd.value = gradeFormList;
					}
				}

				//위 정보가 세팅되지 않더라도 구매는 가능하므로 다음 화면으로 전달하기로 함.
				if($("#sourceSystem").val() == "BO") {
					var data = $("#prdListFrm").serializeObject();
					fnSearchSizePopupCallBack(data);
					window.close();
				} else {
					$("#prdListFrm").submit();
				}
			},
			error: function (request, status, error) {
				ComUtil.alert(error);
			}
		});
	});

	//차종으로 찾기 -> 타이어 선택
	$("#findSizeCarTireSubmit").on('click',function(){
		if(ValidUtil.isEmpty($(".size-tab.type-car.step-02 .choice-size .active").data('code'))) {
			alert("사이즈를 선택해주세요.");
			return false;
		}

	    var split = [];
	    var dataArry = $(".size-tab.type-car.step-02 .choice-size .active").data('code').split('|');
	    var fwdArry = dataArry[1]; // 전륜
	    var selSizeArr1 = fwdArry.split('/');
	    var selSizeArr2 = selSizeArr1[1].split('R');
	    //후륜 로직 추가
	    var rwdArry = dataArry[2]; // 후륜
	    var selRwdSizeArr1 = rwdArry.split('/');
	    var selRwdSizeArr2 = selRwdSizeArr1[1].split('R');

		var frm = document.prdListFrm;

		frm.classCd.value = dataArry[0];	// 차종구분
		// 전륜
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)

		// 후륜정보 추가
		frm.sectionRwWidth.value = selRwdSizeArr1[0];	// 단면폭 (후륜)
		frm.aspectRwRatio.value  = selRwdSizeArr2[0];	// 편평비 (후륜)
		frm.wheelRwInches.value  = selRwdSizeArr2[1];	// 인치   (후륜)
		frm.tireSizeYn.value     = (fwdArry == rwdArry) ? "Y" : "N";

		frm.makerCd.value = car_search.choice_items[0].searchCd; 	//제조사
		frm.makerNm.value = car_search.choice_items[0].searchCdNm; 	//제조사명(현대)
		//frm.modelCd.value = car_search.choice_items[2].searchCd;	//모델 - 기존에는 코드를 넘겼으나 현재는 둘다 이름으로 넘긴다.
		frm.modelNm.value = car_search.choice_items[2].searchCdNm;	//모델명
		//frm.contentsCd.value = //차 사양코드
		frm.TireSizeCd.value = selSizeArr1[0] + '^' + selSizeArr1[1] + '^' + selSizeArr1[2];	//사이즈
		frm.TireSizeNm.value = $(".size-tab.type-car.step-02 .choice-size .active").text(); 	//사이즈명
		//frm.plyRating.value = //강도

		var carSearchParamObj = {};
		carSearchParamObj["brandNbr"] = car_search.choice_items[0].searchCdNm;
		carSearchParamObj["repCarClassNbr"] = car_search.choice_items[1].searchCdNm;
		carSearchParamObj["carClassNm"] = car_search.choice_items[2].searchCdNm;
		carSearchParamObj["fuel"] = car_search.choice_items[3].searchCdNm;
		carSearchParamObj["driveFwd"] = fwdArry;
		carSearchParamObj["driveRwd"] = rwdArry;
		carSearchParamObj["driveDsp"] = $(".size-tab.type-car.step-02 .choice-size .active").text();
		//전후륜 파라미터 추가
		carSearchParamObj["sectionWidth"]   = frm.sectionWidth.value;
		carSearchParamObj["aspectRatio"]    = frm.aspectRatio.value;
		carSearchParamObj["wheelInches"]    = frm.wheelInches.value;
		carSearchParamObj["sectionRwWidth"] = frm.sectionRwWidth.value;
		carSearchParamObj["aspectRwRatio"]  = frm.aspectRwRatio.value;
		carSearchParamObj["wheelRwInches"]  = frm.wheelRwInches.value;
		carSearchParamObj["tireSizeYn"]     = frm.tireSizeYn.value;

		frm.carSearchParam.value = JSON.stringify(carSearchParamObj);  // 검색조건

		// 후륜 TO-DO 향후 정의 필요
		/*
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)
		*/

		var param = {};
		param["repCarClassNbr"] = car_search.choice_items[1].searchCd;
		param["carClassNm"]     = car_search.choice_items[2].searchCd;
		param["carGradeNm"]     = $(".size-tab.type-car.step-02 .info-grade select").val();
		param["yearType"]       = $(".size-tab.type-car.step-02 .info-year select").val();
		param["fuel"]           = car_search.choice_items[3].searchCd;
		param["sectionWidth"]   = frm.sectionWidth.value;
		param["aspectRatio"]    = frm.aspectRatio.value;
		param["wheelInches"]    = frm.wheelInches.value;
		//후륜정보 추가
		param["sectionRwWidth"] = frm.sectionRwWidth.value;
		param["aspectRwRatio"]  = frm.aspectRwRatio.value;
		param["wheelRwInches"]  = frm.wheelRwInches.value;
		param["tireSizeYn"]     = frm.tireSizeYn.value;
//console.log("findSizeCarSubmit="+JSON.stringify(param));
		param["frCd"]           = fwdArry == rwdArry ? 'Y' : 'N';

		//폼에 들어갈 추가 내용
		$.ajax({
			url: "/product/selectSizeFinderFormInfo",
			type: "POST",
			cache:false,
			contentType:"application/json;charset=UTF-8",
			data: JSON.stringify(param),
			success: function(data) {
				if(data.formInfoList.length > 0) {
					$.each(data.formInfoList,function( i, item ){
						frm.makerCd.value = item.makerCd;
						frm.modelCd.value = item.modelCd;
						frm.contentsCd.value = item.contentsCd;
						frm.plyRating.value = item.plyRating;
					});

					var gradeFormList = [];
					if(data.gradeList.length > 0) {
						$.each(data.gradeList,function( i, item ){
							gradeFormList.push(item.carGradeNbr);
						});
						frm.niceGradeCd.value = gradeFormList;
					}
				}

				//위 정보가 세팅되지 않더라도 구매는 가능하므로 다음 화면으로 전달하기로 함.
				if($("#sourceSystem").val() == "BO") {
					var data = $("#prdListFrm").serializeObject();
					fnSearchSizePopupCallBack(data);
					window.close();
				} else {
					$("#prdListFrm").submit();
				}
			},
			error: function (request, status, error) {
				ComUtil.alert(error);
			}
		});
	});

	//차종으로 찾기 -> 경정비 선택
	$("#findSizeCarMaintenanceSubmit").on('click',function(){
		if($("div.size-tab.type-car.step-02 > div.car-info > div.car-detail > div:nth-child(1) > span > div > ul > li.option.selected").text() == '전체'){
			alert("모델연도를 선택해주세요.");
			return false;
		}

		if($("div.size-tab.type-car.step-02 > div.car-info > div.car-detail > div:nth-child(2) > span > div > ul > li.option.selected").text() == '전체'){
			alert("세부등급을 선택해주세요.");
			return false;
		}

		var split = [];
//	    var dataArry = $(".size-tab.type-car.step-02 .choice-size .active").data('code').split('|');
//	    var fwdArry = dataArry[1]; // 전륜
//	    var selSizeArr1 = fwdArry.split('/');
//	    var selSizeArr2 = selSizeArr1[1].split('R');
	    //후륜 로직 추가
//	    var rwdArry = dataArry[2]; // 후륜
//	    var selRwdSizeArr1 = rwdArry.split('/');
//	    var selRwdSizeArr2 = selRwdSizeArr1[1].split('R');

		var frm = document.prdListFrm;

//		frm.classCd.value = dataArry[0];	// 차종구분
		// 전륜
//		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
//		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
//		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)

		// 후륜정보 추가
//		frm.sectionRwWidth.value = selRwdSizeArr1[0];	// 단면폭 (후륜)
//		frm.aspectRwRatio.value  = selRwdSizeArr2[0];	// 편평비 (후륜)
//		frm.wheelRwInches.value  = selRwdSizeArr2[1];	// 인치   (후륜)
//		frm.tireSizeYn.value     = (fwdArry == rwdArry) ? "Y" : "N";

		frm.makerCd.value = car_search.choice_items[0].searchCd; 	//제조사
		frm.makerNm.value = car_search.choice_items[0].searchCdNm; 	//제조사명(현대)
		frm.modelNm.value = car_search.choice_items[2].searchCdNm;	//모델명
//		frm.TireSizeCd.value = selSizeArr1[0] + '^' + selSizeArr1[1] + '^' + selSizeArr1[2];	//사이즈
//		frm.TireSizeNm.value = $(".size-tab.type-car.step-02 .choice-size .active").text(); 	//사이즈명

		var carSearchParamObj = {};
		carSearchParamObj["brandNbr"] = car_search.choice_items[0].searchCdNm;
		carSearchParamObj["repCarClassNbr"] = car_search.choice_items[1].searchCdNm;
		carSearchParamObj["carClassNm"] = car_search.choice_items[2].searchCdNm;
		carSearchParamObj["fuel"] = car_search.choice_items[3].searchCdNm;
//		carSearchParamObj["driveFwd"] = fwdArry;
//		carSearchParamObj["driveRwd"] = rwdArry;
//		carSearchParamObj["driveDsp"] = $(".size-tab.type-car.step-02 .choice-size .active").text();
		//전후륜 파라미터 추가
//		carSearchParamObj["sectionWidth"]   = frm.sectionWidth.value;
//		carSearchParamObj["aspectRatio"]    = frm.aspectRatio.value;
//		carSearchParamObj["wheelInches"]    = frm.wheelInches.value;
//		carSearchParamObj["sectionRwWidth"] = frm.sectionRwWidth.value;
//		carSearchParamObj["aspectRwRatio"]  = frm.aspectRwRatio.value;
//		carSearchParamObj["wheelRwInches"]  = frm.wheelRwInches.value;
//		carSearchParamObj["tireSizeYn"]     = frm.tireSizeYn.value;

		frm.carSearchParam.value = JSON.stringify(carSearchParamObj);  // 검색조건

		var param = {};
		param["repCarClassNbr"] = car_search.choice_items[1].searchCd;
		param["carClassNm"]     = car_search.choice_items[2].searchCd;
		param["carGradeNm"]     = $(".size-tab.type-car.step-02 .info-grade select").val();
		param["yearType"]       = $(".size-tab.type-car.step-02 .info-year select").val();
		param["fuel"]           = car_search.choice_items[3].searchCd;
//		param["sectionWidth"]   = frm.sectionWidth.value;
//		param["aspectRatio"]    = frm.aspectRatio.value;
//		param["wheelInches"]    = frm.wheelInches.value;
		//후륜정보 추가
//		param["sectionRwWidth"] = frm.sectionRwWidth.value;
//		param["aspectRwRatio"]  = frm.aspectRwRatio.value;
//		param["wheelRwInches"]  = frm.wheelRwInches.value;
//		param["tireSizeYn"]     = frm.tireSizeYn.value;
//		param["frCd"]           = fwdArry == rwdArry ? 'Y' : 'N';

		//폼에 들어갈 추가 내용
		/*
		$.ajax({
			url: "/product/selectSizeFinderFormInfo",
			type: "POST",
			cache:false,
			contentType:"application/json;charset=UTF-8",
			data: JSON.stringify(param),
			success: function(data) {
				if(data.formInfoList.length > 0) {
					$.each(data.formInfoList,function( i, item ){
						frm.makerCd.value = item.makerCd;
						frm.modelCd.value = item.modelCd;
						frm.contentsCd.value = item.contentsCd;
						frm.plyRating.value = item.plyRating;
					});

					var gradeFormList = [];
					if(data.gradeList.length > 0) {
						$.each(data.gradeList,function( i, item ){
							gradeFormList.push(item.carGradeNbr);
						});
						frm.niceGradeCd.value = gradeFormList;
					}
				}

				$('#prdListFrm').attr('action', "/product/svcList").submit();
			},
			error: function (request, status, error) {
				ComUtil.alert(error);
			}
		});
		*/

		$('#prdListFrm').attr('action', "/product/svcList").submit();
	});


	// 사이즈로 찾기
	$(document).on("click",".size-tab.type-size.step-01 .item-list li a" , function(){
		size_search.choiceItem( $(event.target).data('code'),  $(event.target).text()  );
	});
	$(document).on("click",".size-tab.type-size.step-02 .choice-size li a" , function(){
		$(".size-tab.type-size.step-02 .choice-size li a").removeClass('active');
		$(event.target).addClass('active');
		size_search.choiceItem( $(event.target).data('code'),  $(event.target).text()  );
	});


	$(document).on("click",".size-tab.type-size .size-step .step-item.backenable" , function(){

		if( event.target.tagName == 'SPAN' ){
			var target_step = $(event.target).parents('.step-item').data('step');
			size_search.backstep( target_step );
		}else{
			var target_step = $(event.target).data('step');
			size_search.backstep( target_step );
		}
	});

	$("#findCarSizeRetry,#findCarSizeRetry2").on('click',function(){  size_search.reset();   });
	$("#findCarSizeSubmit,#findCarSizeSubmit2").on('click',function(){

		var fwdArry = size_search.getSizeStr('F'); // 전륜
	    var rwdArry = size_search.setMode == 'R' ? size_search.getSizeStr('R') : size_search.getSizeStr('F'); // 후륜
	    var selSizeArr1 = fwdArry.split('/');
	    var selSizeArr2 = selSizeArr1[1].split('R');
	    //전후륜 로직 추가
	    var selRwdSizeArr1 = rwdArry.split('/');
	    var selRwdSizeArr2 = selRwdSizeArr1[1].split('R');

		var frm = document.prdListFrm;

		// 전륜
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)

		// 후륜
		frm.sectionRwWidth.value = selRwdSizeArr1[0];	// 단면폭 (후륜)
		frm.aspectRwRatio.value  = selRwdSizeArr2[0];	// 편평비 (후륜)
		frm.wheelRwInches.value  = selRwdSizeArr2[1];	// 인치   (후륜)

		frm.tireSizeYn.value  = (fwdArry == rwdArry) ? "Y" : "N";

		frm.plyRating.value = size_search.front_items[2].searchCd.split('|')[1];//강도

		var carSearchParamObj = {};
		carSearchParamObj["brandNbr"] = "";
		carSearchParamObj["repCarClassNbr"] = "";
		carSearchParamObj["carClassNm"] = "";
		carSearchParamObj["fuel"] = "";
		carSearchParamObj["driveFwd"] = fwdArry;
		carSearchParamObj["driveRwd"] = rwdArry;
		carSearchParamObj["driveDsp"] = size_search.setMode == 'R' ? carSearchParamObj["driveDsp"] = '전륜 ' + fwdArry + ' | 후륜 ' + rwdArry : fwdArry;
		//후륜파라미터 추가
		carSearchParamObj["sectionWidth"]   = frm.sectionWidth.value;
		carSearchParamObj["aspectRatio"]    = frm.aspectRatio.value;
		carSearchParamObj["wheelInches"]    = frm.wheelInches.value;
		carSearchParamObj["sectionRwWidth"] = frm.sectionRwWidth.value;
		carSearchParamObj["aspectRwRatio"]  = frm.aspectRwRatio.value;
		carSearchParamObj["wheelRwInches"]  = frm.wheelRwInches.value;
		carSearchParamObj["tireSizeYn"]     = frm.tireSizeYn.value;

		frm.carSearchParam.value = JSON.stringify(carSearchParamObj);  // 검색조건

		// 후륜 TO-DO 향후 정의 필요
		/*
		frm.sectionWidth.value = selSizeArr1[0];	// 단면폭 (전륜)
		frm.aspectRatio.value = selSizeArr2[0];		// 편평비 (전륜)
		frm.wheelInches.value = selSizeArr2[1];		// 인치 (전륜)
		frm.plyRating.value = size_search.rear_items[2].searchCd.split('|')[1];//강도
		*/

		//폼에 들어갈 추가 내용 없음.
		if($("#sourceSystem").val() == "BO") {
			var data = $("#prdListFrm").serializeObject();
			fnSearchSizePopupCallBack(data);
			window.close();
		} else {
			$("#prdListFrm").submit();
		}
	});
	$("#findCarSizeAddRear").on('click',function(){
		size_search.addRear();
	});



});



// 차종으로 찾기
var car_search = {

	step_label:['브랜드','차종','모델','연료','사이즈'],
	step_api:[
		'/product/selectSizeFinderBrandList',  // 브랜드
		'/product/selectSizeFinderCarTypeList',  // 차종
		'/product/selectSizeFinderModelList',  // 모델
		'/product/selectSizeFinderFuelList',  // 연료
		'/product/selectSizeFinderSize',  // 사이즈
	],
	choice_items:[],
	nowStep:0,
	init:function(){
		$("#loadingWrap").show();
		// 라벨용으로 빈값 채우기
		for( i in this.step_label )
			this.choice_items[i] = {searchCd:'',searchCdNm:''};
		//현재 스텝
		this.nowStep = 0;
		//스텝에 따른 화면
		this.renderStep( 0 );
		//스텝에 따른 데이터 조회
		this.getData( 0 );

		$(".size-tab").hide();
		$(".size-tab.type-car.step-01").show();

	},
	renderStep:function( stepNum ){
		$(".size-tab.type-car .select-car-step").empty();
		for( i in this.step_label ){
			step = this.step_label[i];
			if( i < this.nowStep ) step = this.choice_items[i].searchCdNm;
			if( i == this.step_label.length -1 ) continue;

			$(".size-tab.type-car .select-car-step").append('<div class="step-item '+(i ==stepNum ?'active':'' )+' '+( i < this.nowStep ? 'backenable':'')+'" data-step="'+i+'" ><span>'+step+'</span></div>');
		}
		// $(".size-tab.type-car .select-car-step > div ").eq( stepNum ).addClass('active');
	},

	getData:function( stepNum, key ){
		var param = {};

		param["useType"] = '1';
		param["brandNbr"] = this.choice_items[0].searchCd;
		param["repCarClassNbr"] = this.choice_items[1].searchCd;
		param["carClassNm"] = this.choice_items[2].searchCd;
		param["fuel"] = this.choice_items[3].searchCd;

		if( stepNum != this.step_label.length -1 ){
			/*
			 * jQuery.get( url [, data] [, success(data, textStatus, jqXHR)] [, dataType] )
			 * data : 요청과 함께 서버에 보내는 string 또는 map
			 * success(data,textStatus,jqXHR) : 요청이 성공일때 실행되는 callback 함수
			 * dataType : 서버에서 내려온 data 형식. ( default : xml,json,script,text,html )
			 */
			/*$.get( this.step_api[ stepNum ] ,{useType:'01'},function( resp ){
				$(".size-tab.type-car.step-01 .item-list").empty();
				console.log("333");
				$.each(resp,function( i, data ){
					$(".size-tab.type-car.step-01 .item-list").append('<li><a data-code="'+data.brandNbr+'">'+data.brandNm+'</a></li>');
				});
			},'json');*/

			$.ajax({
			    url: this.step_api[ stepNum ],
			    type: "POST",
			    cache:false,
			    contentType : "application/json; charset=UTF-8",
			    data: JSON.stringify(param),
			    success: function(data) {
			    	$(".size-tab.type-car.step-01 .item-list").empty();
			    	if(stepNum == 0) {//브랜드
			    		$.each(data,function( i, item ){
							$(".size-tab.type-car.step-01 .item-list").append('<li><a data-code="'+item.brandNbr+'">'+item.brandNm+'</a></li>');
						});
			    	} else if(stepNum == 1) {//차종
			    		$.each(data,function( i, item ){
			    			$(".size-tab.type-car.step-01 .item-list").append('<li><a data-code="'+item.repCarClassNbr+'">'+item.repCarClassNm+'</a></li>');
			    		});
				    } else if(stepNum == 2) {//모델
				    	$.each(data,function( i, item ){
				    		$(".size-tab.type-car.step-01 .item-list").append('<li><a data-code="'+item.carClassNm+'">'+item.carClassNm+'</a></li>');
				    	});
				    	//$(".size-tab.type-car.step-01 .item-list").append('<li><a data-code="">모르겠음</a></li>');
				    } else if(stepNum == 3) {//연료
				    	$.each(data,function( i, item ){
				    		$(".size-tab.type-car.step-01 .item-list").append('<li><a data-code="'+item.fuel+'">'+item.fuelNm+'</a></li>');
				    	});
				    }
			    },
			    error: function (request, status, error) {
			    	ComUtil.alert(error);
				},
				complete:function() {
					$("#loadingWrap").hide();
				}
			});
		}else{  // 마지막 스텝
			//사이즈 화면 열기전 Form 준비
			var frm = document.prdListFrm;
			var carSearchParamObj = {};
			carSearchParamObj["brandNbr"] = this.choice_items[0].searchCdNm;
			carSearchParamObj["repCarClassNbr"] = this.choice_items[1].searchCdNm;
			carSearchParamObj["carClassNm"] = this.choice_items[2].searchCdNm;
			carSearchParamObj["fuel"] = this.choice_items[3].searchCdNm;
			frm.carSearchParam.value = JSON.stringify(carSearchParamObj);  // 검색조건

			$(".size-tab.type-car.step-01 ").hide();
			$(".size-tab.type-car.step-02 ").show();

			$.ajax({
			    url: this.step_api[ stepNum ],
			    type: "POST",
			    cache:false,
			    contentType : "application/json; charset=UTF-8",
			    data: JSON.stringify(param),
			    success: function(data) {
			    	//풀네임
			    	if(data.fullNameList.length > 0) {
			    		$.each(data.fullNameList, function( i, item ){
			    			$(".size-tab.type-car.step-02 .car-name").text(item.modelNm);
			    			if(ValidUtil.isEmpty(item.repImageUrl)) {
			    				$(".size-tab.type-car.step-02 .car-img img").attr('src','/img/common/car_finder/num_car.png');
			    			} else {
			    				$(".size-tab.type-car.step-02 .car-img img").attr('src',item.repImageUrl);
			    			}
			    		});
			    	}

			    	//연식
			    	if(data.yearList.length > 0) {
			    		$(".size-tab.type-car.step-02 .info-year select").empty();
			    		$(".size-tab.type-car.step-02 .info-year select").append('<option value="" selected>전체</option>');
			    		$.each(data.yearList, function( i, item ){
			    			$(".size-tab.type-car.step-02 .info-year select").append('<option value="' + item.yearType + '">' + item.yearType + '년</option>');
			    		});
			    		$(".size-tab.type-car.step-02 .info-year select").niceSelect('update');
			    	}

			    	//등급
			    	if(data.gradList.length > 0) {
			    		$(".size-tab.type-car.step-02 .info-grade select").empty();
			    		$(".size-tab.type-car.step-02 .info-grade select").append('<option value="" selected>전체</option>');
			    		$.each(data.gradList, function( i, item ){
			    			$(".size-tab.type-car.step-02 .info-grade select").append('<option value="' + item.carGradeNm + '">' + item.carGradeNm + '</option>');
			    		});
			    		$(".size-tab.type-car.step-02 .info-grade select").niceSelect('update');
			    	}

			    	//사이즈
			    	if(data.sizeList.length > 0) {
			    		$(".size-tab.type-car.step-02 .choice-size").empty();
			    		$.each(data.sizeList, function( i, item ){
							$(".size-tab.type-car.step-02 .choice-size").append('<li><a data-code="' + item.classCd + '|' + item.driveFwd + '|' + item.driveRwd + '">' + item.tireSpec + '</a></li>');
						});
			    		$(".size-tab.type-car.step-02 .choice-size").niceSelect('update');
			    	}
			    },
			    error: function (request, status, error) {
			    	ComUtil.alert(error);
				},
				complete:function() {
					$("#loadingWrap").hide();
				}
			});

			/*$.get( this.step_api[ stepNum ] ,{key:key},function( resp ){
				$(".size-tab.type-car.step-02 .choice-size").empty();
				$.each(resp,function( i, data ){
					$(".size-tab.type-car.step-02 .choice-size").append('<li><a data-code="'+data.searchCd+'">'+data.searchCdNm+'</a></li>');
				});
			},'json');*/

		}
	},
	choiceItem:function( code , name ){
		this.choice_items[ this.nowStep ] = {searchCd:code,searchCdNm:name};

		if( this.nowStep != this.step_label.length -1 ){
			$("#loadingWrap").show();
			this.nowStep += 1;
			this.renderStep( this.nowStep );
			this.getData( this.nowStep );
		}
	},
	reset:function(){
		this.nowStep = 0;
		this.choice_items = [];
		this.init();
	},
	backstep:function  ( step ){
		step = parseInt( step );
		this.nowStep = step;
		// this.choice_items = [];
		// this.init();

		$("#loadingWrap").show();
		// 라벨용으로 빈값 채우기
		for( var i in this.step_label )
			if( i >= step )
				this.choice_items[i] = {searchCd:'',searchCdNm:''};
		//현재 스텝
		this.nowStep = step;
		//스텝에 따른 화면
		this.renderStep( step );
		//스텝에 따른 데이터 조회
		this.getData( step );

		$(".size-tab").hide();
		$(".size-tab.type-car.step-01").show();

	}
};




// 사이즈로 찾기
var size_search = {

	step_label:['단면폭','평편비','인치'],
	step_api:[
		'/product/selectWidthList',  // 단면폭
		'/product/selectFlatnessList',  // 평편비
		'/product/selectInchList',  // 인치
	],
	choice_items:[],
	class_cds:["P1","S1","V1"],
	front_items:[],
	rear_items:[],
	nowStep:0,
	setMode:'F',
	init:function(){
		$("#loadingWrap").show();

		// 라벨용으로 빈값 채우기
		for( i in this.step_label ){
			this.front_items[i] = {searchCd:'',searchCdNm:''};
			this.rear_items[i] = {searchCd:'',searchCdNm:''};
		}
		this.nowStep = 0;
		this.setMode = 'F';
		this.renderStep( 0 );
		this.getData( 0 );

		$(".size-tab").hide();
		$(".size-tab.type-size.step-01").show();
	},
	renderStep:function( stepNum ){
		$(".size-tab.type-size .size-step").empty();
		if( this.setMode == 'R' ){
			$(".size-tab.type-size .size-step").append('<div class="step-ico front">전륜</div>');
			$(".size-tab.type-size .size-step").append('<div class="step-front-size">'+this.getSizeStr('F')+'</div>');
			$(".size-tab.type-size .size-step").append('<div class="step-ico rear">후륜</div>');
		}

		var items = [];
		if( this.setMode == 'F' )
			items = this.front_items;
		else if( this.setMode == 'R' )
			items = this.rear_items;
		for( i in this.step_label ){
			step = this.step_label[i];
			if( i < this.nowStep ) step = items[i].searchCdNm;
			// $(".size-tab.type-size .size-step").append('<div class="step-item '+(i ==stepNum ?'active':'' )+'"><span>'+step+'</span></div>');

			$(".size-tab.type-size .size-step").append('<div class="step-item '+(i ==stepNum ?'active':'' )+' '+( i < this.nowStep ? 'backenable':'')+'" data-step="'+i+'" ><span>'+step+'</span></div>');
		}
		// $(".size-tab.type-size .select-car-step > div ").eq( stepNum ).addClass('active');
	},
	getSizeStr:function( type ){
		if( type == null ) type = 'F';
		var items = [];
		if( type == 'F' )
			items = this.front_items;
		else if( type == 'R' )
			items = this.rear_items;

		return items[0].searchCdNm+'/'+items[1].searchCdNm+'R'+items[2].searchCdNm;
	},
	getData:function( stepNum, key ){
		var param = {};
		var items = [];
		if( this.setMode == 'F' )
			items = this.front_items;
		else if( this.setMode == 'R' )
			items = this.rear_items;

		param["systemGbn"] = 'R';
		param["sectionWidth"] = items[0].searchCd;
		param["fCarType"] = this.class_cds;
		param["aspectRatio"] = items[1].searchCd;

		if( stepNum != this.step_label.length -1 ){
			$.ajax({
			    url: this.step_api[ stepNum ],
			    type: "POST",
			    cache:false,
			    contentType : "application/json; charset=UTF-8",
			    data: JSON.stringify(param),
			    success: function(data) {
			    	$(".size-tab.type-size.step-01 .item-list").empty();
					$.each(data,function( i, item ){
						$(".size-tab.type-size.step-01 .item-list").append('<li><a data-code="'+item.searchCd+'">'+item.searchCdNm+'</a></li>');
					});
			    },
			    error: function (request, status, error) {
			    	ComUtil.alert(error);
				},
				complete:function() {
					$("#loadingWrap").hide();
				}
			});
		} else {//마지막 스텝, plyRating 존재.
			$.ajax({
			    url: this.step_api[ stepNum ],
			    type: "POST",
			    cache:false,
			    contentType : "application/json; charset=UTF-8",
			    data: JSON.stringify(param),
			    success: function(data) {
			    	$(".size-tab.type-size.step-01 .item-list").empty();
					$.each(data,function( i, item ){
						$(".size-tab.type-size.step-01 .item-list").append('<li><a data-code="'+item.searchCd+ "|" + item.plyRating + '">'+item.searchCdNm+'</a></li>');
					});
			    },
			    error: function (request, status, error) {
			    	ComUtil.alert(error);
				},
				complete:function() {
					$("#loadingWrap").hide();
				}
			});
		}

		/*$.get( this.step_api[ stepNum ] ,{key:key},function( resp ){
			$(".size-tab.type-size.step-01 .item-list").empty();
			$.each(resp,function( i, data ){
				$(".size-tab.type-size.step-01 .item-list").append('<li><a data-code="'+data.searchCd+'">'+data.searchCdNm+'</a></li>');
			});
		},'json');*/
	},
	addRear:function(){
		this.setMode = 'R';
		this.nowStep = 0;
		// this.front_items = JSON.parse( JSON.stringify( this.choice_items ) );
		// this.choice_items = [];
		this.renderStep( this.nowStep );
		$(".size-tab.type-size.step-01").show();
		$(".size-tab.type-size.step-02").hide();
		this.getData( 0 );
	},
	choiceItem:function( code , name ){

		var items = [];
		if( this.setMode == 'F' )
			items = this.front_items;
		else if( this.setMode == 'R' )
			items = this.rear_items;

		items[ this.nowStep ] = {searchCd:code,searchCdNm:name};
		// if( this.nowStep != this.step_label.length -1 ){

		// }
		if( this.nowStep == this.step_label.length-1 ){

		    var fChoice;
		    var fChoiceArr;
		    var fChoiceArrR;
			var rChoice;
		    var rChoiceArr;
		    var rChoiceArrR;
			var fDispText;
			var rDispText;

			if( this.setMode == 'F' ){
			    fChoice = this.getSizeStr('F');
			    fChoiceArr = fChoice.split('/');
			    fChoiceArrR = fChoiceArr[1].split('R');

				if (fChoiceArrR[0] == '-') {
			    	fDispText = fChoiceArr[0] + 'R'+ fChoiceArrR[1];
			    } else {
			    	fDispText = this.getSizeStr('F')
			    }
				$(".size-tab.type-size.step-01 ").hide();
				$(".size-tab.type-size.step-02 ").show();
				//$(".size-tab.type-size.step-02 .result-size").text( this.getSizeStr('F') );
				$(".size-tab.type-size.step-02 .result-size").text( fDispText );
			}else{
			    fChoice = this.getSizeStr('F');
			    fChoiceArr = fChoice.split('/');
			    fChoiceArrR = fChoiceArr[1].split('R');

				if (fChoiceArrR[0] == '-') {
			    	fDispText = fChoiceArr[0] + 'R'+ fChoiceArrR[1];
			    } else {
			    	fDispText = this.getSizeStr('F')
			    }

				rChoice = this.getSizeStr('R');
			    rChoiceArr = rChoice.split('/');
			    rChoiceArrR = rChoiceArr[1].split('R');

				if (rChoiceArrR[0] == '-') {
			    	rDispText = rChoiceArr[0] + 'R'+ rChoiceArrR[1];
			    } else {
			    	rDispText = this.getSizeStr('R')
			    }
				$(".size-tab.type-size.step-01 ").hide();
				$(".size-tab.type-size.step-03 ").show();
				$(".size-tab.type-size.step-03 .result-size").empty();
				//$(".size-tab.type-size.step-03 .result-size").append('<div class="size-item front">'+  this.getSizeStr('F') +'</div>' );
				//$(".size-tab.type-size.step-03 .result-size").append('<div class="size-item rear">'+  this.getSizeStr('R') +'</div>' );
				$(".size-tab.type-size.step-03 .result-size").append('<div class="size-item front">'+  fDispText +'</div>' );
				$(".size-tab.type-size.step-03 .result-size").append('<div class="size-item rear">'+  rDispText +'</div>' );
			}
		} else {
			$("#loadingWrap").show();
			this.nowStep += 1;
			this.renderStep( this.nowStep );
			this.getData( this.nowStep );
		}
	},
	reset:function(){
		this.nowStep = 0;
		// this.choice_items = [];
		this.init();
	},
	backstep:function  ( step ){
		step = parseInt( step );
		this.nowStep = step;
		// this.choice_items = [];
		// this.init();

		// $("#loadingWrap").show();
		// 라벨용으로 빈값 채우기
		var items = [];
		if( this.setMode == 'F' )
			items = this.front_items;
		else if( this.setMode == 'R' )
			items = this.rear_items;

		for( var i in this.step_label )
			if( i >= step )
				items[i] = {searchCd:'',searchCdNm:''};

		//현재 스텝
		this.nowStep = step;
		//스텝에 따른 화면
		this.renderStep( step );
		//스텝에 따른 데이터 조회
		this.getData( step );

		// $(".size-tab").hide();
		// $(".size-tab.type-car.step-01").show();

	}
};

//차량번호로 찾기
var num_search = {
	step_label:['브랜드','차종','모델','연료'],
	choice_items:[],
	init:function(){
		// 라벨용으로 빈값 채우기
		for( i in this.step_label ){
			this.choice_items[i] = {searchCd:'',searchCdNm:''};
		}
	},
	choiceItem:function( data ){
		this.choice_items[0] = {searchCd:data.repCarClassNbr,searchCdNm:data.brandNbr};
		this.choice_items[1] = {searchCd:data.carClassNm,searchCdNm:data.carClassNm};
		this.choice_items[2] = {searchCd:data.fuel,searchCdNm:data.brdDivCd};
		this.choice_items[3] = {searchCd:data.yearType,searchCdNm:data.yearType};
	}
};