import React from 'react';
import { PageHeader, Table, Button, Well, Glyphicon, Small } from 'react-bootstrap';

const ProfileCards = (props) => (
  <div>
    <PageHeader>Credit Cards</PageHeader>
      <Well className="text-center">
        <Button bsStyle="success">
          <Glyphicon glyph="plus" className="margin-right-5" />
          Add a new Credit Card
        </Button>
      </Well>
      <Table condensed responsive bordered className="text-center">
        <tbody>
          <tr className="text-white bg-green-flat">
            <td className="vertical-align-middle">
              <Glyphicon glyph="credit-card" />
            </td>
            <td className="vertical-align-middle">
              **** **** **** 4242 <small>(default)</small>
            </td>
            <td className="vertical-align-middle">
              EXP: 02/22
            </td>
            <td className="vertical-align-middle">
              <Button bsStyle="primary">
                <Glyphicon glyph="trash" className="margin-right-5" />
                Delete
              </Button>
            </td>
          </tr>
          <tr>
            <td className="vertical-align-middle">
              <Glyphicon glyph="credit-card" />
            </td>
            <td className="vertical-align-middle">
              **** **** **** 4242
            </td>
            <td className="vertical-align-middle">
              EXP: 02/22
            </td>
            <td className="vertical-align-middle">
              <Button bsStyle="primary">
                <Glyphicon glyph="trash" className="margin-right-5" />
                Delete
              </Button>
              <a className="margin-left-15">Set as default</a>
            </td>
          </tr>
        </tbody>
      </Table>
  </div>
)

export default ProfileCards;