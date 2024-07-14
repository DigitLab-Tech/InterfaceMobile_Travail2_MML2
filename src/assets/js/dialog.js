const dialogs = document.querySelectorAll('.dialog');

function closeDialog(event){
    const dialog = event.target;
    dialog.removeAttribute("open");
    dialog.removeAttribute("closing");
    dialog.removeEventListener("animationend",closeDialog);
}

function closingDialog(dialog){
    dialog.setAttribute("closing", "");
    dialog.addEventListener("animationend", closeDialog);
}


window.addEventListener('click',(e)=>{
    const target = e.target;
    const dialogSelector = target.getAttribute('data-dialog');

    if(dialogSelector){
        const dialog = document.querySelector(dialogSelector);

    if(dialog){
        if(dialog.checkVisibility()){
            closingDialog(dialog);
        } else{
                dialog.setAttribute("open", "");
            }
        }
    }
});

dialogs.forEach(dialog => {
    dialog.addEventListener('click', () => {
        closingDialog(dialog);
    });


    // Empêcher la propagation de l'événement clic à l'intérieur de la modale
    const childrens = dialog.querySelectorAll('& > *');
    childrens.forEach(children => {
        children.addEventListener('click', e => {
            e.stopImmediatePropagation();
        });
    });
}); 

const btnsClose = document.querySelectorAll('.btn-close');

btnsClose.forEach(btnClose => {
    btnClose.addEventListener('click', () => {
        dialogs.forEach(dialog => {
            closingDialog(dialog);
        })
    })
})




