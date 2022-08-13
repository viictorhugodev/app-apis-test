
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites/';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
const spanError = document.getElementById('error')

async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM)
    const data = await res.json()
    console.log('Randoms')
    console.log(data)
    
    if(res.status !== 200) {
        spanError.innerHTML = `Hubo un error ${res.status}`
    } else {
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')
        img1.src = data[0].url
        img2.src = data[1].url

        btn1.onclick = () => saveFavoriteMichis(data[0].id)
        btn2.onclick = () => saveFavoriteMichis(data[1].id)
    }
}

async function loadFavoriteMichis() {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'a846ea76-0393-440e-a685-1d119d5aee47'
        }
    })
    const data = await res.json()
    console.log('Favorites')
    console.log(data)
    if(res.status !== 200) {
        spanError.innerHTML = `Hubo un error ${res.status} ${data.message}`
    } else {
        const section = document.getElementById('favoriteMichis')
        section.innerHTML = ""
        const h2 = document.createElement('h2')
        const h2Text = document.createTextNode('Michos favoritos')
        h2.appendChild(h2Text)
        section.appendChild(h2)
        data.forEach(michi => {
            const article = document.createElement('article')
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const btnText = document.createTextNode('Sacar al michi de favoritos')

            img.src = michi.image.url
            img.width = 150
            btn.appendChild(btnText)
            btn.onclick = () => deleteFavoriteMichis(michi.id)
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)
        });
    }
    
}

async function saveFavoriteMichis(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'a846ea76-0393-440e-a685-1d119d5aee47'
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    const data = await res.json();
    console.log('SaveFavoritesMichis')
    console.log(res)

    if(res.status !== 200) {
        spanError.innerHTML = `Hubo un error ${res.status} ${data.message}`
    } else {
        console.log('Michi guardado en Favoritos')
        loadFavoriteMichis()
    }
}

async function deleteFavoriteMichis(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'a846ea76-0393-440e-a685-1d119d5aee47'
        }
    })
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = `Hubo un error ${res.status} ${data.message}`
    } else {
        console.log('Michi Eliminado de Favoritos')
        loadFavoriteMichis()
    }
}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form)

    console.log(formData.get('file'))

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/formData',
            'X-API-KEY': 'a846ea76-0393-440e-a685-1d119d5aee47'
        },
        body: formData
    })

    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = `Hubo un error ${res.status} ${data.message}`
    } else {
        console.log('Michi de michi subida')
        saveFavoriteMichis(data.id)
    }
}

loadRandomMichis()
loadFavoriteMichis()
saveFavoriteMichis()
uploadMichiPhoto()