const salir = () => {
    console.log('user');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

$(document).ready(() => {

    const user = localStorage.getItem('user');
    if(!user){
        window.location.href = 'index.html';
    }

    

})