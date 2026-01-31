
const battleButton = document.querySelector('.battle-button')
const singleModeButton = document.querySelector('.single-mode-button')
const singleInput = document.querySelector('.single-input')
const bSearch1 = document.querySelector('#b-search1')
const bSearch2 = document.querySelector('#b-search2')
const battleModeButton = document.querySelector('.battle-mode-button')
const viewRepo = document.querySelector('.repos-button')
const singleSearchDiv = document.querySelector('.single-search')
const battleSearchDiv = document.querySelector('.battle-search')
const notify = document.querySelector('#notify')
const root = document.querySelector('#root')
const loading = document.querySelector('#loading')

let data;
let battle = false

const fetchedData =  await fetchUser('roshansu')
setUser(fetchedData)

singleModeButton.addEventListener('click', async ()=>{
    root.innerHTML = ''
    const searchValue = singleInput.value.trim()
    singleInput.value = ''
    if(searchValue === '') return
    console.log(searchValue, singleInput)
    // loading.style.display = 'block'
    const fetchedData =  await fetchUser(searchValue)
    
    setUser(fetchedData)
})

async function fetchUser(searchValue) {
    try{
        loading.innerHTML = 'Searching...'
        const response = await fetch(`https://api.github.com/users/${searchValue}`)
        const finalData = await response.json()
        data = finalData
        console.log(finalData, finalData.avatar_url, finalData.followers, finalData.following)
        loading.innerHTML = ''
        return finalData
    }catch(err){
        root.innerHTML = `Something went wrong ${err}`
        return null
    }
}

function setUser(data, star = 0, clr = '#ffff', text = ''){

    if(data?.status === "404"){
        root.innerHTML = 'User not found'
        return
    }

    const divSingle = document.createElement('div')
    divSingle.classList.add('single-card')

    const img = document.createElement('img')

    const divMain = document.createElement('div')
    divMain.classList.add('main-card')

    const divName = document.createElement('name-join')
    
    const h2Name = document.createElement('h2')
    h2Name.id = 'name'

    const pJoin = document.createElement('p')

    const aGit = document.createElement('a')
    aGit.classList.add('lnk')
    aGit.target = '_blank'

    const aGitInner = `<span>Github</span>
                    <i class="fa-brands fa-github"></i>`
    aGit.innerHTML = aGitInner

    const h3Bio = document.createElement('h3')
    h3Bio.classList.add('bio')
    
    const divUser = document.createElement('div')
    divUser.classList.add('user-details')

    const divRepo = document.createElement('div')
    divRepo.classList.add('repo-div') 

    const pRepo = document.createElement('p')
    pRepo.innerHTML = 'Repos'

    const pRepoCnt = document.createElement('p')
    pRepoCnt.classList.add('repo-count')

    const divFollower = document.createElement('div')
    divFollower.classList.add('follower-div')

    const pFlwrs = document.createElement('p')
    pFlwrs.innerHTML = 'Followers'

    const pFlwrsCnt = document.createElement('p')
    pFlwrsCnt.classList.add('follower-count')

    const divFollowing = document.createElement('div')
    divFollowing.classList.add('following-div')

    const pFlwing = document.createElement('p')
    pFlwing.innerHTML = 'Following'

    const pFlwingCnt = document.createElement('p')

    const divVersus = document.createElement('div')
    divVersus.classList.add('versus')

    const divStar = document.createElement('div')
    divStar.classList.add('total-star')

    const starIcon = document.createElement('i')
    starIcon.classList.add('fa-solid')
    starIcon.classList.add('fa-star')
    starIcon.style.color = '#E2852E'

    const starCnt = document.createElement('span')
    starCnt.id = 'star-count'

    const spanRes = document.createElement('span')
    spanRes.classList.add('result')

    starCnt.innerHTML = star
    divStar.appendChild(starIcon)
    divStar.appendChild(starCnt)
    divVersus.appendChild(divStar)

    spanRes.innerHTML = text
    spanRes.style.backgroundColor = clr
    divVersus.appendChild(spanRes)

    const divPortfollio  = document.createElement('div')
    divPortfollio.classList.add('portfollio')

    const aBlogUrl = document.createElement('a')
    aBlogUrl.classList.add('lnk')
    aBlogUrl.target = '_blank'

    aBlogUrl.innerHTML = `<span>Portfollio</span>
                        <i class="fa-solid fa-book"></i>`

    const repoButton = document.createElement('button')
    repoButton.innerHTML = 'View Repos'
    repoButton.classList.add('repos-button')
    repoButton.type = 'button'

    const divRepoList = document.createElement('div')
    divRepoList.classList.add('repo-list')

    img.src = data.avatar_url
    img.alt = data.login
    divSingle.appendChild(img)

    h2Name.innerHTML = data.login
    divName.appendChild(h2Name)

    pJoin.innerHTML = `Joined in ${moment(data.created_at).format('MMMM Do YYYY')}`
    divName.appendChild(pJoin)
    divName.appendChild(pJoin)
    divMain.appendChild(divName)

    aGit.href = data.html_url
    divMain.appendChild(aGit)

    h3Bio.innerHTML = data.bio === null ? 'this user has no bio' : data.bio
    divMain.appendChild(h3Bio)

    divRepo.appendChild(pRepo)
    pRepoCnt.innerHTML = data.public_repos
    divRepo.appendChild(pRepoCnt)

    divUser.appendChild(divRepo)

    divFollower.appendChild(pFlwrs)
    pFlwrsCnt.innerHTML = data.followers
    divFollower.appendChild(pFlwrsCnt)
    divUser.appendChild(divFollower)

    divFollowing.appendChild(pFlwing)
    pFlwingCnt.innerHTML = data.following
    divFollowing.appendChild(pFlwingCnt)
    divUser.appendChild(divFollowing)

    divMain.appendChild(divUser)
    divMain.appendChild(divVersus)

    aBlogUrl.href = data.blog
    aBlogUrl.style.display = data.blog === '' ? 'none' : ''
    divPortfollio.appendChild(aBlogUrl)
    divPortfollio.appendChild(repoButton)

    divMain.appendChild(divPortfollio)
    divMain.appendChild(divRepoList)
    divSingle.appendChild(divMain)

    root.appendChild(divSingle)

    console.log(data)

    let flag = false

    repoButton.addEventListener('click', async ()=>{

        flag = !flag

        if(!flag){
            divRepoList.style.display = 'none'
            return
        }

        divRepoList.style.display = 'flex'
        divRepoList.innerHTML = 'Loading repos'
        const response = await fetch(data.repos_url)
        const finalData = await response.json()

        divRepoList.innerHTML = ''

        console.log(finalData)
        finalData.map((val, ind)=>{
            
            if(ind <=5){
                const a = document.createElement('a')
                a.href = val.html_url
                a.innerHTML = val.name

                divRepoList.appendChild(a)
            }   
        })
    })


}


battleButton.addEventListener('click', ()=>{

    console.log("clicked")
    battle = !battle
    if(!battle){
        notify.style.display = 'none'
        singleSearchDiv.style.display = 'flex'
        battleSearchDiv.style.display = 'none'
        battleButton.style.backgroundColor = 'inherit'
        battleButton.style.color = 'black'
        root.innerHTML = ''
        return;
    }

    battleButton.style.backgroundColor = '#740A03'
    battleButton.style.color = '#ffff'

    notify.style.display = 'block'
    root.innerHTML = ''
    singleSearchDiv.style.display = 'none'
    battleSearchDiv.style.display = 'flex'
})

battleModeButton.addEventListener('click', ()=>{
    const user1 = bSearch1.value.trim().toLowerCase()
    const user2 = bSearch2.value.trim().toLowerCase()

    if(user1 === '' || user2 === '' ) return

    if(user1 === user2) return alert('User cannot be same')
    
    root.innerHTML = ''
    bSearch1.value = ''
    bSearch2.value = ''
    console.log(user1, user2)
    fetch2User(user1, user2)
})

async function fetchStar(repoUrl) {
    try{
        const response = await fetch(repoUrl)
        const finalData = await response.json()
        let starCnt = 0

        finalData.map((val)=>{
            starCnt += Number(val.stargazers_count)
        })
        
        return starCnt
    }
    catch(err){
        return null
    }
}

async function  fetch2User(user1, user2) {

    const [userData1, userData2] = await Promise.all([fetchUser(user1), fetchUser(user2)])
    console.log(userData1, userData2)
    const [userStar1, userStar2] = await Promise.all([fetchStar(userData1.repos_url), fetchStar(userData2.repos_url)])
    console.log(userStar1, userStar2)
    notify.style.display = 'none'
    
    setUser(userData1, userStar1, userStar1 > userStar2 ? '#3BC1A8' : '#BF092F', userStar1 > userStar2 ? 'Winner' : 'Looser')
    setUser(userData2, userStar2, userStar2 > userStar1 ? '#3BC1A8' : '#BF092F', userStar2 > userStar1 ? 'Winner' : 'Looser')
    document.querySelectorAll('.versus').forEach((el)=>{
        el.style.display = 'flex'
    })

}
