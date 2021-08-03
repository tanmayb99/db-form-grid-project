import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { debounceTime } from "rxjs/operators";

const DB_TIME = 500;

@Component({
  selector: "app-division-form",
  templateUrl: "./division-form.component.html",
  styleUrls: ["./division-form.component.css"],
})

export class DivisionFormComponent implements OnInit {
  inputForm: FormGroup;
  firstValue: any;
  secondValue: any;

  private subscriptions: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder) {
    this.inputNumbersForm();
  }

  ngOnInit(): void {
    //Subscribing first input box changed value with a debounce time
    this.subscriptions.add(
      this.inputForm.get("firstInputValue").valueChanges.pipe(debounceTime(DB_TIME))
      .subscribe((dataValue) => {
        this.firstValue = dataValue;
        this.onNumChange();
    }));
    //Subscribing second input box changed value with a debounce time
    this.subscriptions.add(
      this.inputForm.get("secondInputValue").valueChanges.pipe(debounceTime(DB_TIME))
      .subscribe((dataValue) => {
        this.secondValue = dataValue;
        this.onNumChange();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  inputNumbersForm() {
    this.inputForm = this.formBuilder.group({
      firstInputValue: ["", [Validators.required]],
      secondInputValue: ["", [Validators.required]],
      result: [{ value: "", disabled: true }],
    });
  }

  // Dividing the two numbers
  onNumChange() {
    if (
      this.inputForm.controls["firstInputValue"].value &&
      this.inputForm.controls["secondInputValue"].value
    ) {
      let result =
        Number(this.inputForm.controls["firstInputValue"].value) /
        Number(this.inputForm.controls["secondInputValue"].value);
      this.inputForm.controls["result"].setValue(result);
    } else {
      this.inputForm.controls["result"].setValue(null);
    }
  }
}
