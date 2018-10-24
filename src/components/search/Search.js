import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

class Search extends Component {

  state = {
      searchText: '',
      amount: 15,
      apiUrl: 'https://pixabay.com/api',
      apiKey: '10490189-44fb3aa76bc05bcac481dc296',
      images: []
  }

  onTextChange = (e) =>{

    const val = e.target.value;

    this.setState({[e.target.name]: val}, () => {
        if(val === ''){
            this.setState({images: []});
        }else{
         axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
        .then( res => this.setState({images: res.data.hits}))
        .catch( err => console.log(err));
        }
        
    });
  };

  onAmountChange = (e, index, value) => this.setState({amount: value});
  render() {
    console.log(this.state.images);  
    return (
      <div>
        <div style={{padding: "40px 40px 10px 40px"}}>  
            <TextField
                name="searchText"
                value={this.state.searchText}
                onChange={this.onTextChange}
                floatingLabelText="Search For Images"
                fullWidth = {true}
            />
            <SelectField
                name="amount"
                floatingLabelText="Amount"
                value={this.state.amount}
                onChange={this.onAmountChange}
            >
                <MenuItem value={5} primaryText="5"/>
                <MenuItem value={10} primaryText="10"/>
                <MenuItem value={15} primaryText="15"/>
                <MenuItem value={20} primaryText="20"/>
                <MenuItem value={30} primaryText="30"/>
                
            </SelectField>
        </div>    
        <br/>
        {this.state.images.length > 0 ? (<ImageResults images={this.state.images } />) : null}
      </div>
    )
  }
}

export default Search;
