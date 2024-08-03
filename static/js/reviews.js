
var name_field = document.getElementById('names-gp'), email_field = document.getElementById('email-gp'), address_field = document.getElementById('address-gp'), message_field = document.getElementById('message-gp');
var name_input = document.getElementById('names'), email_input = document.getElementById('email'), address_input = document.getElementById('address'), message_input = document.getElementById('message');

field_arr = [name_field, email_field, address_field, message_field];

text_arr = ['Names are required to proceed!', 'Please enter your email!', 'The location is missing!', 'We need to know your review!'];

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
        const response = await fetch("/MberhChu/static/js/json/reviews.php", {
        method: "POST",
        // Set the FormData instance as the request body
        body: formData,
        header:{
            "Content-type":"application/x-www-form-urlencoded",
        },
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Form data received from server:", data);

            // Access individual form fields from the response data
            console.log("Name:", data.names);
            console.log("Email:", data.email);
            console.log("Address:", data.address);
            console.log("Message:", data.reviewMessage);

            // Process the data further as needed

            // Clear the form after successful submission
            form.reset();
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

function appendElts(parent_elt, elts){
    for(let elt in elts)
        parent_elt.appendChild(elt);
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

function makeReview(name, address, message){

    var card = document.createElement('div');
    setAttrs(card, {'class':'card w-100', 'id':'review-card-id'});

    var card_header = document.createElement('div');
    setAttrs(card_header, {'class':'card-header', 'id':'card-header-id'});

    var img = document.createElement('img');
    setAttrs(img, {
        'class':'left', 
        'src':'',
        'alt':'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">'+
  '<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>'+'</svg>'
    });

    var title = document.createElement('p');

    var title_text = document.createElement('span');
    title_text.innerHtml = name;
    var location = address;
    title_text.insertAdjacentText("afterend", location);

    title.appendChild(title_text);

    var time = document.createElement('span');
    var d = new Date();
    time.innerHtml = d.toDateString();
    setAttrs(time, {'class':'right', 'id':'time-id'});

    appendElts(card_header, [img, title, time]);

    var card_body = document.createElement('div');
    setAttrs(card_body, {'class':'card-body', 'id':'card-body-id'});

    var msg = document.createElement('p');
    setAttrs(msg, {'class':'review-msg', 'id':'review-msg-id'});
    msg.innerHtml = message;


    card_body.appendChild(msg);

    appendElts(card, [card_header, card_body]);

    var review_section = document.getElementById('review-section-id');
    review_section.appendChild(card);
}
