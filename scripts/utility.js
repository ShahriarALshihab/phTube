const uploadTime = (time) => {
    const day = parseInt(time / 86400); 
    const year = parseInt(day / 365); 
    const days = parseInt(day % 365); 
    const remainTime = time % 86400; 
    const hour =parseInt( remainTime / 3600); 
    let remainingSeconds = remainTime % 3600; 
    const minutes = parseInt(remainingSeconds / 60); 
    let remainingSecond = remainingSeconds % 60; 

    return(`${year}yrs ${days}day ${hour}hrs ${minutes}mins ${remainingSecond}sec ago`);
}

