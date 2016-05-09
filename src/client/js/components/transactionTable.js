//AddEvent.js
import React, {Component} from 'react';
import { Table, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableBody } from 'material-ui';

export class TransactionTable extends Component{
    constructor(props){
      super(props);
    }

    render() {
      return (<Table selectable={false}>
        <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Count</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Stock Name</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
            <TableHeaderColumn>Value</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
            displayRowCheckbox={false}>
          { this.props.transactionHistory.transHistory.map((trans,index) => {
            return (
              <TableRow key={index}>
                <TableRowColumn>{trans.count}</TableRowColumn>
                <TableRowColumn>{trans.date}</TableRowColumn>
                <TableRowColumn>{trans.stockName}</TableRowColumn>
                <TableRowColumn>{trans.type}</TableRowColumn>
                <TableRowColumn>{trans.value}</TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      );
    }
}
