import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Header } from 'semantic-ui-react';
import Link from 'next/link';

export default function Home() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/customers/')
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Header as="h1">Customer List</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Contact Info</Table.HeaderCell>
            <Table.HeaderCell>View Orders</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customers.map(customer => (
            <Table.Row key={customer.id}>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell>{customer.contact_info}</Table.Cell>
              <Table.Cell>
                <Link href={`/customers/${customer.id}/orders`}>
                  <a>View Orders</a>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
