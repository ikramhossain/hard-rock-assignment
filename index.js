const searchButton = document.getElementById('search-button')
searchButton.addEventListener('click', function(){
const searchInput = document.getElementById('search-input').value
const suggestion = lyricSuggestion(searchInput)
})

function lyricSuggestion(searchInput){
    fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
        .then(res => res.json())
        .then(result => {
            const displayResult = document.getElementById('resultContainer')
                displayResult.innerHTML = '';
            let lyricsInfo = result.data
                lyricsInfo = lyricsInfo.slice(0, 10)
            for (let i = 0; i < lyricsInfo.length; i++) {
                const lyricsData = lyricsInfo[i];
            const div = document.createElement('div')
            div.innerHTML = `
            <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <img src="${lyricsData.album.cover}" class="pr-2 img-fluid rounded float-left" alt="">
                        <h3 class="lyrics-name">${lyricsData.title}</h3>
                        <p class="author lead">Album by <span>${lyricsData.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${lyricsData.artist.name}', '${lyricsData.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>`;
                displayResult.appendChild(div);
                }
            })
            
        }
function getLyrics(artist, title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        let showLyrics = data.lyrics
            const lyricDisplay = document.getElementById('resultContainer')
                lyricDisplay.innerHTML = '';
            const div = document.createElement('div')
            if (showLyrics==undefined) {
                div.innerHTML = `<h3 class= "text-white text-center">No Lyrics Found</h3>`
                lyricDisplay.appendChild(div)
            }else{
                div.innerHTML = `
                <h2 class="text-success mb-4 text-center">${artist} - ${title}</h2>
                <pre class="lyric text-white text-center">${showLyrics}</pre>`;
                lyricDisplay.appendChild(div)
            }
            
        })
    }