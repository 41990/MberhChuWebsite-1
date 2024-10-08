
const sliderFrames = document.querySelectorAll('.slide-in');
const sliderLefts = document.querySelectorAll('.slide-left');
var prevScrollpos = document.getElementsByClassName('main-navbar')[0].scrollHeight;

window.onscroll = function() {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
        document.getElementsByClassName("navbar-second")[0].style.top = "9%";
    } 
    else if(currentScrollPos > prevScrollpos){
        document.getElementsByClassName("navbar-second")[0].style.top = "-20%";
    }
    
}

function debounce (func, wait, immediate){
    var timeout; 
    return function (){
        var context = this, args = arguments;
        var later = function (){
            timeout = null;
            if(!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow)
            func.apply(this, args);
    };
}

function checkSlide (e){
    sliderFrames.forEach(sliderFrame => {

        const slideInAt = (window.scrollY + window.innerHeight) - sliderFrame.scrollHeight / 2;
        const frameBottom = sliderFrame.offsetTop + sliderFrame.scrollHeight;
    
        const isHalfShown = slideInAt > sliderFrame.offsetTop;
        const isNoScrolledPassed = window.scrollY < frameBottom;
    
        if(isHalfShown && isNoScrolledPassed){
            sliderFrame.classList.add('active');
        }else{
            sliderFrame.classList.remove('active');
        }
    });

    sliderLefts.forEach(sliderleft => {

        const slideInAt = (window.scrollY + window.innerHeight) - sliderleft.scrollHeight / 2;
        const frameBottom = sliderleft.offsetTop + sliderleft.scrollHeight;
    
        const isHalfShown = slideInAt > sliderleft.offsetTop;
        const isNoScrolledPassed = window.scrollY < frameBottom;
    
        if(isHalfShown && isNoScrolledPassed){
            sliderleft.classList.add('active-left');
        }else{
            sliderleft.classList.remove('active-left');
        }
    });
}

function makeReview(name, email, address, message, date, id){

    var card = document.createElement('div');
    setAttrs(card, {'class':'card review-card w-50 mb-4 border border-bottom-0 border-success border-1 p-4', 'id':'review-card-'+id});

    var card_header = document.createElement('div');
    setAttrs(card_header, {'class':'row card-header', 'id':'card-header-id'});

    var imgCont = document.createElement('div');
    setAttrs(imgCont, {'class':'img-cont col-md-1 p-2', 'id':'img-cont-id'});

    var img = document.createElement('img');
    setAttrs(img, {
        'class':'left border rounded-circle', 
        'src':'',
        'alt':'Acc Img',
        'width':'70',
        'height':'70'
    });

    imgCont.appendChild(img);

    var title = document.createElement('p');
    setAttrs(title, {'class':'title-class col-md-8 d-flex flex-column', 'id':'title-id'});

    var title_span = document.createElement('span');
    setAttrs(title_span, {'class':'title-span mt-1 text-success fw-semibold fs-4', 'id':'title-span-id'});
    title_span.innerText = name;

    var location_text = document.createElement('span');
    setAttrs(location_text, {'class':'location-text mt-2 text-secondary fs-6', 'id':'location-text-id'});
    location_text.innerText = address;

    appendElts(title, [title_span, location_text]);

    var time = document.createElement('span');
    time.innerText = date;
    setAttrs(time, {'class':'right col-md-3 text-secondary mt-2 ms-auto justify-content-end', 'id':'time-id'});

    appendElts(card_header, [imgCont, title, time]);

    var card_body = document.createElement('div');
    setAttrs(card_body, {'class':'card-body', 'id':'card-body-id'});

    var msg = document.createElement('p');
    setAttrs(msg, {'class':'review-msg text-success mt-2 fs-6', 'id':'review-msg-id'});
    msg.innerHTML = '<b><i class="bi bi-quote"></i><b/> '+ message +' <b><i class="bi bi-quote"></i><b/>';


    card_body.appendChild(msg);

    appendElts(card, [card_header, card_body]);

    var review_section = document.getElementsByClassName('section-content')[0];
    review_section.appendChild(card);

    // Example usage
    checkGravatar(email).then(src => {
        if (src) {
            img.src = src;
        } else {
            img.src = "/MberhChu/MberhChuWebsite/images/logos/team.png";
        }
    });
}

async function persistReviews(){
    try {
        const response = await fetch(
            "/MberhChu/MberhChuWebsite/static/js/json/reviews.php",
            {method:"GET"}
        );

        if(response.ok){
            const data = await response.json();
            if(data.status === "success"){
                if(data.data.length > 0){
                    data.data.forEach(review => {
                        console.log(`ID: ${review.id}, Name: ${review.names}, Email: ${review.email}, Address: ${review.addr}, Message: ${review.mesg}, Date: ${review.reg_date}`);
                    });
                    let l = data.data.length;
                    for(let i=l-4; i<l; i++){
                        makeReview(data.data[i].names, data.data[i].email, data.data[i].addr, data.data[i].mesg, data.data[i].reg_date, data.data[i].id);
                    }
                    /*data.data.forEach(review => {
                        makeReview(review.names, review.email, review.addr, review.mesg, review.reg_date, review.id);
                    });*/
                }else {
                    console.log(data.message);
                }
            }else {
                console.error("Error retrieving reviews");
            }
        }else {
            console.error("Request on document load Failed:", response.status);
        }
    } catch (error) {
        console.error(error);
    }
    
}

function setAttrs(elt, attrs){
    for(let attr in attrs)
        elt.setAttribute(attr, attrs[attr]);
}

function appendElts(parent_elt, elts){
    for(let i=0; i<elts.length; i++)
        parent_elt.appendChild(elts[i]);
}

function getAccountImage(email){
    // Usage example
    const gravatar = getGravatarUrl(email);
    const iconUrl = '/MberhChu/MberhChuWebsite/images/logos/team.png';

    //verify if image exist
    if(gravatar==gravatar+'?d=404'){
        return iconUrl;
    }

    return gravatar;

}

function getGravatarUrl(email) {
    const emailEncrypt = CryptoJS.MD5(email.trim().toLowerCase()).toString();

    return `https://www.gravatar.com/avatar/${emailEncrypt}`;
}

function checkGravatar(email) {
    // Generate the MD5 hash of the email
    const emailHash = CryptoJS.MD5(email.trim().toLowerCase());

    // Gravatar URL with the 404 fallback
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=404`;

    // Return a promise that resolves with the appropriate URL
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function() {
            // Gravatar exists, resolve with the gravatar URL
            resolve(`https://www.gravatar.com/avatar/${emailHash}`);
        };

        img.onerror = function() {
            // No Gravatar found, resolve with a default image or null
            resolve(null); // You can replace null with a default image URL if desired
        };

        img.src = gravatarUrl;
    });
}


window.addEventListener('load',  function(){
    persistReviews();
});

window.addEventListener('scroll', debounce(checkSlide));


