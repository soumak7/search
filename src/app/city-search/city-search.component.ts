import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CitySearchService } from '../services/city-search.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits!: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];
  vegetables: string[]=[];
  toppingList: string[] = [];
  reqString: string='';
  response: string='';
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  constructor(private citySearch: CitySearchService, private _snackBar: MatSnackBar ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
   }

  ngOnInit(): void {
   this.searchHistory();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.reqString=value;
	console.log(this.reqString)
    // Add our fruit
    // if (value) {
    //   this.fruits.push(value);
    // }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
	if(this.fruits.includes(event.option.viewValue)){
		this._snackBar.open("State already exists", "close", {
			duration: 2000
		})
	}else{
		this.fruits.push(event.option.viewValue);
		this.fruitInput.nativeElement.value = '';
		this.fruitCtrl.setValue(null);
	}

	console.log(this.fruits);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  getData(){
	  for(let i=0; i<res.length; i++){
		console.log(res[i].name);
		this.allFruits.push(res[i].name);
	  }
	  let req=this.reqString;
	  if(req===''){
		return;
	  }else{
		this.citySearch.getData(this.reqString).subscribe((res)=>{
				this.response=JSON.stringify(res.data);
		})
	  }

  }

  searchHistory(){
	this.citySearch.searchHistory().subscribe((res)=>{
		this.allFruits=res.data;
	})
  }
  sendit(){
	this.vegetables=[];
	let req={ stateList: this.fruits};
		for(let i=0; i<this.fruits.length; i++){
			if(i>1){
				this.vegetables[2]="more";
				this.toppingList.push(this.fruits[i]);
			}else{
				this.vegetables.push(this.fruits[i]);
			}
		}

		this.citySearch.postState(req).subscribe((res)=>{
			this._snackBar.open(res.message, "close",{
				duration: 2000
			})
		})
	this.getData();
	this.fruits=[];
  }
}

export let res=[
	{
		"abbr": "AP",
		"name": "Andhra Pradesh",
		"capital": "Visakhapatnam, Amaravati, Kurnool",
		"lat": "16.50??N",
		"long": "80.64??E"
	},
	{
		"abbr": "AN",
		"name": "Andaman and Nicobar Islands",
		"capital": "Port Blair",
		"lat": "11.68??N",
		"long": "92.77??E"
	},
	{
		"abbr": "AR",
		"name": "Arunachal Pradesh",
		"capital": "Itanagar",
		"lat": "27.06??N",
		"long": "93.37??E"
	},
	{
		"abbr": "AS",
		"name": "Assam",
		"capital": "Guwahati",
		"lat": "26.14??N",
		"long": "91.77??E"
	},
	{
		"abbr": "BR",
		"name": "Bihar",
		"capital": "Patna",
		"lat": "25.4??N",
		"long": "85.1??E"
	},
	{
		"abbr": "CH",
		"name": "Chandigarh",
		"capital": "Chandigarh",
		"lat": "30??45???N",
		"long": "76??47???E"
	},
	{
		"abbr": "CG",
		"name": "Chhattisgarh",
		"capital": "Raipur",
		"lat": "21.25??N",
		"long": "81.60??E"
	},
	{
		"abbr": "DN",
		"name": "DNHDD",
		"capital": "Daman",
		"lat": "20.42??N",
		"long": "72.83??E"
	},
	{
		"abbr": "DL",
		"name": "Delhi",
		"capital": "New Delhi",
		"lat": "28??36???36???N",
		"long": "77??13???48???E"
	},
	{
		"abbr": "GA",
		"name": "Goa",
		"capital": "Panaji",
		"lat": "15.50??N",
		"long": "73.83??E"
	},
	{
		"abbr": "GJ",
		"name": "Gujarat",
		"capital": "Gandhinagar",
		"lat": "23??13???N",
		"long": "72??41???E"
	},
	{
		"abbr": "HR",
		"name": "Haryana",
		"capital": "Chandigarh",
		"lat": "30??44???N",
		"long": "76??47???E"
	},
	{
		"abbr": "HP",
		"name": "Himachal Pradesh",
		"capital": "Shimla",
		"lat": "31??6???12???N",
		"long": "77??10???20???E"
	},
	{
		"abbr": "JK",
		"name": "Jammu and Kashmir",
		"capital": "Srinagar, Jammu",
		"lat": "34??5???24???N",
		"long": "74??47???24???E"
	},
	{
		"abbr": "JH",
		"name": "Jharkhand",
		"capital": "Ranchi",
		"lat": "23.35??N",
		"long": "85.33??E"
	},
	{
		"abbr": "KA",
		"name": "Karnataka",
		"capital": "Bengaluru",
		"lat": "12.97??N",
		"long": "77.50??E"
	},
	{
		"abbr": "KL",
		"name": "Kerala",
		"capital": "Thiruvananthapuram",
		"lat": "8.5??N",
		"long": "77??E"
	},
	{
		"abbr": "LA",
		"name": "Ladakh",
		"capital": "Leh, Kargil",
		"lat": "34??10???12???N",
		"long": "77??34???48???E"
	},
	{
		"abbr": "LD",
		"name": "Lakshadweep",
		"capital": "Kavaratti",
		"lat": "10.57??N",
		"long": "72.64??E"
	},
	{
		"abbr": "MP",
		"name": "Madhya Pradesh",
		"capital": "Bhopal",
		"lat": "23??15???N",
		"long": "77??25???E"
	},
	{
		"abbr": "MH",
		"name": "Maharashtra",
		"capital": "Mumbai",
		"lat": "18.97??N",
		"long": "72.820??E"
	},
	{
		"abbr": "MN",
		"name": "Manipur",
		"capital": "Imphal",
		"lat": "24.8074??N",
		"long": "93.9384??E"
	},
	{
		"abbr": "ML",
		"name": "Meghalaya",
		"capital": "Shillong",
		"lat": "25.57??N",
		"long": "91.88??E"
	},
	{
		"abbr": "MZ",
		"name": "Mizoram",
		"capital": "Aizawl",
		"lat": "23.36??N",
		"long": "92.8??E"
	},
	{
		"abbr": "NL",
		"name": "Nagaland",
		"capital": "Kohima",
		"lat": "25.67??N",
		"long": "94.12??E"
	},
	{
		"abbr": "OD",
		"name": "Odisha",
		"capital": "Bhubaneswar",
		"lat": "20.27??N",
		"long": "85.82??E"
	},
	{
		"abbr": "PY",
		"name": "Puducherry",
		"capital": "Pondicherry",
		"lat": "11.911082??N",
		"long": "79.812533??E"
	},
	{
		"abbr": "PB",
		"name": "Punjab",
		"capital": "Chandigarh",
		"lat": "30.79??N",
		"long": "75.84??E"
	},
	{
		"abbr": "RJ",
		"name": "Rajasthan",
		"capital": "Jaipur",
		"lat": "26.6??N",
		"long": "73.8??E"
	},
	{
		"abbr": "SK",
		"name": "Sikkim",
		"capital": "Gangtok",
		"lat": "27??33???00???N",
		"long": "88??30???00???E"
	},
	{
		"abbr": "TN",
		"name": "Tamil Nadu",
		"capital": "Chennai",
		"lat": "13.09??N",
		"long": "80.27??E"
	},
	{
		"abbr": "TS",
		"name": "Telangana",
		"capital": "Hyderabad",
		"lat": "17.366??N",
		"long": "78.475??E"
	},
	{
		"abbr": "TR",
		"name": "Tripura",
		"capital": "Agartala",
		"lat": "23.84??N",
		"long": "91.28??E"
	},
	{
		"abbr": "UP",
		"name": "Uttar Pradesh",
		"capital": "Lucknow",
		"lat": "26.85??N",
		"long": "80.91??E"
	},
	{
		"abbr": "UK",
		"name": "Uttarakhand",
		"capital": "Dehradun, Gairsain",
		"lat": "30.33??N",
		"long": "78.06??E"
	},
	{
		"abbr": "WB",
		"name": "West Bengal",
		"capital": "Kolkata",
		"lat": "22.5726??N",
		"long": "88.3639??E"
	}
]