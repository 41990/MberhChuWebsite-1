

var name_field = document.getElementById('names-gp'), email_field = document.getElementById('email-gp'), address_field = document.getElementById('address-gp'), message_field = document.getElementById('message-gp');
var name_input = document.getElementById('names'), email_input = document.getElementById('email'), address_input = document.getElementById('address'), message_input = document.getElementById('message');

var field_arr = [name_field, email_field, address_field, message_field];

var text_arr = ['Names are required to proceed!', 'Please enter your email!', 'The location is missing!', 'We need to know your review!'];

for(let i=0; i< field_arr.length; i++){
    var name_popup = document.createElement('div');
    setAttrs(name_popup, {'class':'popup', 'id':'popup-container-id'});

    var popup_span = document.createElement('span');
    popup_span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">'+
  '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>'+
'</svg>'+'  '+text_arr[i];

    setAttrs(popup_span,{'class':'popuptext', 'id':'popup-id'});

    name_popup.appendChild(popup_span);
    field_arr[i].insertAdjacentElement("afterend", name_popup);
}

function popoverManager() {
     name_str = name_input.value, email_str = email_input.value, address_str = address_input.value, message_str = message_input.value;

     document.getElementById("review-form").addEventListener("submit", function(event){
        event.preventDefault();

        // Custom validation logic here
        let isValid = true; // Assume the form is valid initially

        // Custom validation rules
        if(name_str==''){
            let parent_elt = name_input.parentElement;
            isValid = false;
            parent_elt.nextElementSibling.classList.toggle("show");
        }

        if(email_str==''){
            let parent_elt = email_input.parentElement;
            isValid = false;
            parent_elt.nextElementSibling.classList.toggle("show");
        }else if(!email_str.includes('@')){
            isValid = false;
            document.getElementById('email-gp').nextElementSibling.firstElementChild.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">'+
      '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>'+
    '</svg>'+' '+'missing email "@" indicative';
            document.getElementById('email-gp').nextElementSibling.classList.toggle("show");
        }else if(!email_str.includes('.com')){
            isValid = false;
            document.getElementById('email-gp').nextElementSibling.firstElementChild.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">'+
      '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>'+
    '</svg>'+' '+'missing domain e.g example.com';
            document.getElementById('email-gp').nextElementSibling.classList.toggle("show");
        }

        if(address_str==''){
            let parent_elt = address_input.parentElement;
            isValid = false;
            parent_elt.nextElementSibling.classList.toggle("show");
        }
    
        if(message_str==''){
            let parent_elt = message_input.parentElement;
            isValid = false;
            parent_elt.nextElementSibling.classList.toggle("show");
        }

        // If the form is valid, submit it manually
        if (isValid) {

            sendData(this);

        }
    });
    
}

async function sendData(form) {
    // Associate the FormData object with the form element
    const formData = new FormData(form);

    try {
        const response = await fetch("/MberhChu/MberhChuWebsite/static/js/json/reviews.php", {
            method: "POST",
            // Set the FormData instance as the request body
            body: new URLSearchParams(formData),
            header:{
                "Content-type":"application/x-www-form-urlencoded",
            },
        });
        if (response.ok) {
            const data = await response.json();

            if (data.status === "success") {
                console.log("New Review:", data.data);
                // You can further process and display these reviews on your webpage

                console.log("Form data received from server:", data);

                // Process the data further as needed
                //display newly created review

                //const num_rev = data.data.length;
                makeReview(data.data.names, data.data.email, data.data.addr, data.data.mesg, data.data.reg_date, data.data.id);

                /*data.data.forEach(review => {
                    makeReview(review.names, review.email, review.addr, review.mesg, review.reg_date, review.id);
                });*/

                //scroll down to newly created review

                scrollToReview();

                // Clear the form after successful submission
                form.reset();
                
            } else {
                console.error("Error retrieving reviews");
            }
        } else {
            console.error("Failed to submit form:", response.status);
        }
    } catch (e) {
        console.error(e);
    }
}

function setAttrs(elt, attrs){
    for(let attr in attrs)
        elt.setAttribute(attr, attrs[attr]);
}

document.getElementsByClassName('quote-submit')[0].onclick = function(){submitManager();};

function submitManager(){
    popoverManager();

    if(document.getElementById('popup-container-id').classList.contains('show')){
        document.getElementById("review-form").addEventListener("submit", function(event){
            event.preventDefault();
        });
    }
}

function makeReview(name, email, address, message, date, id){

    var card = document.createElement('div');
    setAttrs(card, {'class':'card review-card w-100 mb-4 border border-bottom-0 border-success border-1 p-4', 'id':'review-card-'+id});

    var card_header = document.createElement('div');
    setAttrs(card_header, {'class':'row card-header', 'id':'card-header-id'});

    var imgCont = document.createElement('div');
    setAttrs(imgCont, {'class':'img-cont col-md-1 p-2', 'id':'img-cont-id'});

    var img = document.createElement('img');
    setAttrs(img, {
        'class':'left border rounded-circle', 
        'src':getAccountImage(email),
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

    var review_section = document.getElementById('review-section-id');
    review_section.appendChild(card);
}

function scrollToReview(){
    //all reviews number
     let l = document.querySelectorAll('.review-card').length;

     //last review
     const confirmationSection = document.getElementById('review-card-'+l.toString());

     //scroll to last review
     confirmationSection.scrollIntoView({ behavior: 'smooth' });
}

function appendElts(parent_elt, elts){
    for(let i=0; i<elts.length; i++)
        parent_elt.appendChild(elts[i]);
}

function getAccountImage(email){
    // Usage example
    const gravatarUrl = getGravatarUrl(email);
    const iconUrl = '../../images/logos/team.png';

    //verify if image exist
    if( getGravatarUrl=='https://www.gravatar.com/avatar/37ca2574750e2af1c09ea650cc7406df' ){

        return iconUrl;
    }

    console.log(gravatarUrl); // Gravatar URL

    return gravatarUrl;

}

function getGravatarUrl(email) {
    const emailEncrypt = CryptoJS.MD5(email.trim().toLowerCase()).toString();

    return `https://www.gravatar.com/avatar/${emailEncrypt}`;
}

window.addEventListener('load',  function(){
    persistReviews();
});

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
                    data.data.forEach(review => {
                        makeReview(review.names, review.email, review.addr, review.mesg, review.reg_date, review.id);
                    });
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
