import { Directive, OnInit, OnDestroy, Input, Renderer2, ElementRef } from '@angular/core';
import { AbstractControl, FormGroupDirective, ControlContainer } from '@angular/forms';
import { Observable, Subscription, pipe, merge, of } from 'rxjs';

@Directive({
    selector: '[invalidmessage]'
})

export class InvalidmessageDirective implements OnInit, OnDestroy {
    @Input() invalidmessage: string;
    control: AbstractControl;
    hasView = false;
    controlValue$: Observable<any>;
    controlSubscription: Subscription;
    hasSubmitted: boolean;
    constructor(
        private _fg: ControlContainer,
        private _el: ElementRef,
        private render: Renderer2
    ) { }

    ngOnInit() {
        this.control = this.form.get(this.invalidmessage);
        let formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit;

        this.controlValue$ = merge(this.control.valueChanges, of(''), formSubmit$);
        this.controlSubscription = this.controlValue$.subscribe(() => {
            this.setVisible();
        });

    }  

    private setVisible() {
        if (this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
            this.render.removeStyle(this._el.nativeElement, 'display');
        } else {
            this.render.setStyle(this._el.nativeElement, 'display', 'none');
        }
    }

    match(error: string) {
        if (this.control && this.control.errors) {
            if (Object.keys(this.control.errors).indexOf(error) > -1) {
                return true;
            }
        }
        return false;
    }

    get form() { return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null; }

    ngOnDestroy() {
        this.controlSubscription.unsubscribe();
    }
}