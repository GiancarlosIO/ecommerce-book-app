import React from 'react';
import { PageHeader, Panel, Table, Button } from 'react-bootstrap';

const ProfileInfo = (props) => (
  <div>
    <PageHeader>
      User information:
      <Button bsStyle="primary" className="float-right" >Edit</Button>
    </PageHeader>
    <Table bordered responsive>
      <tbody>
        <tr>
          <td className="text-bold">Email</td>
          <td>{props.email}</td>
        </tr>
        <tr>
          <td className="text-bold">Name</td>
          <td>{ props.name }</td>
        </tr>
        <tr>
          <td className="text-bold">Username</td>
          <td> { props.username } </td>
        </tr>
        <tr>
          <td className="text-bold">Lastname</td>
          <td> { props.lastname } </td>
        </tr>
      </tbody>
    </Table>
  </div>
)

export default ProfileInfo;