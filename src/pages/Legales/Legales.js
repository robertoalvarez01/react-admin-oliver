import React, { Component } from 'react';
import Loader from '../../components/Loader';
import LegalesList from '../../components/LegalesList';
import config from '../../config/config';
import {authentication,getData} from '../../helpers/helpers';
export default class Legales extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          error:null,
          loading:false
        };
    }

    componentDidMount() {
        authentication();
        this.setState({
            ...this.state,
            loading:true
        });
        this.getLegales();
    }
    componentWillUnmount() {
    }
    
    async getLegales(){
        try {
            const data = await getData(`${config.url}/legales`);
            this.setState({
                ...this.state,
                data:data.data,
                loading:false
            });
        } catch (error) {
            this.setState({
                ...this.state,
                loading:false,
                error
            });
        }
    }

    render() {
        return (
            (this.state.loading)?<Loader/>:
            <React.Fragment>
                <LegalesList legales={this.state.data}/>
            </React.Fragment>
        )
    }
}
