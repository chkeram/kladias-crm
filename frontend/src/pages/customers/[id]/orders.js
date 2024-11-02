import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Table, Container, Header } from 'semantic-ui-react';

export default function CustomerOrders() {
  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/customers/${id}/orders/`)
        .then(response => setOrders(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  return (
    <Container>
      <Header as="h1">Orders for Customer {id}</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>Order Date</Table.HeaderCell>
            <Table.HeaderCell>Items</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.map(order => (
            <Table.Row key={order.id}>
              <Table.Cell>{order.id}</Table.Cell>
              <Table.Cell>{new Date(order.order_date).toLocaleString()}</Table.Cell>
              <Table.Cell>
                <ul>
                  {order.items.map(item => (
                    <li key={item.id}>{item.fish.name}: {item.quantity}</li>
                  ))}
                </ul>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
