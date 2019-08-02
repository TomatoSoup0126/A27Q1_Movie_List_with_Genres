const movieGenres = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

const data = []

const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const listPanel = document.getElementById('genres-lists')
const dataPanel = document.getElementById('data-Panel')



//渲染左側目錄欄
renderGenresList()

axios.get(INDEX_URL).then((response) => {
  data.push(...response.data.results)
  showMovie(data)
}).catch((err) => console.log(err))

//監聽list, 更動active項目, 取得類型ID, 傳入filterByGenres
listPanel.addEventListener('click', (event) => {
  if (event.target.classList.contains('list-group-item')) {
    genreActive(event)
    let genresId = event.target.dataset['genresid']
    console.log(genresId)
    filterByGenres(Number(genresId)) //string轉number才能比對
  }
})


// 生成左側目錄欄
function renderGenresList() {
  let htmlContent = ''
  for (const key in movieGenres) {
    htmlContent += `
    <a href="#" class="list-group-item list-group-item-action" data-genresId="${key}">${movieGenres[key]}</a>
  `
  }
  listPanel.innerHTML = htmlContent
}

// 清除list item所有的active, 幫event.target加上active
function genreActive(event) {
  let genres = document.querySelectorAll('.list-group-item')
  for (let i = 0; i < genres.length; i++) {
    genres[i].classList.remove('active')
  }
  event.target.classList.add('active')
}


// 顯示電影card
function showMovie(data) {
  let htmlContent = ''
  data.forEach(function (item, index) {
    htmlContent += `
    <div class="col-md-3">
      <div class="card mb-2" style="width: 13.5rem;">
        <img class="card-img-top" src="${POSTER_URL}${item.image}"alt="Card image cap">
        <div class="card-body">
          <h6 class="card-text">${item.title}</h6>
    `
    // 遍歷所有類型代號，代號作為key對照movieGenres回傳類型名稱
    for (let i = 0; i < item.genres.length; i++) {
      htmlContent += `
          <span class="badge badge-light font-weight-light">${movieGenres[item.genres[i]]}</span>
      `
    }
    htmlContent += `
        </div >
     </div >
   </div >
  `
  })
  dataPanel.innerHTML = htmlContent
}

//用filter篩選電影類型組成新陣列,將新陣列傳入showMovie重新渲染
function filterByGenres(num) {
  let genresList = data.filter(item => item.genres.includes(num))
  console.log(genresList)
  showMovie(genresList)
}