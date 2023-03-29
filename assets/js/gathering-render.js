async function ajax() {
  fetch(`${BASE_URL}/api/v1/gatherings`, {
    credentials: 'include'
  })
    .then(function (response) {
      if (response.status == 401) {
        alert("로그인을 해주세요.");
        window.location.href="/login";
      } else if(response.status != 200) {
        // 통신 안되면
        alert('서버와 통신에 실패했습니다. ');
      } else {
        return response.json();
      }
      console.log(response);
    })
    .then(function (jsonData) {

      let data = jsonData.result.content;
      let gatheringCards = document.querySelector('.this-is-card-container');
      var tag = '';

      for (let i = 0; i < data.length; i++) {
        let id = data[i].id;
        let postImgUrl = data[i].exhibitionMainUrl;
        let exhibitionName = data[i].exhibitionName;
        let dateAndTime = data[i].meetDateTime;
        let gatheringMeetLocation = data[i].meetLocation;
        let gatheringTitle = data[i].title;
        let gatheredPeopleNum = data[i].currentPeople;
        let maxGatheringNum = data[i].maxPeople;
        let gatheringLeader = data[i].userName;

        tag += `<div class="pricing-horizontal row col-10 m-auto d-flex shadow-sm rounded overflow-hidden my-5 bg-white">
<div class="pricing-horizontal-icon col-md-3 text-center bg-secondary text-light py-4">

<img src = "${postImgUrl}" class = "exhibition_poster_image g-2 img-thumbnail"/>
<h5 class="h5 semi-bold-600 card-footer g-2 pb-4 light-300"> ${exhibitionName}</h5> 
</div>

<!-- 파티 정보 넣기 -->
<div class="pricing-horizontal-body offset-lg-1 col-auto col-md-5 col-lg-4 d-flex align-items-center pl-5 pt-lg-0 pt-4">
<ul class="text-left px-4 list-unstyled mb-0 light-300">
  <h5 class = "p"> 🗣 ${gatheringTitle} </h6>
  <li><i class="bx bxs-circle me-2"></i> 이 때 만나요: ${dateAndTime} </li>
  <li><i class="bx bxs-circle me-2"></i> 여기서 만나요: ${gatheringMeetLocation} </li>
  <li><i class="bx bxs-circle me-2"></i> 모임장: ${gatheringLeader} </li>
</ul>
<div>
  
</div>   
</div>

<!-- 파티 참석 인원 동그라미 넣기 -->
<div class="pricing-horizontal-tag col-md-4 text-center pt-3 d-flex align-items-center">
<div class="w-100 light-300">
  <!-- 현재 참석 인원 -->
  <h6>  현재 참석자 수: ${gatheredPeopleNum} / 최대인원: ${maxGatheringNum}</h6>
  <!-- 버튼 -->
  <div class = "">
      <a onclick="submitSinglePage(this, '${id}')" class="btn rounded-pill px-4 btn-outline-primary mb-3"> 더 알아보기 </a>
      <a href="javascript:void(0);" onclick="enrollGathering(${id})" class="btn rounded-pill px-4 btn-outline-primary mb-3"> 신청하기!🎉 </a>
  </div>
</div>
</div>
</div> `;
      } //end
      gatheringCards.innerHTML = tag;
    });
}