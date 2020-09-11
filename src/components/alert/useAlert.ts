import { ifError } from "assert";

type optionsProps = {
    position ?: {
        bottomRight ?: boolean,
        bottomLeft ?: boolean,
    };
    info ?: {
        success ?: boolean,
        warn ?: boolean,
        narmal ?: boolean,
    };
    timeOut ?: number | string;
    cancleable ?: boolean;
}

export default (message : string, options ?: optionsProps) => {
    const mainDiv = document.createElement('div');
    const subDiv = document.createElement('div');
    const persentageBar = document.createElement('span');

    persentageBar.setAttribute('class', 'persentagebar')
    mainDiv.setAttribute('class', 'alert-dasdfar21');

    options?.position?.bottomLeft ? mainDiv.style.left = '0px' :
    mainDiv.style.right = '0px';

    persentageBar.style.backgroundColor = 
    options?.info?.success ?  "rgba(30, 125, 30, 0.8)" :
    options?.info?.warn ? "rgba(125, 30, 30, 0.8)" :
    "rgb(65, 65, 123)"

    subDiv.innerText = 
    options?.info?.success ?  message + "⭕" :
    options?.info?.warn ? message + "❌" :
    message + "😀"
    
    mainDiv.appendChild(subDiv);
    mainDiv.appendChild(persentageBar);
    document.body.appendChild(mainDiv);

    setTimeout(() => {
        mainDiv.style.transform = 'translateX(0%)'

    }, options?.timeOut ? options?.timeOut : 3500)
}