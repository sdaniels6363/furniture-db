import React from "react";
import "../../styles/Clients.css";
import API from "../../utils/API";

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
        API.newClient(body)
            .then(res => {
                console.log(res)
                // we reload the page to fetch the updated list from the db
                // I'm sure there's a better way to do this, if someone has
                // any ideas please be my guest.
                //window.location.reload()
                this.setState({
                    newClient: ""
                })
                this.props.cb();
            })
            .catch(err => {
                if (err.response.status === 422){
                    alert("Duplicate client detected.  Failed to add client.")
                } else {
                    alert("Unknown error")
                }
            });
    }

    render() {
        return (
            <div>

                <h4 id="client-card-text" className="top-spacer">Add Client</h4>
                <form>
                    <div className="row" id="lr-margin">
                        <div className="input-group">
                            <input type="text" value={this.state.newClient} onChange={this.handleChange} className="form-control" placeholder="Add a new client" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <input className="btn btn-outline-success" type="submit" value="Create" onClick={this.newClient} />
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default AddClient;