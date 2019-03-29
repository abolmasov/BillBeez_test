import { Component, OnInit } from "@angular/core";
import { GetMeteorsService } from "./services/get-meteors.service";
import { Meteor } from "./interfaces/meteors";
import { MatSnackBar } from "@angular/material";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { MatDatepicker } from "@angular/material/datepicker";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public displayedColumns: string[] = [
    "fall",
    "geolocation",
    "id",
    "mass",
    "name",
    "nametype",
    "recclass",
    "reclat",
    "reclong",
    "year"
  ];
  public meteorData: any[] = [];
  public tableData: any;

  public isLoading: boolean = true;
  public noResults: boolean = false;

  filterForm = new FormGroup({
    fallYear: new FormControl(""),
    meteorMass: new FormControl("")
  });

  constructor(
    private getMeteorsService: GetMeteorsService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.getMeteorsService.getMeteorsData().subscribe(
      (response: Array<Meteor>) => {
        this.tableData = new MatTableDataSource(response);
        this.meteorData = response;
        this.isLoading = false;
      },
      () => (this.isLoading = true)
    );
  }

  ngOnInit() {}

  public filterByDate(date: Date, datepicker: MatDatepicker<any>) {
    let selectedYear: number = new Date(date).getFullYear();
    this.filterForm.controls.fallYear.setValue(new Date(date));
    this.tableData = this.meteorData.filter(
      (item: Meteor): boolean => {
        return new Date(item.year).getFullYear() === selectedYear;
      }
    );
    if (this.tableData.length === 0) {
      this.snackBar.open("No meteors fall this year", "Ooops!", {
        duration: 5e3
      });
    }

    datepicker.close();
  }

  public filteringByMass(event: MouseEvent) {
    let massValue: number = +event.currentTarget.value;
    this.tableData = this.tableData.filter((item: Meteor) => {
      return parseFloat(item.mass) >= massValue;
    });
    if (this.tableData.length === 0) {
      this.tableData = this.meteorData.filter((item: Meteor) => {
        return parseFloat(item.mass) >= massValue;
      });

      if (this.tableData.length > 0) {
        this.filterForm.controls.fallYear.setValue(
          new Date(this.tableData[0].year)
        );
      }

      this.snackBar.open(
        "Mass was not found, jumping to first-year where there is a mass that fits the criteria",
        "Ooops!",
        {
          duration: 5e3
        }
      );
    }
  }
}
