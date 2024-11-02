import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, Form, Button, Dropdown } from 'semantic-ui-react';

export default function CreateOrder() {
  const [customers, setCustomers] = useState([]);
  const [fishList, setFishList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/customers/')
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:8000/fish/')
      .then(response => setFishList(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = () => {
    const orderData = {
      customer_id: selectedCustomer,
      items: orderItems.map(item => ({ fish_id: item.fish_id, quantity: item.quantity })),
    };
    axios.post('http://localhost:8000/orders/', orderData)
      .then(response => {
        alert('Order placed successfully');
        setOrderItems([]);
      })
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Header as="h1">Create New Order</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Customer</label>
          <Dropdown
            placeholder="Select Customer"
            fluid
            selection
            options={customers.map(c => ({ key: c.id, text: c.name, value: c.id }))}
            onChange={(e, { value }) => setSelectedCustomer(value)}
          />
        </Form.Field>
        <Header as="h3">Order Items</Header>
        {orderItems.map((item, index) => (
          <Form.Group widths="equal" key={index}>
            <Form.Field>
              <label>Fish</label>
              <Dropdown
                placeholder="Select Fish"
                fluid
                selection
                options={fishList.map(f => ({ key: f.id, text: f.name, value: f.id }))}
                onChange={(e, { value }) => {
                  const newOrderItems = [...orderItems];
                  newOrderItems[index].fish_id = value;
                  setOrderItems(newOrderItems);
                }}
              />
            </Form.Field>
            <Form.Input
              label="Quantity"
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newOrderItems = [...orderItems];
                newOrderItems[index].quantity = parseInt(e.target.value);
                setOrderItems(newOrderItems);
              }}
            />
            <Button
              type="button"
              onClick={() => {
                const newOrderItems = orderItems.filter((_, i) => i !== index);
                setOrderItems(newOrderItems);
              }}
            >
              Remove
            </Button>
          </Form.Group>
        ))}
        <Button type="button" onClick={() => setOrderItems([...orderItems, { fish_id: null, quantity: 1 }])}>
          Add Item
        </Button>
        <Button type="submit" primary disabled={!selectedCustomer || orderItems.length === 0}>
          Submit Order
        </Button>
      </Form>
    </Container>
  );
}
