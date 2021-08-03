import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from 'rxjs';
import { TabledataService } from "../tabledata.service";

@Component({
  selector: "app-table-ag-grid",
  templateUrl: "./table-ag-grid.component.html",
  styleUrls: ["./table-ag-grid.component.css"],
})

export class TableAgGridComponent implements OnInit {
  users: any;
  userData = [];
  selectedColumns = [];
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    "select",
    "id",
    "employee_name",
    "employee_age",
    "employee_salary",
    "profile_image",
  ];
  
  private subscriptions: Subscription = new Subscription();

  constructor(private _TabledataService: TabledataService) {}

  ngOnInit(): void {
    //Fetching all data and binding it to the grid
    this.subscriptions.add(
      this._TabledataService.getUserDetails().subscribe((data: any) => {
        this.userData = data["data"];
        this.users = new MatTableDataSource(data["data"]);
        this.getTotalSal();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  //Adding all the values of employee salary column
  getTotalSal(): any {
    return this.userData
      .map((t) => t.employee_salary)
      .reduce((acc, value) => acc + value, 0);
  }

  getTotalsubset(): any {
    // console.log(this.selection,'this.selections')
    return this.selectedColumns
      .map((t) => t.employee_salary)
      .reduce((acc, value) => acc + value, 0);
  }

   /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.data.length;
    return numSelected === numRows;
  }

  isChanged(event: { checked: any; }, row: any): void {
    console.log(event,'event')
    console.log(row,'row')

    if (event.checked) {
      this.selectedColumns.push(row);
    } else {
      const index = this.selectedColumns.indexOf(row);
      if (index > -1) {
        this.selectedColumns.splice(index, 1);
      }
    }
    console.log(this.selectedColumns,'selectedColumns')
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle(): void {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.users.data.forEach((row: any) => this.selection.select(row));
  // }
}
