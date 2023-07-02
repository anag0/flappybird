export class Input {
    clicked = false;

    constructor() {
        window.addEventListener('click', e=>{
           this.clicked = true; 
        });
    }

    didClick() {
        if ( this.clicked ) {
            this.clicked = false;
            return true;
        }
        return false;
    }
}