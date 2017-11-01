let fs = require('fs');
//read input file 
fs.readFile('./input.txt', 'utf8', function(err, contents) {

	find_val(contents);

});
//function for finding proper values from the string fetched from input file
function find_val(contents){
	let lines =[];
	for(let i=0; i< contents.split('\r\n').length; i++){
		lines.push(new Array(i));
		lines = contents.split('\r\n');
	    let[n,sec]=lines[i].split(';');
		let N =parseInt(n);
	    let  value= sec.split(',');
	    //checking for number of inputs
	    if(value.length==N*N){

	    	create_grid(N, value);
	    }
	    else{
	    	console.log(false);
	    }
	}
}
//function for creating main grid		
function create_grid(N, value) {
	let matrix = [];
	let temp=0; 
	//creating main_grid
	for(var i=0; i<N; i++) {
    	matrix.push(new Array(N));
    	for(var j=0; j<N; j++) {
    		//pushing value to the main grid
       		matrix[i][j]=parseInt(value[temp+j]);

       		let item = matrix[i][j];
       		if(item < 1 && item > N){
				console.log(false);
				return;
			}
    	};
    		
    	temp+=j;
	}
	check_maingrid(N,matrix);
};
//function for checking row and col. of main grid
function check_maingrid(N,matrix){
	//console.log(matrix);
	let ret = true;
	let col_map = [];
	for(var i =0; i < N; i++){
		let row_map = {};
		for (var j = 0; j < N; j++) {
			let val = matrix[i][j];
			//checking duplicate value in row
		 	if(row_map[val]){
				console.log(false);
				return;
			}
			row_map[val] = true;

			if(i === 0){
				col_map[j]={};
			}
			//checking duplicate value in col
			if(col_map[j][val]){
				console.log(false);
				return;
			}
			col_map[j][val]=true;
		} 	
	}
	check_subgrid(N,matrix);										
};
//function for checking subgrid
function check_subgrid(N,matrix){
	let temp_row = 0;
	let len = Math.sqrt(N);
	for(let m = 0; m < len; m++){
		let temp_col = 0;
		for(let k = 0; k < len; k++){
			let subgrid = [];
			let row_map={};
			for (var i = 0; i < len; i++) {
				//checking for duplicate value in subgrid
				for(var j=0; j < len; j++){
					let val = (matrix[temp_row+i][temp_col+j]);
					if(row_map[val]){
						console.log(false);
						return;
					}
					row_map[val] = true;
				}
			}
			
			temp_col+=j;
		}
		
		temp_row+=i;
	}
	
	console.log(true);
	return;
};