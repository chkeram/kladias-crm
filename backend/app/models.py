from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class Customer(Base):
    __tablename__ = 'customers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    contact_info = Column(String)
    # One-to-many relationship with orders
    orders = relationship("Order", back_populates="customer")

class Fish(Base):
    __tablename__ = 'fish'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    quantity = Column(Integer)

class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey('customers.id'))
    order_date = Column(DateTime, default=datetime.utcnow)
    # Order details: list of fish and quantities
    items = relationship("OrderItem", back_populates="order")
    customer = relationship("Customer", back_populates="orders")

class OrderItem(Base):
    __tablename__ = 'order_items'

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('orders.id'))
    fish_id = Column(Integer, ForeignKey('fish.id'))
    quantity = Column(Integer)

    order = relationship("Order", back_populates="items")
    fish = relationship("Fish")
