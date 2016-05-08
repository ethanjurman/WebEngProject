//AddEvent.js
import React, {Component} from 'react';
import { Paper, TextField, DatePicker, TimePicker, CardText, RaisedButton, FlatButton, Dialog } from 'material-ui';

export class AddEvent extends Component{
    constructor(props){
      super(props);

      this.state = {
        open: this.props.open,
        title: null,
        desc: null,
        date: null,
        time: null,
        dateEnd: null,
        timeEnd: null
      };
    }

    changeDate(event, date) {
      this.setState({ date, dateEnd:date });
    }

    changeTime(err, time) {
      this.setState({ time });
      this.refs.time.setTime(time);
      const timeEnd = new Date(time);
      timeEnd.setHours((time.getHours() + 1) % 24);
      this.setState({ timeEnd });
      this.refs.timeEnd.setTime(timeEnd);
    }

    changeDateEnd(event, date) {
      this.setState({ dateEnd });
    }

    changeTimeEnd(err, timeEnd) {
      this.setState({ timeEnd });
    }

    addEvent() {
      const {title, desc, time, timeEnd, date, dateEnd} = this.state;

      const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
      const end = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), timeEnd.getHours(), timeEnd.getMinutes());
      console.log(start,end);
      const eventObject = {
        title, desc, start, end
      }
      this.props.addEventObject(eventObject);
      this.props.toggleDialog();
    }

    updateTitle(event) {
      this.setState({
        title: event.target.value,
      });
    };

    updateDesc(event) {
      this.setState({
        desc: event.target.value,
      });
    };

    render() {
      const actions = [
        <RaisedButton
          label="Cancel"
          onClick={this.props.toggleDialog}
          />,

        <RaisedButton
          label="Add Event"
          secondary={true}
          onClick={this.addEvent.bind(this)}/>
      ];

      return(
        <Dialog
          title="Add Event"
          actions={actions}
          modal={true}
          open={this.props.open}>

          <TextField
            hintText="Title"
            onBlur={this.updateTitle.bind(this)}
          />
          <DatePicker
            hintText="Date Start"
            value={this.state.date}
            onChange={this.changeDate.bind(this)}/>
          <TimePicker
            ref="time"
            format="ampm"
            hintText="Time Start"
            value={this.state.time}
            onChange={this.changeTime.bind(this)}/>
          <br/>
          <DatePicker
            hintText="Date End"
            value={this.state.dateEnd}
            onChange={this.changeDateEnd.bind(this)}/>
          <TimePicker
            ref="timeEnd"
            format="ampm"
            hintText="Time End"
            value={this.state.timeEnd}
            onChange={this.changeTimeEnd.bind(this)}/>
          <TextField
            multiLine={true}
            rows={2}
            rowsMax={4}
            hintText="Description of Event"
            onBlur={this.updateDesc.bind(this)}
          />
        </Dialog>
      );
    }
}
