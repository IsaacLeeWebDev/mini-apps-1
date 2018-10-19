import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'0,0': null,
			'0,1': null,
			'0,2': null,
			'0,3': null,
			'0,4': null,
			'0,5': null,
			
			'1,0': null,
			'1,1': null,
			'1,2': null,
			'1,3': null,
			'1,4': null,
			'1,5': null,
			
			'2,0': null,
			'2,1': null,
			'2,2': null,
			'2,3': null,
			'2,4': null,
			'2,5': null,
			
			'3,0': null,
			'3,1': null,
			'3,2': null,
			'3,3': null,
			'3,4': null,
			'3,5': null,
			
			'4,0': null,
			'4,1': null,
			'4,2': null,
			'4,3': null,
			'4,4': null,
			'4,5': null,
			
			'5,0': null,
			'5,1': null,
			'5,2': null,
			'5,3': null,
			'5,4': null,
			'5,5': null,

			'6,0': null,
			'6,1': null,
			'6,2': null,
			'6,3': null,
			'6,4': null,
			'6,5': null,
			'turn': 0
		}
	}

	checkForConnectedFour(line) {
		
		console.log('line>>>>', line);
		// for the length of the line - 3
		for (let i = 0; i < line.length - 3; i++) {
			console.log('line element >>>>>>>>>', line[i]);
			// check if each starting point is followed by three checkers of the same color
			if ( line[i] === line[i+1] && line[i] === line[i+2] && line[i] === line[i+3] && line[i] === line[i+4] && line[i] !== null) {

				// set the winDetected state to true if there's four of the same thing in a row.
				this.setState({ winDetected:true, winningPlayer:line[i] });

				// after the winDetected state has been resassigned
				setTimeout( () => { 
					// alert the winning player
					if(this.state['winDetected'] === true) {
						alert(this.state['winningPlayer'], 'wins!!');						
					}
					// disable all the buttons 
					for (let i = 0; i < this.state['checker_counts'].length; i++) {
						this.setState({ [this.state['checker_counts'][i]] : 6});
					}
				});
			}
		}
	}

	placeChecker(column) {
		let columnToCheckCheckerQuantityOf = `checkers_in_${column}`;
		console.log(columnToCheckCheckerQuantityOf);
		console.log('checkers in this column:', this.state[columnToCheckCheckerQuantityOf]);
		let colStateToChange = this.state[columnToCheckCheckerQuantityOf];

		// if value of checkers in column is < 6
		if (this.state[columnToCheckCheckerQuantityOf] < 6) {

			// increment the number of checkers in the column
			this.setState({'turn': this.state['turn'] + 1});


			// place appropriate colored checker at index equal to checkers in the column
			setTimeout( () => {

				// determine which coordinate state to change
				let colNum = String(column[column.length - 1]);
				let rowNum = String(this.state[columnToCheckCheckerQuantityOf]);
				let coordStateToChange = `${colNum},${rowNum}`;

				// set it as a cell that belongs to the red or blue player
				let valueToChangeTo = this.state.turn % 2 === 0 ? 'r' : 'b';
				this.setState({ [coordStateToChange] :  valueToChangeTo});

				setTimeout( () => {
					console.log('new state:', this.state[columnToCheckCheckerQuantityOf], '\n new turn: ', this.state['turn']);
					setTimeout( () => { 

						// check the row it's in
						console.log('>>>>> row_' + String(rowNum));
						this.checkForConnectedFour( this.state['row_' + String(rowNum)] );
						
						// check the column it's in
						console.log('>>>>> col_' + String(colNum));
						this.checkForConnectedFour( this.state['col_' + String(colNum)] );

						// check the major diagonal it's in, if any
						if (rowNum - colNum + 2 >= 0 && rowNum - colNum + 2 <= 5) {
							console.log('>>>>> major_diagonal_' + String(rowNum - colNum + 2));							
							this.checkForConnectedFour( this.state['major_diagonal_' + String(rowNum - colNum + 2)] );
						}

						// check the minor diagonal it's in, if any.
						if (rowNum - 3 + (-1 * (colNum - 6) ) >= 0 && rowNum - 3 + (-1 * (colNum - 6) ) <= 5) {
							console.log('>>>>> minor_diagonal_' + String(rowNum - 3 + (-1 * (colNum - 6)) ));
							this.checkForConnectedFour( this.state['minor_diagonal_' + String(rowNum - 3 + (-1 * (colNum - 6)) )] );
						}

						// increment the count of checkers in the column the checker was placed in
						setTimeout( () => {
							this.setState({[columnToCheckCheckerQuantityOf] : this.state[columnToCheckCheckerQuantityOf] + 1})
							setTimeout( () => console.log('this.state[', coordStateToChange, '] changed to:', this.state[coordStateToChange]), 0);
						}, 0);
					}, 0 ); 
				}, 0 );
	


			}, 0 );

		}

			// after the states have been updated:
				// for each row, column, major diagonal, and minor diagonal which the coordinate that contains the newly placed checker appears in
					// invoke checkForConnectedFour passing in the name of the appropriate property of this.state.
	}

	handleButtonClick(event) {
		// invoke this.placeChecker, passing in the appropriate column name according to a property of event.target
		this.placeChecker(event.target.id);
	}

	resetBoard() {

	}

	render() {
			this.state['col_0'] = [ this.state['0,0'], this.state['0,1'], this.state['0,2'], this.state['0,3'], this.state['0,4'], this.state['0,5'] ];
			this.state['col_1'] = [ this.state['1,0'], this.state['1,1'], this.state['1,2'], this.state['1,3'], this.state['1,4'], this.state['1,5'] ];
			this.state['col_2'] = [ this.state['2,0'], this.state['2,1'], this.state['2,2'], this.state['2,3'], this.state['2,4'], this.state['2,5'] ];
			this.state['col_3'] = [ this.state['3,0'], this.state['3,1'], this.state['3,2'], this.state['3,3'], this.state['3,4'], this.state['3,5'] ];
			this.state['col_4'] = [ this.state['4,0'], this.state['4,1'], this.state['4,2'], this.state['4,3'], this.state['4,4'], this.state['4,5'] ];
			this.state['col_5'] = [ this.state['5,0'], this.state['5,1'], this.state['5,2'], this.state['5,3'], this.state['5,4'], this.state['5,5'] ];
			this.state['col_6'] = [ this.state['6,0'], this.state['6,1'], this.state['6,2'], this.state['6,3'], this.state['6,4'], this.state['6,5'] ];

			this.state['row_0'] = [ this.state['0,0'], this.state['1,0'], this.state['2,0'], this.state['3,0'], this.state['4,0'], this.state['5,0'], this.state['6,0'] ];
			this.state['row_1'] = [ this.state['0,1'], this.state['1,1'], this.state['2,1'], this.state['3,1'], this.state['4,1'], this.state['5,1'], this.state['6,1'] ];
			this.state['row_2'] = [ this.state['0,2'], this.state['1,2'], this.state['2,2'], this.state['3,2'], this.state['4,2'], this.state['5,2'], this.state['6,2'] ];
			this.state['row_3'] = [ this.state['0,3'], this.state['1,3'], this.state['2,3'], this.state['3,3'], this.state['4,3'], this.state['5,3'], this.state['6,3'] ];
			this.state['row_4'] = [ this.state['0,4'], this.state['1,4'], this.state['2,4'], this.state['3,4'], this.state['4,4'], this.state['5,4'], this.state['6,4'] ];
			this.state['row_5'] = [ this.state['0,5'], this.state['1,5'], this.state['2,5'], this.state['3,5'], this.state['4,5'], this.state['5,5'], this.state['6,5'] ];

			this.state['major_diagonal_0'] = [ this.state['0,3'], this.state['1,2'], this.state['2,1'], this.state['3,0'] ];
			this.state['major_diagonal_1'] = [ this.state['0,4'], this.state['1,3'], this.state['2,2'], this.state['3,1'], this.state['4,0'] ];
			this.state['major_diagonal_2'] = [ this.state['0,5'], this.state['1,4'], this.state['2,3'], this.state['3,2'], this.state['4,1'], this.state['5,0'] ];
			this.state['major_diagonal_3'] = [ this.state['1,5'], this.state['2,4'], this.state['3,2'], this.state['4,1'], this.state['5,0'] ];
			this.state['major_diagonal_4'] = [ this.state['2,5'], this.state['3,4'], this.state['4,3'], this.state['5,2'], this.state['6,1'] ];
			this.state['major_diagonal_5'] = [ this.state['3,5'], this.state['4,4'], this.state['5,3'], this.state['6,2'] ];

			this.state['minor_diagonal_0'] = [ this.state['6,3'], this.state['5,2'], this.state['4,1'], this.state['3,0'] ];
			this.state['minor_diagonal_1'] = [ this.state['6,4'], this.state['5,3'], this.state['4,2'], this.state['3,1'], this.state['2,0'] ];
			this.state['minor_diagonal_2'] = [ this.state['6,5'], this.state['5,4'], this.state['4,3'], this.state['3,2'], this.state['2,1'], this.state['1,0'] ];
			this.state['minor_diagonal_3'] = [ this.state['5,5'], this.state['4,4'], this.state['3,3'], this.state['2,2'], this.state['1,1'], this.state['0,0'] ];
			this.state['minor_diagonal_4'] = [ this.state['4,5'], this.state['3,4'], this.state['2,3'], this.state['1,2'], this.state['0,1'] ];
			this.state['minor_diagonal_5'] = [ this.state['3,5'], this.state['2,4'], this.state['1,3'], this.state['0,1'] ];			

			this.state['all_rows'] = [this.state.row_0, this.state.row_1, this.state.row_2, this.state.row_3, this.state.row_4, this.state.row_5, this.state.row_6];
			this.state['all_cols'] = [this.state.col_0, this.state.col_1, this.state.col_2, this.state.col_3, this.state.col_4, this.state.col_5, this.state.col_6];
			this.state['all_major_diagonals'] = [this.state.major_diagonal_0, this.state.major_diagonal_1, this.state.major_diagonal_2, this.state.major_diagonal_3, this.state.major_diagonal_4, this.state.major_diagonal_5];
			this.state['all_minor_diagonals'] = [this.stateminor_diagonal_0, this.stateminor_diagonal_1, this.stateminor_diagonal_2, this.stateminor_diagonal_3, this.stateminor_diagonal_4, this.stateminor_diagonal_5];

			// these states have to go in the state ------------------ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
			// You might be able to avoid extra computations if you assign nested states to an empty array and call setState.
			// 		(Please don't do that... please)
			
			this.state['checkers_in_col_0'] = 0;
			this.state['checkers_in_col_1'] = 0;
			this.state['checkers_in_col_2'] = 0;
			this.state['checkers_in_col_3'] = 0;
			this.state['checkers_in_col_4'] = 0;
			this.state['checkers_in_col_5'] = 0;
			this.state['checkers_in_col_6'] = 0;
			this.state['winDetected'] = false;
			this.state['winningPlayer'] = null;
			// -------------------------------------------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
			this.state['checker_counts'] = [this.state['checkers_in_col_0'],this.state['checkers_in_col_1'],this.state['checkers_in_col_2'],this.state['checkers_in_col_3'],this.state['checkers_in_col_4'],this.state['checkers_in_col_5'],this.state['checkers_in_col_6']];

		return (
			<div> 
				<div id="button_row" className="rowDiv">
					<span id="col_0" className={this.state.checkers_in_col_0 < 6 ? this.state.turn % 2 === 0 ? "insertRedCheckerButton" : "insertBlueCheckerButton" : "fullColumnButton"} onClick={this.handleButtonClick.bind(this)}></span>
					<span id="col_1" className={this.state.checkers_in_col_1 < 6 ? this.state.turn % 2 === 0 ? "insertRedCheckerButton" : "insertBlueCheckerButton" : "fullColumnButton"} onClick={this.handleButtonClick.bind(this)}></span>
					<span id="col_2" className={this.state.checkers_in_col_2 < 6 ? this.state.turn % 2 === 0 ? "insertRedCheckerButton" : "insertBlueCheckerButton" : "fullColumnButton"} onClick={this.handleButtonClick.bind(this)}></span>
					<span id="col_3" className={this.state.checkers_in_col_3 < 6 ? this.state.turn % 2 === 0 ? "insertRedCheckerButton" : "insertBlueCheckerButton" : "fullColumnButton"} onClick={this.handleButtonClick.bind(this)}></span>
					<span id="col_4" className={this.state.checkers_in_col_4 < 6 ? this.state.turn % 2 === 0 ? "insertRedCheckerButton" : "insertBlueCheckerButton" : "fullColumnButton"} onClick={this.handleButtonClick.bind(this)}></span>
					<span id="col_5" className={this.state.checkers_in_col_5 < 6 ? this.state.turn % 2 === 0 ? "insertRedCheckerButton" : "insertBlueCheckerButton" : "fullColumnButton"} onClick={this.handleButtonClick.bind(this)}></span>
					<span id="col_6" className={this.state.checkers_in_col_6 < 6 ? this.state.turn % 2 === 0 ? "insertRedCheckerButton" : "insertBlueCheckerButton" : "fullColumnButton"} onClick={this.handleButtonClick.bind(this)}></span>
				</div>
				<div className="rowDiv" id="row_5">
					<span id="0,5" className={this.state['0,5'] === 'r' ? 'redCell' : this.state['0,5'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="1,5" className={this.state['1,5'] === 'r' ? 'redCell' : this.state['1,5'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="2,5" className={this.state['2,5'] === 'r' ? 'redCell' : this.state['2,5'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="3,5" className={this.state['3,5'] === 'r' ? 'redCell' : this.state['3,5'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="4,5" className={this.state['4,5'] === 'r' ? 'redCell' : this.state['4,5'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="5,5" className={this.state['5,5'] === 'r' ? 'redCell' : this.state['5,5'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="6,5" className={this.state['6,5'] === 'r' ? 'redCell' : this.state['6,5'] === 'b' ? 'blueCell' : 'emptyCell'}></span>					
				</div>
				<div className="rowDiv" id="row_4">
					<span id="0,4" className={this.state['0,4'] === 'r' ? 'redCell' : this.state['0,4'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="1,4" className={this.state['1,4'] === 'r' ? 'redCell' : this.state['1,4'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="2,4" className={this.state['2,4'] === 'r' ? 'redCell' : this.state['2,4'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="3,4" className={this.state['3,4'] === 'r' ? 'redCell' : this.state['3,4'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="4,4" className={this.state['4,4'] === 'r' ? 'redCell' : this.state['4,4'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="5,4" className={this.state['5,4'] === 'r' ? 'redCell' : this.state['5,4'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="6,4" className={this.state['6,4'] === 'r' ? 'redCell' : this.state['6,4'] === 'b' ? 'blueCell' : 'emptyCell'}></span>					
				</div>
				<div className="rowDiv" id="row_3">
					<span id="0,3" className={this.state['0,3'] === 'r' ? 'redCell' : this.state['0,3'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="1,3" className={this.state['1,3'] === 'r' ? 'redCell' : this.state['1,3'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="2,3" className={this.state['2,3'] === 'r' ? 'redCell' : this.state['2,3'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="3,3" className={this.state['3,3'] === 'r' ? 'redCell' : this.state['3,3'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="4,3" className={this.state['4,3'] === 'r' ? 'redCell' : this.state['4,3'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="5,3" className={this.state['5,3'] === 'r' ? 'redCell' : this.state['5,3'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="6,3" className={this.state['6,3'] === 'r' ? 'redCell' : this.state['6,3'] === 'b' ? 'blueCell' : 'emptyCell'}></span>					
				</div>
				<div className="rowDiv" id="row_2">
					<span id="0,2" className={this.state['0,2'] === 'r' ? 'redCell' : this.state['0,2'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="1,2" className={this.state['1,2'] === 'r' ? 'redCell' : this.state['1,2'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="2,2" className={this.state['2,2'] === 'r' ? 'redCell' : this.state['2,2'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="3,2" className={this.state['3,2'] === 'r' ? 'redCell' : this.state['3,2'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="4,2" className={this.state['4,2'] === 'r' ? 'redCell' : this.state['4,2'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="5,2" className={this.state['5,2'] === 'r' ? 'redCell' : this.state['5,2'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="6,2" className={this.state['6,2'] === 'r' ? 'redCell' : this.state['6,2'] === 'b' ? 'blueCell' : 'emptyCell'}></span>					
				</div>
				<div className="rowDiv" id="row_1">
					<span id="0,1" className={this.state['0,1'] === 'r' ? 'redCell' : this.state['0,1'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="1,1" className={this.state['1,1'] === 'r' ? 'redCell' : this.state['1,1'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="2,1" className={this.state['2,1'] === 'r' ? 'redCell' : this.state['2,1'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="3,1" className={this.state['3,1'] === 'r' ? 'redCell' : this.state['3,1'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="4,1" className={this.state['4,1'] === 'r' ? 'redCell' : this.state['4,1'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="5,1" className={this.state['5,1'] === 'r' ? 'redCell' : this.state['5,1'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="6,1" className={this.state['6,1'] === 'r' ? 'redCell' : this.state['6,1'] === 'b' ? 'blueCell' : 'emptyCell'}></span>					
				</div>
				<div className="rowDiv" id="row_0">
					<span id="0,0" className={this.state['0,0'] === 'r' ? 'redCell' : this.state['0,0'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="1,0" className={this.state['1,0'] === 'r' ? 'redCell' : this.state['1,0'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="2,0" className={this.state['2,0'] === 'r' ? 'redCell' : this.state['2,0'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="3,0" className={this.state['3,0'] === 'r' ? 'redCell' : this.state['3,0'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="4,0" className={this.state['4,0'] === 'r' ? 'redCell' : this.state['4,0'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="5,0" className={this.state['5,0'] === 'r' ? 'redCell' : this.state['5,0'] === 'b' ? 'blueCell' : 'emptyCell'}></span>
					<span id="6,0" className={this.state['6,0'] === 'r' ? 'redCell' : this.state['6,0'] === 'b' ? 'blueCell' : 'emptyCell'}></span>					
				</div>
				<button id="resetButton">Reset</button>			
			</div>
		);
	} 
}

export default App;

