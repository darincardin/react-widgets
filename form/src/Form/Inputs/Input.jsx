import React from 'react';
import tooltip from '../Tools/Tooltip.jsx';
import Validation  from '../Tools/Validation.js';

const messages = {required:"Required", phone:"Format is xxx-xxx-xxxx", containsChars:"Cannot contain characters"};

class Input extends React.Component { 

	constructor(props){
		super(props)
		this.elem = React.createRef();
		this.state = {value: this.props.value}
	}
	
	validate(value = this.state.value){
		return this.props.strategy.validate(this.props.required, value )
	}
	
	componentDidMount() {
	    this.ttip = tooltip(this.elem.current);
		this.tooltipParams = { onKeyUp:this.onWatch, onFocus:this.onWatch, onBlur: this.onBlur	}
	}
	
	onBlur = ()=>{
		 this.ttip.hide();
	}
	
	componentWillReceiveProps(props) {
		this.setState({value: props.value }) 
	}	
	
	onChange = e =>{	
		var [name, value] = this.props.strategy.getEvent(e)
		this.setState({value:value})	
		this.props.change(name, value, this.validate(value))
	}



	onWatch = () =>{
		var error = this.props.error;	
		if(this.props.submitted) error ? this.ttip.show(messages[error]) : this.ttip.hide();
	}

	render(){ 

		var className = ["form-group has-feedback"];
		
		if(this.props.submitted) className.push( !this.props.error ? "has-success" :"has-error" );		

		var attribs = {
			type: this.props.tag || "text",
			name: this.props.name,
			onChange: this.onChange,
			value: this.state.value
		}	
	
		return (
			<>
				<td><label className={'control-label ' + (this.props.required ? 'required':'')}>{this.props.label}</label></td>
				<td>
					<div ref={this.elem} className={className.join(" ")} name={`my-${this.props.name}`}  >							
						{ this.props.strategy.html(attribs, this.tooltipParams, this.props.options) }
					</div>						
				</td>
			</>

		)
	}
}			
export default Input;

