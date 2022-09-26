import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles"; 

import {Grid, Typography, Modal, TextField, Button } from "@material-ui/core"; 
import { setSpaceList } from "./actions";
import "./index.css";

const styles = theme => ({
   
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        openModal: false,
        isEdit: false,
        name: "",
        playerCount: "",
        region: "",
        country: "",
    };
    this.renderModal = this.renderModal.bind(this);
}

  async componentDidMount () {
    let response = await Axios.get("https://www.balldontlie.io/api/v1/players", 
        { headers: { "Content-Type": "application/json" } 
      }
    ); 
    if(response.data){
      this.props.onSetSpaceList(response.data.data) 
    }
  }

  handleClose = () => {
    this.setState({
      openModal: false,
    })
  }

  renderModal(){
    return(
      <Modal
        open={this.state.openModal}
        onClose={()=>this.handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid style={{
          padding: 30,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',        
          backgroundColor: "#ffffff", 
          boxShadow: 24, 
          width: 400
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ borderBottom: "1px solid #dddddd", margin: "20px 0" }}> Create Team Form</Typography>
          <Grid style={{ textAlign: "center" }}> 
            <TextField
              style={{ width: "100%", marginBottom: 10 }}
              required
              id="filled-required"
              label="Name"
              variant="filled"
              value={this.state.name}
              onChange={(e)=>{ this.setState({ name: e.target.value }) }}
            /> 

            <TextField
              style={{ width: "100%", marginBottom: 10 }}
              required
              id="filled-required"
              label="Player Count"
              variant="filled"
              value={this.state.playerCount}
              onChange={(e)=>{ this.setState({ playerCount: e.target.value }) }}
            /> 

            <TextField
              style={{ width: "100%", marginBottom: 10 }}
              required
              id="filled-required"
              label="Region"
              variant="filled"
              value={this.state.region}
              onChange={(e)=>{ this.setState({ region: e.target.value }) }}
            />

            <TextField
              style={{ width: "100%", marginBottom: 10 }}
              required
              id="filled-required"
              label="Country"
              variant="filled"
              value={this.state.country}
              onChange={(e)=>{ this.setState({ country: e.target.value }) }}
            />

            <Button variant="contained" style={{ marginRight: 10 }} onClick={()=>{ this.handleClose() }} >Cancel</Button>
            <Button variant="contained" style={{ backgroundColor: "#5b6eb9", color: "#FAFAFA" }} >Create</Button>

          </Grid>
        </Grid>
      </Modal>
    )
  }
 
  render() { 
    return (
      <Grid> 
        <Grid container justify="space-between" style={{ backgroundColor: "#5b6eb9", padding: "10px 0" }}>
          <Typography style={{ color: "#FAFAFA", paddingLeft: 10, fontSize: 18 }}> with Codigo</Typography>
          <Typography style={{ cursor: "pointer", color: "#FAFAFA", paddingRight: 10, fontSize: 16 }} onClick={()=>{
            this.props.history.push("/")
          }} >Logout</Typography>
        </Grid> 
        <Grid style={{ margin: "50px 100px" }}>
          <Grid container justify="space-between" alignItems="center">
            <Typography><span style={{ color: "#EB5757" }}>{this.props.team_list && this.props.team_list.team_list.length}</span> team member found!</Typography>
            <Typography onClick={()=>{
              this.setState({
                openModal: true
              })
            }} style={{ cursor: "pointer", borderRadius: 30, padding: "5px 20px", color: "#ffffff", backgroundColor: "#5b6eb9" }}>Add Team</Typography>
          </Grid>
          
          <table style={{ width: "100%", marginTop: 20 }}>
            <tr style={{ borderBottom: "2px solid #dddddd", color: "#111111", fontWeight: "bold" }}>
              <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Name</th>
              <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Position</th>
              <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Height (feet)</th>
              <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Height (inches)</th>
              <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Weight (pounds)</th>
              <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Team</th>
              <th style={{  borderBottom: "2px solid #333333" }}>Actions</th>
            </tr>
            {this.props.team_list && this.props.team_list.team_list.map((item, index) => {
              return (
                <tr key={index} style={{ padding: "15px 0", color: "#999999"}}>
                  <td> {item.first_name}&nbsp;{item.last_name} </td>
                  <td> {item.position} </td>
                  <td> {item.height_feet ? item.height_feet : "-" } </td>
                  <td> {item.height_inches ? item.height_inches : "-" } </td>
                  <td> {item.weight_pounds ? item.weight_pounds : "-" } </td>
                  <td> {item.team.abbreviation}</td>
                  <td style={{ textAlign: "center" }}>
                    <span onClick={()=>{ }} style={{ fontSize: 13, cursor: "pointer", borderRadius: 20, padding: "3px 10px", color: "#ffffff", backgroundColor: "#3673b0", marginRight: 5 }}>Edit</span>
                    <span onClick={()=>{ }} style={{ fontSize: 13, cursor: "pointer", borderRadius: 20, padding: "3px 10px", color: "#ffffff", backgroundColor: "#9f5b5b" }}>Delete</span>
                  </td>
                </tr>
                
              );
            })} 
          </table>
        </Grid>

        {this.renderModal()}
      </Grid> 
    );
  }
} 

const mapStateToProps = state => {
  return {
    state,
    team_list: state.team_list
  };
};

const mapDispatchToProps = dispatch => ({
  onSetSpaceList: (team_list) => dispatch(setSpaceList({team_list})), 
}); 


export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home))); 
