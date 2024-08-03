
const sliderFrames = document.querySelectorAll('.slide-in');
const sliderLefts = document.querySelectorAll('.slide-left');

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

window.addEventListener('scroll', debounce(checkSlide));
