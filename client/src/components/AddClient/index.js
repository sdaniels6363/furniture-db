import React from "react";
import "../../styles/Clients.css";
import API from "../../utils/API"

class AddClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = { newClient: '' };

        this.handleChange = this.handleChange.bind(this);
        this.newClient = this.newClient.bind(this);
    }

    handleChange(event) {
        this.setState({ newClient: event.target.value });
    }

    newClient(event) {
        event.preventDefault();
        const body = {name: this.state.newClient}
        API.newClient(body).then((res,err) => {
            if(err){
                console.log(err)
            }
            console.log(res)
        });
    }

    render() {
        return (
            <div>

                <h4 id="client-card-text" className="top-spacer">Add Client</h4>
                <form>
                    <div className="row" id="lr-margin">
                        <div className="input-group">
                            <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" placeholder="Add a new client" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <input className="btn btn-outline-secondary" type="submit" value="submit" onClick={this.newClient} />
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default AddClient;