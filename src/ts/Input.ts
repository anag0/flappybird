export class Input {
    clicked: boolean = false;

    constructor() {
        window.addEventListener('click', e=>{
           this.clicked = true; 
        });
    }

    // Resets after check
    didClick(): boolean {
        if ( this.clicked ) {
            this.clicked = false;
            return true;
        }
        return false;
    }
}