const count = 30;
const apiKey = '0N216yGYWIRyx31DOmck1VSQJoAO5RlgMQ-Og0mhH6A';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById('imageDiv');
const loader = document.getElementById('loading');


let isDownloaded = false;
let imagesLoaded=0;
let imagesArray = [];
let totalImages 


async function getImages(){
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        imagesArray = await response.json();
        console.log(imagesArray);
        displayImages();
    } catch (error) {
        console.log('Error fetching images:', error.message);
    }
}


function displayImages(){
    imagesLoaded = 0
    totalImages = imagesArray.length;


    imagesArray.forEach((image)=>{
        const item = document.createElement('a');
        setAttributes(item, { href: image.urls.regular});
        const img = document.createElement('img');
        setAttributes(img,{
            src:image.urls.regular,
            alt:image.alt_description
        });

        img.addEventListener('load',imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        isDownloaded = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

window.addEventListener('scroll',()=>{
    console.log('Triggered')

    if (
       window.innerHeight + window.scrollY >= 
       document.body.offsetHeight - 1000 && isDownloaded
    ) {
        getImages();
    }
});







getImages();