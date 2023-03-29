// fetch("http://localhost:8080/api/v1/gatherings")
// 	.then(res => res.json())
// 	.then(res => {
// 		const results = res.result.content;
// 		console.log(results);
// 	});

// // 최종!
// fetch("http://localhost:8080/api/v1/gatherings")
// 	.then(response => response.json())
// 	.then(response => response.result.content)
// 	.then(data => {
// 		obj = data;
// 	});

/*
- 출력결과
[
  {
    id: 6,
    meetDateTime: '23/02/03',
    meetLocation: '장소QWWQER',
    currentPeople: 2,
    maxPeople: 4,
    title: '모집-제목WQEQWE',
    content: '내용입니다 테스트12345667889',
    close: false,
    exhibitionName: '2022 안성맞춤 천문과학관',
    exhibitionMainUrl: 'http://ticketimage.interpark.com/Play/image/large/21/21013073_p.gif',
    userName: 'chlalswns200',
    createdAt: '2023-02-06T17:19:33.836827'
  },
  {
    id: 5,
    meetDateTime: '2023.02.03',
    meetLocation: '서울',
    currentPeople: 1,
    maxPeople: 5,
    title: '합스부르크 모집합니다5',
    content: '같이 합스부르크 관람하실 분 모집합니다5',
    close: false,
    exhibitionName: '합스부르크 600년, 매혹의 걸작들',
    exhibitionMainUrl: 'http://ticketimage.interpark.com/Play/image/large/22/22015433_p.gif',
    userName: '영지안',
    createdAt: '2023-02-06T15:23:36.385504'
  },
  {
    id: 4,
    meetDateTime: '2023.02.03',
    meetLocation: '서울',
    currentPeople: 1,
    maxPeople: 5,
    title: '합스부르크 모집합니다4',
    content: '같이 합스부르크 관람하실 분 모집합니다4',
    close: false,
    exhibitionName: '합스부르크 600년, 매혹의 걸작들',
    exhibitionMainUrl: 'http://ticketimage.interpark.com/Play/image/large/22/22015433_p.gif',
    userName: '영지안',
    createdAt: '2023-02-06T15:23:30.603242'
  },
  {
    id: 3,
    meetDateTime: '2023.02.03',
    meetLocation: '제주',
    currentPeople: 1,
    maxPeople: 5,
    title: '합스부르크 모집합니다3',
    content: '같이 합스부르크 관람하실 분 모집합니다3',
    close: false,
    exhibitionName: '합스부르크 600년, 매혹의 걸작들',
    exhibitionMainUrl: 'http://ticketimage.interpark.com/Play/image/large/22/22015433_p.gif',
    userName: '영지안',
    createdAt: '2023-02-06T15:23:14.707566'
  },
  {
    id: 2,
    meetDateTime: '2023.02.01',
    meetLocation: '부산',
    currentPeople: 1,
    maxPeople: 3,
    title: '합스부르크 모집합니다2',
    content: '같이 합스부르크 관람하실 분 모집합니다2',
    close: false,
    exhibitionName: '합스부르크 600년, 매혹의 걸작들',
    exhibitionMainUrl: 'http://ticketimage.interpark.com/Play/image/large/22/22015433_p.gif',
    userName: '영지안',
    createdAt: '2023-02-06T15:22:55.011543'
  },
  {
    id: 1,
    meetDateTime: '2023.02.01',
    meetLocation: '서울',
    currentPeople: 1,
    maxPeople: 10,
    title: '합스부르크 모집합니다',
    content: '같이 합스부르크 관람하실 분 모집합니다',
    close: false,
    exhibitionName: '합스부르크 600년, 매혹의 걸작들',
    exhibitionMainUrl: 'http://ticketimage.interpark.com/Play/image/large/22/22015433_p.gif',
    userName: '영지안',
    createdAt: '2023-02-06T15:22:36.812391'
  }
]

*/

// gatherings 받아오기
// async function loadGatherings() {
// 	return await fetch("http://localhost:8080/api/v1/gatherings")
// 		.then(response => response.json())
// 		.then(response => response.result.content)
// 		.then(data => {
// 			obj = data;
// 		});
// }

// 수정
async function loadGatherings() {
  let url = `${BASE_URL}/api/v1/gatherings`;
  try {
    let result = await fetch(url)
      .then((response) => response.json())
      .then((response) => response.result.content)
      .then((data) => {
        obj = data;
      });
    return result;
  } catch (error) {
    console.log(error);
  }
}

// 렌더링
async function displayGatherings() {
  let gatherings = await loadGatherings();
  let container = document.getElementById('this-is-card-container');
  container.innerHTML = gatherings.map((gathering) => createHTMLGatherings(gathering)).join('');
}

function createHTMLGatherings(gathering) {
  return `<div class="pricing-horizontal row col-10 m-auto d-flex shadow-sm rounded overflow-hidden bg-white">
    <div class="pricing-horizontal-icon col-md-3 text-center bg-secondary text-light py-4">
        <i class="display-1 bx bx-package pt-4"></i>
        <img src = "${gathering.exhibitionMainUrl}" class = "exhibition_poster_image"/>
        <h5 class="h5 semi-bold-600 pb-4 light-300"> ${gathering.exhibitionName}</h5> 
    </div>

    <!-- 파티 정보 넣기 -->
    <div class="pricing-horizontal-body offset-lg-1 col-md-5 col-lg-4 d-flex align-items-center pl-5 pt-lg-0 pt-4">
        <ul class="text-left px-4 list-unstyled mb-0 light-300">
            <p> ${gathering.title} </p>
            <p> 전시 제목 </p>
            <li><i class="bx bxs-circle me-2"></i>5 Users</li>
            <li><i class="bx bxs-circle me-2"></i>2 TB space</li>
            <li><i class="bx bxs-circle me-2"></i>Community Forums</li>
        </ul>
    </div>

    <!-- 파티 참석 인원 동그라미 넣기 -->
    <div class="pricing-horizontal-tag col-md-4 text-center pt-3 d-flex align-items-center">
        <div class="w-100 light-300">
            <!-- 현재 참석 인원 -->
            <p> ${gathering.currentPeople}/${gathering.maxPeople}</p>
            <!-- 버튼 -->
            <a href="#" class="btn rounded-pill px-4 btn-outline-primary mb-3"> 더 알아보기 </a>
            <a href="#" class="btn rounded-pill px-4 btn-outline-primary mb-3"> 신청하기!🎉 </a>
        </div>
    </div>
</div> `;
}

// object를 HTML li 형태로 반환
// async function createGatherings() {
// 	let data = await loadGatherings();
// 	let html = "";
// 	data.array.forEach(gathering => {
// 		let htmlSeg = `<div class="pricing-horizontal row col-10 m-auto d-flex shadow-sm rounded overflow-hidden bg-white">
//     <div class="pricing-horizontal-icon col-md-3 text-center bg-secondary text-light py-4">
//         <i class="display-1 bx bx-package pt-4"></i>
//         <img src = "${gathering.exhibitionMainUrl}" class = "exhibition_poster_image"/>
//         <h5 class="h5 semi-bold-600 pb-4 light-300"> ${gathering.exhibitionName}</h5>
//     </div>

//     <!-- 파티 정보 넣기 -->
//     <div class="pricing-horizontal-body offset-lg-1 col-md-5 col-lg-4 d-flex align-items-center pl-5 pt-lg-0 pt-4">
//         <ul class="text-left px-4 list-unstyled mb-0 light-300">
//             <p> ${gathering.title} </p>
//             <p> 전시 제목 </p>
//             <li><i class="bx bxs-circle me-2"></i>5 Users</li>
//             <li><i class="bx bxs-circle me-2"></i>2 TB space</li>
//             <li><i class="bx bxs-circle me-2"></i>Community Forums</li>
//         </ul>
//     </div>

//     <!-- 파티 참석 인원 동그라미 넣기 -->
//     <div class="pricing-horizontal-tag col-md-4 text-center pt-3 d-flex align-items-center">
//         <div class="w-100 light-300">
//             <!-- 현재 참석 인원 -->
//             <p> ${gathering.currentPeople}/${gathering.maxPeople}</p>
//             <!-- 버튼 -->
//             <a href="#" class="btn rounded-pill px-4 btn-outline-primary mb-3"> 더 알아보기 </a>
//             <a href="#" class="btn rounded-pill px-4 btn-outline-primary mb-3"> 신청하기!🎉 </a>
//         </div>
//     </div>
// </div> `;

// 		html += htmlSeg;
// 	});
// 	const container = document.getElementById("this-is-card-container");
// 	container.innerHTML = html;
// }

// createGatherings();
displayGatherings();
