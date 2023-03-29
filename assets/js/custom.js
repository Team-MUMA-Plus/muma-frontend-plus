// footer
var footer = document.querySelector('footer');

fetch('/footer.html')
.then((res) => res.text())
.then((data) => (footer.innerHTML = data));

/* ******************** FETCH ******************** */

/* GET - 인증 필요*/
async function getWithAuth(detail_url) {
    let url = `${BASE_URL}` + '/api/v1' + detail_url;
    try {
        let res = await fetch(url, {
            credentials: 'include'
        });
        if(res.status == 401){
            alert("로그인을 해주세요.")
            window.location.href="/login";
        }
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

async function getWithAuthPage(detail_url, page) {
    let url = `${BASE_URL}` + '/api/v1' + detail_url + `?page=${page}`;
    try {
        let res = await fetch(url, {
            credentials: 'include'
        });
        if(res.status == 401){
            alert("로그인을 해주세요.")
            window.location.href="/login";
        }
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}


/* GET - 인증 불필요 */
async function get(detail_url) {
    let url = `${BASE_URL}` + '/api/v1' + detail_url;
    try {
        let res = await fetch(url);
        if(res.status != 200){
            alert("서버와의 통신에 실패했습니다.")
            window.location.href="/#"
        }
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

/* POST - 인증 필요 */
async function postWithAuth(detail_url, jsonData, alertMessage) {
    let url = `${BASE_URL}` + '/api/v1' + detail_url;
    try {
        let res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: jsonData
        });
        if(res.status!=200){
            alert(alertMessage)
        }
        return await res.status;
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

/* PUT 인증 필요 */
async function put(detail_url, jsonData) {
    let url = `${BASE_URL}` + '/api/v1' + detail_url;
    try {
        let res = await fetch(url, {
            method: 'put',
            headers: {
                "Content-Type": 'application/json',
            },
            credentials: 'include',
            body: jsonData
        });
        if(res.status != 200){
            alert("문제가 발생했습니다")
        }
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

/* DELETE 인증 필요 */
async function deleteWithAuth(detail_url) {
    let url = `${BASE_URL}` + '/api/v1' + detail_url;
    try {
        let res = await fetch(url, {
            method: 'delete',
            credentials: 'include'
        });
        if(res.status != 200){
            alert("문제가 발생했습니다")
        }
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}
/* ******************** MY-INFO ******************** */

/* 회원 정보 페이지 렌더링 */
async function renderMyInfo() {
    let myinfo = await getWithAuth("/my");
    myinfo = myinfo.result;
    let html = 
        `<div class="row">
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>이름</p>
            </div>
            <div class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details">${myinfo.name}</p>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>닉네임</p>
            </div>
            <div id="my-username" class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details" id="my-username-detail">${myinfo.userName}</p>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>이메일</p>
            </div>
            <div class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details">${myinfo.email}</p>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>전화번호</p>
            </div>
            <div id="my-phone-number" class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details" id="my-phone-number-detail">${myinfo.phoneNumber}</p>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>생년월일</p>
            </div>
            <div class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details">${myinfo.birth}</p>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-4 my-title">
                <p>주소</p>
            </div>
            <div id="my-address" class="col-md-9 col-sm-8 col-xs-8">
                <p class="my-details" id="my-address-detail">${myinfo.address}</p>
            </div>
            <div id="my-button" class="col-md-12 col-12 m-auto text-end">
                <button type="button" onclick="renderMyInfoModify()"
                    class="btn btn-secondary rounded-pill px-md-2 px-2 py-2 me-2 radius-0 text-light">수정하기</button>
            </div>
        </div>`;


    let container = document.querySelector('.my-info');
    container.innerHTML = html;
}

function parseAddress(address){
    return address.replace("[","").split("] ");
}

/* 수정하기 버튼 눌렀을 때 */
async function renderMyInfoModify() {
    /* 해당 칸에 있는 정보 불러오기 */
    let myUserNameValue = document.getElementById("my-username-detail").innerText;
    let myPhoneNumberValue = document.getElementById("my-phone-number-detail").innerText;
    let myAddressValue = document.getElementById("my-address-detail").innerText;

    let addressDetail = parseAddress(myAddressValue);
    
    if(addressDetail.length < 2){
        var postcode = "";
        var address = addressDetail[0];
    }else{
        postcode = addressDetail[0];
        address = addressDetail[1];
    }
    
    /* 해당 블록에 다음의 html로 바꿔서 뿌리기 */
    let myUserName = document.querySelector('#my-username')
    myUserName.innerHTML = `<p class="form_list_input ps-3"><input type="text" id="my-username-detail" style="width: 130px" value="${myUserNameValue}"></p>`;

    let myPhoneNum = document.querySelector('#my-phone-number')
    myPhoneNum.innerHTML = `<p class="form_list_input ps-3"><input type="text" id="my-phone-number-detail" pattern="\d*" required style="width: 130px" value="${myPhoneNumberValue}"></p>`;

    let myAddress = document.querySelector("#my-address")
    myAddress.innerHTML = `<p class="form_list_input ps-3">
    <input type="text" id="my-postcode-detail" class="mb-3 me-2" style="width: 150px" value="${postcode}">
    <input type="button" onclick="sample6_execDaumPostcode()" class="mb-3" value="우편번호 찾기"><br>
    <input type="text" id="my-address-detail" style="width: 95%" value="${address}">
    </p>`;

    let submitButton = document.querySelector('#my-button')
    submitButton.innerHTML = 
        `<button type="button" onclick="renderMyInfo()" class="btn btn-secondary rounded-pill px-md-2 px-2 py-2 me-2 radius-0 text-light ">취소</button>
        <button type="button" onclick="modifyMyInfo()" class="btn btn-secondary rounded-pill px-md-2 px-2 py-2 me-2 radius-0 text-light ">수정 완료</button>`;
}

/* 수정 제출 했을 때 먼저 이름 중복 체크 */
async function checkUserName(){
    let myUserNameValue = document.getElementById("my-username-detail").value;

    let jsonData = JSON.stringify({
        userName: myUserNameValue
        })
    let status = await postWithAuth("/users/check", jsonData, "아이디가 중복됩니다!")

    if(status==200){
        modifyMyInfo();
    }
}

/* 이름 중복 체크 후 수정(PUT) */
async function modifyMyInfo(){
    /* 해당 칸에 있는 정보 불러오기 */
    let myUserNameValue = document.getElementById("my-username-detail").value;
    let myPhoneNumberValue = document.getElementById("my-phone-number-detail").value;
    let myPostCodeValue = document.getElementById("my-postcode-detail").value;
    let myAddressValue = document.getElementById("my-address-detail").value;

    let finalMyAddressValue = '['+ myPostCodeValue + '] ' + myAddressValue;

    let jsonData = JSON.stringify({
        phoneNumber: myPhoneNumberValue,
        address: finalMyAddressValue,
        userName: myUserNameValue
    })

    /* 수정 요청 보내기*/
    await put("/users/modify",jsonData);
    
    /*다시 렌더링*/
    renderMyInfo();
}

/* 주소 API */
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                addr += extraAddr
            } 

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('my-postcode-detail').value = data.zonecode;
            document.getElementById("my-address-detail").value = addr;
        }
    }).open();
}

/* ******************** MY-CALENDAR ******************** */

/* 캘린더 Date Format */
function calendarDateFormatter(date){
    return date.split('.', 3).join('-');
}

/* 마이 캘린더 정보 조회*/
async function parseMyCalendar() {
    let eventsResponse = await getWithAuth("/my/calendars");
    let events = eventsResponse.result;
    var eventArr = [];
    events.forEach(element => {
        eventArr.push({
            title: `${element.name}`,
            start: calendarDateFormatter(`${element.startAt}`),
            end: calendarDateFormatter(`${element.endAt}`),
            url: '/exhibition-single?id='+ `${element.id}`,
            backgroundColor: '#dbddebb0',
            borderColor:'#dbddebb0',
            textColor:'black'
        });
    });

    return eventArr
}

/* ******************** MY-REVIEWS ******************** */

/* Date 파싱 */
function getDate(dateTime){
    return dateTime.split('T')[0];
}

/* 마이 리뷰 페이지 렌더링*/
async function renderMyReviews(page) {
    let reviews = await getWithAuthPage("/my/reviews", page);
    let review = reviews.result.content;
    
    let html = '';


    review.forEach(element => {

        let createdAt = getDate(element.createdAt);
        let visitedDate = "";
        if(element.visitedDate){
            visitedDate = getDate(element.visitedDate);
        }
        let htmlSegment = 
        `
        <div class="update-post" id="review-${element.id}">
            <div class="row">
                <div class="col-lg-10 col-md-12 col-sm-12 col-xs-10 ps-4">
                    <div id="star-${element.id}">`
        let rate = element.star;
        for(let i=0; i < rate; i++){
            htmlSegment+=`<i class='bx bx-star star-rate'></i>`
        }
        for(let j=0; j < 5-rate; j++){
            htmlSegment+=`<i class='bx bx-star'></i>`
        }
        htmlSegment += `
                        <span class="ps-1 star-int" id="rate-number-${element.id}">${element.star}</span>
                    </div>
                    <span class="update-date">${element.exhibitionName}, <span
                            id="review-visited-at-${element.id}">${visitedDate}</span> 방문</span>
                    <h5 class="update-title" id="review-title-${element.id}">${element.title}</h5>
                    <p id="review-content-${element.id}">${element.content}</p>
                </div>
                <div class="col-lg-2 col-md-12 col-sm-12 col-xs-2 pt-2">
                    <p class="update-date text-end">작성일: ${createdAt}</p>
                    <div class="text-end simple-btn" id="review-btns-${element.id}">
                        <button type="button" onclick="renderReviewModify(${element.id})" class="text-decoration-none text-primary ">
                            수정
                        </button>
                        <button type="button" onclick="deleteAReview(${element.id})" class="text-decoration-none text-primary ">
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;

        html += htmlSegment;
    });

    let container = document.querySelector('.my-reviews');
    container.innerHTML = html;

    let previous = "";
    if(reviews.result.pageable.pageNumber == 0){
        previous = "disabled";
    }
    
    let next = "";
    if(reviews.result.last == true){
        next = "disabled"
    }

    let pageContainer = document.querySelector('.my-reviews-pagination')
    let pageHtml = 
    `
    <ul class="pagination">
        <li class="page-item ${previous}">
        <a class="page-link" href="#" onclick="renderMyReviews(${reviews.result.pageable.pageNumber - 1})">Previous</a>
        </li>
        <li class="page-item ${next}">
        <a class="page-link" href="#" onclick="renderMyReviews(${reviews.result.pageable.pageNumber + 1})">Next</a>
        </li>
    </ul>
    `;
    pageContainer.innerHTML = pageHtml;
}

/* 리뷰 수정 - 별점 값 가져오는 함수*/
function getRate(event,id){
    document.getElementById(`rate-number-${id}`).innerText = event.target.value;
}

/* 리뷰 수정 페이지 렌더링 */
async function renderReviewModify(id){
    /* 해당 칸에 있는 정보 불러오기 */
    var rateNumber = document.getElementById(`rate-number-${id}`).innerText;
    var reviewVisitedAtValue = document.getElementById(`review-visited-at-${id}`).innerText;
    var reviewTitleValue = document.getElementById(`review-title-${id}`).innerText;
    var reviewContentValue = document.getElementById(`review-content-${id}`).innerText;
    
     /* 해당 블록에 다음의 html로 바꿔서 뿌리기 */
     let star = document.querySelector(`#star-${id}`)
     star.innerHTML = `
     <div class="review-form mb-2" style="width:135px">
        <div id="star-icon-${id}">
            <input type="radio" name="rating-${id}" value="5" id="rate5-${id}" onclick="getRate(event,${id})"><label for="rate5-${id}"><i class='bx bx-star'></i></label>
            <input type="radio" name="rating-${id}" value="4" id="rate4-${id}" onclick="getRate(event,${id})"><label for="rate4-${id}"><i class='bx bx-star'></i></label>
            <input type="radio" name="rating-${id}" value="3" id="rate3-${id}" onclick="getRate(event,${id})"><label for="rate3-${id}"><i class='bx bx-star'></i></label>
            <input type="radio" name="rating-${id}" value="2" id="rate2-${id}" onclick="getRate(event,${id})"><label for="rate2-${id}"><i class='bx bx-star'></i></label>
            <input type="radio" name="rating-${id}" value="1" id="rate1-${id}" onclick="getRate(event,${id})"><label for="rate1-${id}"><i class='bx bx-star'></i></label>
        </div>
        <span class="ps-1 star-int" id="rate-number-${id}"></span>
    </div>`;
    
    document.getElementById(`rate${rateNumber}-${id}`).click();

    let reviewVisitedAt = document.querySelector(`#review-visited-at-${id}`)
    reviewVisitedAt.innerHTML = `
        <input class="review-form mx-1"
            type="date"
            style="width: 100px; font-size: 12px; height:20px" id="review-visited-at-value-${id}" value="${reviewVisitedAtValue}">`;
    
    let reviewTitle = document.querySelector(`#review-title-${id}`)
    reviewTitle.innerHTML = `<input
    class="review-form mt-1" type="text" id="review-title-value-${id}" 
    style="width: 100%; height:30px" value="${reviewTitleValue}">`;

    let reviewContent = document.querySelector(`#review-content-${id}`)
    reviewContent.innerHTML = `<textarea class="review-form mt-1" type="text" id="review-content-value-${id}" 
    style="width: 100%; height:150px">${reviewContentValue}</textarea>`;

    let modifyButtons = document.querySelector(`#review-btns-${id}`);
    modifyButtons.innerHTML = `
    <button type="button" onclick="renderAReview(${id})" class="text-decoration-none text-primary">뒤로</button>
    <button type="button" onclick="modifyAReview(${id})" class="text-decoration-none text-primary">저장</button>`;
}

/* 리뷰 수정 내용 PUT */
async function modifyAReview(id){
    var modifiedRateNumber = document.getElementById(`rate-number-${id}`).innerText;
    var modifiedVisitedDate = document.getElementById(`review-visited-at-value-${id}`).value;
    var modifiedReviewTitle = document.getElementById(`review-title-value-${id}`).value;
    var modifiedReviewContent = document.getElementById(`review-content-value-${id}`).value;


    let jsonData = JSON.stringify({
        newTitle: modifiedReviewTitle,
        newContent: modifiedReviewContent,
        newStar: modifiedRateNumber,
        newVisitedDate: modifiedVisitedDate
    })

    /* 수정 요청 보내기*/
    await put(`/reviews/${id}`,jsonData);
    
    /*다시 렌더링*/
    renderAReview(id);
}

/* 리뷰 하나 렌더링 */
async function renderAReview(id){
    let review = await get(`/reviews/${id}/details`)
    review = review.result;
    
        let createdAt = getDate(review.createdAt);
        let visitedDate = "";
        if(review.visitedDate){
            visitedDate = getDate(review.visitedDate);
        }
        let htmlSegment = 
        `
            <div class="row">
                <div class="col-lg-10 col-md-12 col-sm-12 col-xs-10 ps-4">
                    <div id="star-${review.id}">`
        let rate = review.star;
        for(let i=0; i < rate; i++){
            htmlSegment+=`<i class='bx bx-star star-rate'></i>`
        }
        for(let j=0; j < 5-rate; j++){
            htmlSegment+=`<i class='bx bx-star'></i>`
        }
        htmlSegment += `
                        <span class="ps-1 star-int" id="rate-number-${review.id}">${review.star}</span>
                    </div>
                    <span class="update-date">${review.exhibitionName}, <span
                            id="review-visited-at-${review.id}">${visitedDate}</span> 방문</span>
                    <h5 class="update-title" id="review-title-${review.id}">${review.title}</h5>
                    <p id="review-content-${review.id}">${review.content}</p>
                </div>
                <div class="col-lg-2 col-md-12 col-sm-12 col-xs-2 pt-2">
                    <p class="update-date text-end">작성일: ${createdAt}</p>
                    <div class="text-end simple-btn" id="review-btns-${review.id}">
                        <button type="button" onclick="renderReviewModify(${review.id})" class="text-decoration-none text-primary ">
                            수정
                        </button>
                        <button type="button" onclick="deleteAReview(${id})" class="text-decoration-none text-primary ">
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        `;

    let container = document.querySelector(`#review-${review.id}`);
    container.innerHTML = htmlSegment;
}

async function deleteAReview(id){
    if(confirm("리뷰를 삭제하시겠습니까?")){
        await deleteWithAuth(`/reviews/${id}`);
    }
    renderMyReviews(0);
}

/* ******************** MY-GATHERINGS ******************** */

function parseDateTime(dateTime){
    let parsed = dateTime.split("T");
    if(parsed.length == 2){
        return parsed[0] + ', ' + parsed[1];
    }
    else{
        return parsed[0];
    }
}

function combineDateTime(dateTime){
    let parsed = dateTime.split(', ');
    if(parsed.length == 2){
        return parsed[0] + 'T' + parsed[1];
    }else{
        return parsed[0];
    }
}

/* 마이 모집글 */
async function renderMyGatherings(page) {
    let gatherings = await getWithAuthPage("/my/gatherings",page);
    let gathering = gatherings.result.content;
    let html = '';
    gathering.forEach(element => {
        let createdAt = getDate(element.createdAt);
        let dateTime = parseDateTime(element.meetDateTime)
        
        let htmlSegment = 
        `
        <div class="update-post" id="gathering-${element.id}">
            <div class="row">
                <div class="col-lg-10 col-md-8 col-sm-12 col-xs-12 px-4">
                    <span class="update-date">${element.exhibitionName}</span>
                    <h5 class="update-title"><i class="bx bx-group"></i><span id="gathering-title-${element.id}">${element.title}</span></h5>
                    <p id="gathering-content-${element.id}">${element.content}</p>
                    <p><span style="color:#4346a2">모집 현황:</span> <span id="gathering-current-${element.id}">${element.currentPeople}</span>/<span id="gathering-max-${element.id}">${element.maxPeople}</span><button type="button" onclick="newTabClick(${element.id})" class="btn btn-secondary px-1 py-1 ms-3 radius-0 text-light" style="font-size: 13px">신청자 보기</button></p>
                    <p><span style="color:#4346a2">만나는 날짜/시간:</span> <span id="gathering-time-${element.id}">${dateTime}</span></p>
                    <p><span style="color:#4346a2">만나는 장소:</span> <span id="gathering-location-${element.id}">${element.meetLocation}</span></p>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-12 col-xs-12 pt-2">
                    <p class="update-date text-end">작성일: ${createdAt}</p>
                    <div class="text-end simple-btn" id="gathering-btns-${element.id}">
                        <button type="button" onclick="renderGatheringModify(${element.id})" class="text-decoration-none text-primary ">
                            수정
                        </button>
                        <button type="button" onclick="deleteAGathering(${element.id})" class="text-decoration-none text-primary ">
                            삭제
                        </button><br><br>
                        <button type="button" onclick="location.href='/gathering-single?id=${element.id}'" class="text-decoration-none text-primary">
                            더보기
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;

        html += htmlSegment;
    });

    let container = document.querySelector('.my-gatherings');
    container.innerHTML = html;

    let previous = "";
    if(gatherings.result.pageable.pageNumber == 0){
        previous = "disabled";
    }
    
    let next = "";
    if(gatherings.result.last == true){
        next = "disabled"
    }

    let pageContainer = document.querySelector('.my-gatherings-pagination')
    let pageHtml = 
    `
    <ul class="pagination">
        <li class="page-item ${previous}">
        <a class="page-link" href="#" onclick="renderMyGatherings(${gatherings.result.pageable.pageNumber - 1})">Previous</a>
        </li>
        <li class="page-item ${next}">
        <a class="page-link" href="#" onclick="renderMyGatherings(${gatherings.result.pageable.pageNumber + 1})">Next</a>
        </li>
    </ul>
    `;
    pageContainer.innerHTML = pageHtml;
}

/* 리뷰 수정 페이지 렌더링 */
async function renderGatheringModify(id){
    /* 해당 칸에 있는 정보 불러오기 */
    var gatheringTitle = document.getElementById(`gathering-title-${id}`).innerText;
    var gatheringContent = document.getElementById(`gathering-content-${id}`).innerText;
    var gatheringCurrent = document.getElementById(`gathering-current-${id}`).innerText;
    var gatheringMax = document.getElementById(`gathering-max-${id}`).innerText;
    var gatheringTime = document.getElementById(`gathering-time-${id}`).innerText;
    var gatheringLocation = document.getElementById(`gathering-location-${id}`).innerText;

    gatheringTime = combineDateTime(gatheringTime);

     /* 해당 블록에 다음의 html로 바꿔서 뿌리기 */
     let title = document.querySelector(`#gathering-title-${id}`)
     title.innerHTML = `
     <input class="review-form mt-1" type="text" id="gathering-title-value-${id}" 
     style="width: 94%; height:30px" value="${gatheringTitle}">
     `;

    let content = document.querySelector(`#gathering-content-${id}`)
    content.innerHTML = `
    <input class="review-form mt-1" type="text" id="gathering-content-value-${id}" 
    style="width: 100%; height:30px" value="${gatheringContent}">`;
    
    let max = document.querySelector(`#gathering-max-${id}`)
    let min = gatheringCurrent > 2 ? gatheringContent : 2 ;
    max.innerHTML = `
    <input class="review-form mt-1 ms-1" type="number" min="${min}" max="10" id="gathering-max-value-${id}" 
    style="width:60px; height:30px" value="${gatheringMax}">
    `;

    let time = document.querySelector(`#gathering-time-${id}`)
    time.innerHTML = `
    <input class="review-form mx-1" type="datetime-local"
    style="width: 35%; font-size: 14px; height:30px" id="gathering-time-value-${id}" value="${gatheringTime}">
    `;

    let location = document.querySelector(`#gathering-location-${id}`);
    location.innerHTML = `
    <input class="review-form mt-1 ms-1" type="text" id="gathering-location-value-${id}" 
    style="width: 40%; height:30px" value="${gatheringLocation}">`;

    let btns = document.querySelector(`#gathering-btns-${id}`);
    btns.innerHTML = 
    `
    <button type="button" onclick="renderAGathering(${id})" class="text-decoration-none text-primary ">
        뒤로
    </button>
    <button type="button" onclick="modifyAGathering(${id})" class="text-decoration-none text-primary ">
        저장
    </button>
    `;
}

/* 리뷰 수정 내용 PUT */
async function modifyAGathering(id){
    var modifiedTitle = document.getElementById(`gathering-title-value-${id}`).value;
    var modifiedContent = document.getElementById(`gathering-content-value-${id}`).value;
    var modifiedMax = document.getElementById(`gathering-max-value-${id}`).value;
    var modifiedTime = document.getElementById(`gathering-time-value-${id}`).value;
    var modifiedLocation = document.getElementById(`gathering-location-value-${id}`).value;


    let jsonData = JSON.stringify({
        exhibitionId: id,
        meetDateTime: modifiedTime,
        meetLocation: modifiedLocation,
        maxPeople: modifiedMax,
        title: modifiedTitle,
        content: modifiedContent
    })

    /* 수정 요청 보내기*/
    await put(`/gatherings/${id}`,jsonData);
    
    /*다시 렌더링*/
    renderAGathering(id);
}


async function renderAGathering(id) {
    let gatherings = await get(`/gatherings/${id}`)
    gatherings = gatherings.result;

    let createdAt = getDate(gatherings.createdAt);
    let dateTime = parseDateTime(gatherings.meetDateTime)
    
    let htmlSegment = 
    `
        <div class="row">
            <div class="col-lg-10 col-md-8 col-sm-12 col-xs-12 px-4">
                <span class="update-date">${gatherings.exhibitionName}</span>
                <h5 class="update-title"><i class="bx bx-group"></i><span id="gathering-title-${gatherings.id}">${gatherings.title}</span></h5>
                <p id="gathering-content-${gatherings.id}">${gatherings.content}</p>
                <p><span style="color:#4346a2">모집 현황:</span> <span id="gathering-current-${gatherings.id}">${gatherings.currentPeople}</span>/<span id="gathering-max-${gatherings.id}">${gatherings.maxPeople}</span><button type="button" onclick="newTabClick(${gatherings.id})" class="btn btn-secondary px-1 py-1 ms-3 radius-0 text-light" style="font-size: 13px">신청자 보기</button></p>
                <p><span style="color:#4346a2">만나는 날짜:</span> <span id="gathering-time-${gatherings.id}">${dateTime}</span></p>
                <p><span style="color:#4346a2">만나는 장소:</span> <span id="gathering-location-${gatherings.id}">${gatherings.meetLocation}</span></p>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-12 col-xs-12 pt-2">
                <p class="update-date text-end">작성일: ${createdAt}</p>
                <div class="text-end simple-btn" id="gathering-btns-${gatherings.id}">
                    <button type="button" onclick="renderGatheringModify(${gatherings.id})" class="text-decoration-none text-primary ">
                        수정
                    </button>
                    <button type="button" onclick="deleteAGathering(${gatherings.id})" class="text-decoration-none text-primary ">
                        삭제
                    </button><br><br>
                    <button type="button" onclick="location.href='/gathering-single?id=${gatherings.id}'" class="text-decoration-none text-primary">
                        더보기
                    </button>
                </div>
            </div>
        </div>
    `;


    let container = document.querySelector(`#gathering-${gatherings.id}`);
    container.innerHTML = htmlSegment;
}

async function deleteAGathering(id){
    if(confirm("모집글을 삭제하시겠습니까?")){
        await deleteWithAuth(`/gatherings/${id}`);
    }
    renderMyGatherings(0);
}


/* 마이 참여 신청한 모집글 */
async function renderMyParticipations(page) {
    let participations = await getWithAuthPage("/my/gatherings/enrolls",page);
    let participation = participations.result.content;
    let html = '';
    participation.forEach(element => {
        let createdAt = getDate(element.createdAt);
        let htmlSegment = 
        `
        <div class="update-post">
            <div class="row">
                <div class="col-lg-10 col-md-8 col-sm-12 col-xs-12 px-4">
                    <span class="update-date">${element.exhibitionName}</span>
                    <h5 class="update-title"><i class="bx bx-group"></i> ${element.title}</h5>
                    <p>${element.content}</p>
                    <p><span style="color:#4346a2">주최자:</span> ${element.userName}</p>
                    <p><span style="color:#4346a2">모집 현황:</span> ${element.currentPeople}/${element.maxPeople}</p>
                    <p><span style="color:#4346a2">만나는 날짜:</span> ${element.meetDateTime}</p>
                    <p><span style="color:#4346a2">만나는 장소:</span> ${element.meetLocation}</p>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-12 col-xs-12 pt-2">
                    <div class="text-end simple-btn">
                        <button type="button" onclick="location.href='/gathering-single?id=${element.id}'" class="text-decoration-none text-primary">
                            더보기
                        </button>
                    </div>
                </div>
                <div id="my-button" class="col-md-12 col-12 m-auto text-end">
                    <button type="button" onclick="cancelEnroll(${element.id})"
                        class="btn btn-secondary rounded-pill px-md-2 px-2 py-2 radius-0 text-light">신청 취소하기</button>
                </div>
            </div>
        </div>
        `;

        html += htmlSegment;
    });

    let container = document.querySelector('.my-participations');
    container.innerHTML = html;

    let previous = "";
    if(participations.result.pageable.pageNumber == 0){
        previous = "disabled";
    }
    
    let next = "";
    if(participations.result.last == true){
        next = "disabled"
    }

    let pageContainer = document.querySelector('.my-participations-pagination')
    let pageHtml = 
    `
    <ul class="pagination">
        <li class="page-item ${previous}">
        <a class="page-link" href="#" onclick="renderMyParticipations(${participations.result.pageable.pageNumber - 1})">Previous</a>
        </li>
        <li class="page-item ${next}">
        <a class="page-link" href="#" onclick="renderMyParticipations(${participations.result.pageable.pageNumber + 1})">Next</a>
        </li>
    </ul>
    `;
    pageContainer.innerHTML = pageHtml;
}

async function cancelEnroll(id){
    if(confirm("신청을 취소하시겠습니까?")){
        await deleteWithAuth(`/gatherings/${id}/cancel`);
    }
    renderMyParticipations(0);
}

/* 마이 참여 승낙된 모집글 */
async function renderMyApprovedParticipations(page) {
    let approvedParticipations = await getWithAuthPage("/my/gatherings/approves",page);
    let approvedParticipation = approvedParticipations.result.content;
    let html = '';
    approvedParticipation.forEach(element => {
        let createdAt = getDate(element.createdAt);
        let htmlSegment = 
        `
        <div class="update-post">
            <div class="row">
                <div class="col-lg-10 col-md-8 col-sm-12 col-xs-12 px-4">
                    <span class="update-date">${element.exhibitionName}</span>
                    <h5 class="update-title"><i class="bx bx-group"></i> ${element.title}</h5>
                    <p>${element.content}</p>
                    <p><span style="color:#4346a2">주최자:</span> ${element.userName}</p>
                    <p><span style="color:#4346a2">모집 현황:</span> ${element.currentPeople}/${element.maxPeople}</p>
                    <p><span style="color:#4346a2">만나는 날짜:</span> ${element.meetDateTime}</p>
                    <p><span style="color:#4346a2">만나는 장소:</span> ${element.meetLocation}</p>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-12 col-xs-12 pt-2">
                    <div class="text-end simple-btn">
                        <button type="button" onclick="location.href='/gathering-single?id=${element.id}'" class="text-decoration-none text-primary">
                            더보기
                        </button>
                    </div>
                </div>
                <div id="my-button" class="col-md-12 col-12 m-auto text-end">
                    <button type="button" onclick="cancelEnroll(${element.id})"
                        class="btn btn-secondary rounded-pill px-md-2 px-2 py-2 radius-0 text-light">신청 취소하기</button>
                </div>
            </div>
        </div>
        `;

        html += htmlSegment;
    });

    let container = document.querySelector('.my-participations');
    container.innerHTML = html;

    let previous = "";
    if(approvedParticipations.result.pageable.pageNumber == 0){
        previous = "disabled";
    }
    
    let next = "";
    if(approvedParticipations.result.last == true){
        next = "disabled"
    }

    let pageContainer = document.querySelector('.my-participations-pagination')
    let pageHtml = 
    `
    <ul class="pagination">
        <li class="page-item ${previous}">
        <a class="page-link" href="#" onclick="renderMyParticipations(${approvedParticipations.result.pageable.pageNumber - 1})">Previous</a>
        </li>
        <li class="page-item ${next}">
        <a class="page-link" href="#" onclick="renderMyParticipations(${approvedParticipations.result.pageable.pageNumber + 1})">Next</a>
        </li>
    </ul>
    `;
    pageContainer.innerHTML = pageHtml;
}

// exhibitions.html ---------------------------------------------------------------------------------------------------------

async function getExhibitionsById() {
  let url = `${BASE_URL}/api/v1/exhibitions?size=10&sort=id`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
    alert('Request Error!');
    location.href="#";
  }
}

async function renderExhibitionsById() {
  let exhibitions = await getExhibitionsById();
  let exhibition = exhibitions.result.content;
  let html = '';
  exhibition.forEach((element) => {
    let htmlSegment = `
        <div class="swiper-slide">
            <a href="/exhibition-single?id=${element.id}">
                <div class="testimonial-item">
                    <img src=${element.mainImgUrl} class="testimonial-img" alt="">
                    <h3>${element.name}</h3>
                    <h4>${element.galleryLocation}</h4>
                </div>
            </a>
        </div>`;

    html += htmlSegment;
  });

  let container = document.querySelector('#swiper-wrapper1');
  container.innerHTML = html;
}

async function getExhibitionsByEndAt() {
  let url = `${BASE_URL}/api/v1/exhibitions?size=10&sort=endAt`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
    alert('Request Error!');
    location.href="#";
  }
}

async function renderExhibitionsByEndAt() {
  let exhibitions = await getExhibitionsByEndAt();
  let exhibition = exhibitions.result.content;
  let html = '';
  exhibition.forEach((element) => {
    let redirectUrl = `/exhibition-single?id=${element.id}`;
    if(element.price=="무료"){
        redirectUrl = element.detailInfoUrl;
    } 
    let htmlSegment = `<div class="swiper-slide">
            <a href=${redirectUrl}>
                <div class="testimonial-item">
                    <img src=${element.mainImgUrl} class="testimonial-img" alt="">
                    <h3>${element.name}</h3>
                  <h4>${element.galleryLocation}</h4>
              </div>
            </a>
        </div>`;

    html += htmlSegment;
  });

  let container = document.querySelector('#swiper-wrapper2');
  container.innerHTML = html;
}

async function getGatheringsById() {
  let url = `${BASE_URL}/api/v1/gatherings?size=10`;
  try {
    let res = await fetch(url,{
        credentials: 'include'
    });
    return await res.json();
  } catch (error) {
    console.log(error)
    alert('Request Error!');
    location.href="#";
  }
}

async function renderGatheringsById() {
  let exhibitions = await getGatheringsById();
  let exhibition = exhibitions.result.content;
  let html = '';
  exhibition.forEach((element) => {
    let htmlSegment = `<div class="swiper-slide">
            <div class="pricing-horizontal row col-10 m-auto d-flex shadow-sm rounded overflow-hidden my-5 bg-white">
                <div class="pricing-horizontal-icon col-md-3 text-center bg-secondary text-light py-4">
                    <img src = "${element.exhibitionMainUrl}" class = "exhibition_poster_image g-2 img-thumbnail"/>
                    <h5 class="h5 semi-bold-600 card-footer g-2 pb-4 light-300"> ${element.exhibitionName}</h5> 
                </div>

                <!-- 파티 정보 넣기 -->
                <div class="pricing-horizontal-body offset-lg-1 col-auto col-md-5 col-lg-4 d-flex align-items-center pl-5 pt-lg-0 pt-4">
                    <ul class="text-left px-4 list-unstyled mb-0 light-300">
                        <h5 class = "p"> 🗣 ${element.title} </h5>
                        <li><i class="bx bxs-circle me-2"></i> 이 때 만나요: ${element.meetDateTime} </li>
                        <li><i class="bx bxs-circle me-2"></i> 여기서 만나요: ${element.meetLocation} </li>
                        <li><i class="bx bxs-circle me-2"></i> 모임장: ${element.userName} </li>
                    </ul>
                    <div>
                        
                    </div>   
                </div>

                <!-- 파티 참석 인원 동그라미 넣기 -->
                <div class="pricing-horizontal-tag col-md-4 text-center pt-3 d-flex align-items-center">
                    <div class="w-100 light-300">
                        <!-- 현재 참석 인원 -->
                        <h6>  현재 참석자 수: ${element.currentPeople} / 최대인원: ${element.maxPeople}</h6>
                        <!-- 버튼 -->
                        <div class = "">
                            <a onclick="submitSinglePage(this, '${element.id}')" class="btn rounded-pill px-4 btn-outline-primary mb-3"> 더 알아보기 </a>
                        </div>
                    </div>
                </div>
            </div> 
        </div>`;

    html += htmlSegment;
  });

  let container = document.querySelector('#swiper-wrapper3');
  container.innerHTML = html;
}

// fetch header 토큰 부분 수정 필요 ---------------------------------------------------------------------------------------------------------
function postGathering(payload) {
  const data = {};
  payload.forEach((value, key) => (data[key] = value));
  console.log(data);

  fetch(`${BASE_URL}/api/v1/gatherings/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then((response) => console.log(response));
}

// 함께가요 전체조회 -> 함께가요 상세조회 이동 --------------------------------------------------------------------------------------------
function submitSinglePage(e, id) {
    console.log(e);
    
    var form = document.createElement("form");
    form.setAttribute("charset", "UTF-8");
    form.setAttribute("method", "GET");
    form.setAttribute("action", "/gathering-single");

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "id");
    hiddenField.setAttribute("value", id);
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
}

// 
async function getEnrolls(gatheringId) {
    let url = `${BASE_URL}/api/v1/gatherings/${gatheringId}/enroll/list`;
    try {
        let res = await fetch(url,{
            credentials:'include'
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        alert("Request Error!");
    }
}

// ---------------------------------------------------------------------------------------------------------

async function renderExhibisionForwork() {
    let exhibitions = await getExhibitionsById();
    let exhibition = exhibitions.result.content;
    let html = '';
  
    exhibition.forEach(element => {
      html += `
      <a href="work-single.html" class="col-sm-6 col-lg-4 text-decoration-none exhibition freeExhibition">
          <div class="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
              <img class="card-img-top" src=${element.mainImgUrl} alt="...">
              <div class="card-body">
                  <h5 class="card-title light-300 text-dark">${element.title}</h5>
                  <p class="card-text light-300 text-dark">
                      ${element.description}
                  </p>
                  <span class="text-decoration-none text-primary light-300">
                        Read more <i class='bx bxs-hand-right ms-1'></i>
                    </span>
              </div>
          </div>
      </a>
      `;
    });
  
    const div = document.getElementById('exhibision_container');
    div.innerHTML = html;
  }


  // 전시회 검색 기능
  function searchExhibition() {
    if (searchInput.value !== "") {
      newArr = exhitibionArray.filter((el) =>
        el.name.toLowerCase().includes(searchInput.value.toLowerCase())
      );
  
      searchResult.innerHTML = "";
  
      newArr.map((contents) => {
        let result = document.createElement("div");
        searchResult.appendChild(result);
        result.innerHTML = `<div><img src="${contents.mainImgUrl}"/></div><div>${contents.name}<div>${contents.description}</div></div>`;
      });
    } else {
      searchResult.innerHTML = "";
    }
  }

    //알람
    async function getAlarms() {
    let url = `${BASE_URL}/api/v1/my/alarms`;
    
    let jsonData = JSON.stringify({
        resultCode: "SUCCESS",
        result: {
            content: "로그인이 필요합니다."
         }
        })
    try {
        let res = await fetch(url,{
            credentials:'include'
        });
        let html = '';
        let htmlSegment = `<button value="Logout" onclick="renderLogout()" class="btn btn-primary">로그아웃</button>`;
        html += htmlSegment;

        let container = document.querySelector('.lolocontainer');
        container.innerHTML = html;

        return await res.json();
    } catch (error) {
        console.log(error);
                let html = '';
        let htmlSegment = `<button onclick="location.href='login.html'" class="btn btn-primary">로그인</button>`;
        html += htmlSegment;

        let container = document.querySelector('.lolocontainer');
        container.innerHTML = html;
        
    }
    }
    async function renderAlarms() {
    let alarms = await getAlarms();
    let alarm = alarms.result.content;

    if(alarms.resultCode=="ERROR"){
        alert(alarms.result.message);
    }
    let html = '';
    
    Array.from(alarm).forEach(element => {
        let htmlSegment = `
        <li><a class="dropdown-item" ><b>
        ${element.exhibitionName}<br>${element.alarmMessage}</b></a></li>`;
        html += htmlSegment;
    });

    let container = document.querySelector('.alarmscontainer');
    container.innerHTML = html;
    }
    //알람 끝

    // 헤더 로그인 로그아웃 표시
    function setCookie(name, value, exp) {
        var date = new Date();
        date.setTime(date.getTime() + exp*24*60*60*1000);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
        location.reload(true);
    };

    function getCookie(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    };

    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
        location.reload(true);
        window.location.href = '/index.html';
    }

// 헤더 로그인 로그아웃 표시 끝

// 로그아웃
    async function renderLogout() {
        console.log("로그아웃 함수 들어옴")

        deleteCookie("Authorization")
        deleteCookie("Authorization-refresh")
        alert("로그아웃 완료")
        window.location.href = '#';
    }

    // 신청자 승인
    async function approveUser(gatheringId,pId) {
        let url = `${BASE_URL}`+'/api/v1/gatherings/'+gatheringId+'/enroll/'+pId;
        console.log("url입니다: "+url);

        try {
            let res = await fetch(url, {
                credentials: 'include'
            });
            if(res.status == 401){
                alert("로그인을 해주세요.")
                window.location.href="/login";
            }
            return await res.json();
        } catch (error) {
            console.log(error);
            alert("Request Error!");
        }
    }

    async function renderApproveUser(gatheringId,pId) {
        let approve = await approveUser(gatheringId,pId);

        if(approve.resultCode=="ERROR"){
            console.log(approve.result.message);
            alert(approve.result.message);
        }
        alert("승인이 완료되었습니다")
        location.reload(true);
    }
    // 신청자 승인 끝
