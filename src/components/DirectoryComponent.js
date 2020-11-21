import React, { Component } from 'react'
import { Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import CampsiteInfo from './CampsiteInfo';


 class Directory extends Component {
     constructor(props) {
         super(props);
         this.state = {
            selectedCampsites: null
         };
     }

    onCampsiteSelect(campsite) {
        this.setState({selectedCampsites: campsite})
    }

    render() {
        const directory = this.props.campsites.map(campsite => {
            return ( 
                <div key={campsite.id} className="col-md-5 m-1">
                    <Card onClick={() => this.onCampsiteSelect(campsite)}>
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
                <CampsiteInfo campsite = {this.state.selectedCampsites} />
            </div>
        );
    }
}

export default Directory; 
