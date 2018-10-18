// Root component
class App extends React.Component {
	// constructor
	constructor(props) {
		super(props);
		this.state = {
			form: 0,
			name: '',
			email: '',
			password: '',
			address_line_1: '',
			address_line_2: '',
			city: '',
			state: '',
			zip: '',
			phone_number: '',
			credit_card_number: '',
			cc_exp_date: '',
			cvv: '',
			billing_zip_code: ''
		};
	}

	// methods

	progressToNextStep() {
		if (this.state.form < 5) {
			this.setState({form: this.state.form + 1});			
		} else {
			this.setState({form: 0});
		}
	}

	createUser() {
		
		let dataObj = {
			'name': this.state.name, 
			'email': this.state.email, 
			'password': this.state.password
		};

		let dataJson = JSON.stringify(dataObj);

		console.log(dataJson);
		let makeProgress = () => this.progressToNextStep()
		$.post({
			url: '/users',
			contentType: 'application/json',
			data: dataJson,
			success: makeProgress,
			error: () => alert('Sorry, something went wrong!')
		});
	}

	createPaymentMethod() {
		
		let dataObj = {
			'credit_card_number': this.state.credit_card_number, 
			'cc_exp_date': this.state.cc_exp_date, 
			'cvv': this.state.cvv,
			'billing_zip_code': this.state.billing_zip_code,
			'email': this.state.email
		};

		let dataJson = JSON.stringify(dataObj);

		console.log(dataJson);
		let makeProgress = () => this.progressToNextStep()
		$.post({
			url: '/payment_methods',
			contentType: 'application/json',
			data: dataJson,
			success: makeProgress,
			error: () => alert('Sorry, something went wrong!')
		});
	}

	createAddress() {
		
		let dataObj = {
			'address_line_1': this.state.address_line_1, 
			'address_line_2': this.state.address_line_2, 
			'city': this.state.city,
			'state': this.state.state,
			'zip': this.state.zip,
			'phone_number': this.state.phone_number,
			'email': this.state.email
		};

		let dataJson = JSON.stringify(dataObj);

		console.log(dataJson);
		let makeProgress = () => this.progressToNextStep()
		$.post({
			url: '/addresses',
			contentType: 'application/json',
			data: dataJson,
			success: makeProgress,
			error: () => alert('Sorry, something went wrong!')
		});
	}

	setInputState(event) {
		this.setState({[event.target.id]: event.target.value});
	}

	// render
	render() {
		// form picking logic
		// return
		let chosenForm;
		if (this.state.form === 0) {
			chosenForm = (<CheckoutPage progress={this.progressToNextStep.bind(this)}/>);
		} else if (this.state.form === 1) {
			chosenForm = (<Form1 setInputState={this.setInputState.bind(this)} createUser={this.createUser.bind(this)} />);
		} else if (this.state.form === 2) {
			chosenForm = (<Form2 setInputState={this.setInputState.bind(this)} createAddress={this.createAddress.bind(this)} />);
		} else if (this.state.form === 3) {
			chosenForm = (<Form3 setInputState={this.setInputState.bind(this)} createPaymentMethod={this.createPaymentMethod.bind(this)} />);
		// case 4:
		// 	chosenForm = (<ConfirmationPage />);
		}
		return (

			// Checkout button
			<div>
				<h1>Multi-Step Checkout Process!</h1>				
				{chosenForm}
			</div>
			);
	}
}

// Form components

// Checkout Page component
const CheckoutPage = (props) => (
	<button id="checkout_button" onClick={props.progress}>Checkout!</button>
);

// F1 component 
const Form1 = (props) => (
	<div>
		<input onChange={props.setInputState} id="name"/>
		<input onChange={props.setInputState} id="email"/>
		<input onChange={props.setInputState} id="password"/>
		<button onClick={props.createUser}>Next</button>
	</div>
);
// next_button TODO:
// sends POST request
// results in db query INSERT INTO

// F2 
const Form2 = (props) => (
	<div>
		<input onChange={props.setInputState} id="address_line_1"/>
		<input onChange={props.setInputState} id="address_line_2"/>
		<input onChange={props.setInputState} id="city"/>
		<select onChange={props.setInputState} id="state">
			<option value="AL">Alabama</option>
			<option value="AK">Alaska</option>
			<option value="AZ">Arizona</option>
			<option value="AR">Arkansas</option>
			<option value="CA">California</option>
			<option value="CO">Colorado</option>
			<option value="CT">Connecticut</option>
			<option value="DE">Delaware</option>
			<option value="DC">District Of Columbia</option>
			<option value="FL">Florida</option>
			<option value="GA">Georgia</option>
			<option value="HI">Hawaii</option>
			<option value="ID">Idaho</option>
			<option value="IL">Illinois</option>
			<option value="IN">Indiana</option>
			<option value="IA">Iowa</option>
			<option value="KS">Kansas</option>
			<option value="KY">Kentucky</option>
			<option value="LA">Louisiana</option>
			<option value="ME">Maine</option>
			<option value="MD">Maryland</option>
			<option value="MA">Massachusetts</option>
			<option value="MI">Michigan</option>
			<option value="MN">Minnesota</option>
			<option value="MS">Mississippi</option>
			<option value="MO">Missouri</option>
			<option value="MT">Montana</option>
			<option value="NE">Nebraska</option>
			<option value="NV">Nevada</option>
			<option value="NH">New Hampshire</option>
			<option value="NJ">New Jersey</option>
			<option value="NM">New Mexico</option>
			<option value="NY">New York</option>
			<option value="NC">North Carolina</option>
			<option value="ND">North Dakota</option>
			<option value="OH">Ohio</option>
			<option value="OK">Oklahoma</option>
			<option value="OR">Oregon</option>
			<option value="PA">Pennsylvania</option>
			<option value="RI">Rhode Island</option>
			<option value="SC">South Carolina</option>
			<option value="SD">South Dakota</option>
			<option value="TN">Tennessee</option>
			<option value="TX">Texas</option>
			<option value="UT">Utah</option>
			<option value="VT">Vermont</option>
			<option value="VA">Virginia</option>
			<option value="WA">Washington</option>
			<option value="WV">West Virginia</option>
			<option value="WI">Wisconsin</option>
			<option value="WY">Wyoming</option>
		</select>
		<input onChange={props.setInputState} id="zip"/>
		<input onChange={props.setInputState} id="phone_number"/>

		<button onClick={props.createAddress}>Next</button>
	</div>
);
	// address line 1 input 
	// address line 2 input 
	// city input 
	// state select 
	// zip input 
	// phone number input
	// next button
		// sends POST request
			// results in db query INSERT INTO

// F3 
const Form3 = (props) => (
	<div>
		<input onChange={props.setInputState} id="credit_card_number"/>
		<input onChange={props.setInputState} id="cc_exp_date"/>
		<input onChange={props.setInputState} id="cvv"/>
		<button onClick={props.createPaymentMethod}>Next</button>
	</div>
);
	// Credit Card # input
	// CC Exp date input 
	// CVV input
	// billing zip code input
	// next button
		// sends POST request
		// sends POST request
			// results in db query INSERT INTO

// Confirmation page component
	// data summary
	// purchase button
		// sends POST request
			// results in db query INSERT INTO

// Render statement
const firstRender = () => {
	ReactDOM.render(<App />, document.getElementById('app'));
};